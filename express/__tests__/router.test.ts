import prisma from '@/lib/db';
import express from 'express';
import request from 'supertest';
import router from '../router';
import { emitToRoomChanges } from '../socket';
import {
  checkGithubWikiExists,
  createGithubWikiFile,
  deleteGithubWikiFile,
  pullGithubWiki,
  pushGithubWiki,
  renameGithubWikiFile,
} from '../utils/git';
import { getGithubToken, getRepoInfo } from '../utils/github';

const app = express();
app.use(express.json());
app.use('/', router);

type JestMockWithPromiseMethods = jest.Mock & {
  mockResolvedValue: (value: any) => jest.Mock;
  mockRejectedValue: (error: Error) => jest.Mock;
};

type MockedFunction<T extends (...args: any[]) => any> =
  jest.MockedFunction<T> & {
    mockResolvedValue: (value: any) => jest.MockedFunction<T>;
    mockRejectedValue: (error: Error) => jest.MockedFunction<T>;
  };

interface MockedPrisma {
  githubAppInstallation: {
    create: JestMockWithPromiseMethods;
    delete: JestMockWithPromiseMethods;
    findUnique: JestMockWithPromiseMethods;
    findFirst: JestMockWithPromiseMethods;
    update: JestMockWithPromiseMethods;
  };
  githubWikiFile: {
    findUnique: JestMockWithPromiseMethods;
    update: JestMockWithPromiseMethods;
  };
}

const mockPrisma = prisma as unknown as MockedPrisma;
const mockEmitToRoomChanges = emitToRoomChanges as MockedFunction<
  typeof emitToRoomChanges
>;
const mockCheckGithubWikiExists = checkGithubWikiExists as MockedFunction<
  typeof checkGithubWikiExists
>;
const mockCreateGithubWikiFile = createGithubWikiFile as MockedFunction<
  typeof createGithubWikiFile
>;
const mockDeleteGithubWikiFile = deleteGithubWikiFile as MockedFunction<
  typeof deleteGithubWikiFile
>;
const mockPullGithubWiki = pullGithubWiki as MockedFunction<
  typeof pullGithubWiki
>;
const mockPushGithubWiki = pushGithubWiki as MockedFunction<
  typeof pushGithubWiki
>;
const mockRenameGithubWikiFile = renameGithubWikiFile as MockedFunction<
  typeof renameGithubWikiFile
>;
const mockGetGithubToken = getGithubToken as MockedFunction<
  typeof getGithubToken
>;
const mockGetRepoInfo = getRepoInfo as MockedFunction<typeof getRepoInfo>;

describe('Express Router Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return version information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.text).toBe('v1.0.1');
    });
  });

  describe('POST /notify', () => {
    it('should successfully emit room changes with valid data', async () => {
      const notifyData = {
        room: 'test-room',
        entity: 'workspace',
        event: 'create',
        payload: { id: 'test-id', data: 'test-data' },
      };

      const response = await request(app).post('/notify').send(notifyData);

      expect(response.status).toBe(200);
      expect(response.text).toBe('OK');
      expect(mockEmitToRoomChanges).toHaveBeenCalledWith(
        'test-room',
        'workspace',
        'create',
        { id: 'test-id', data: 'test-data' }
      );
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        room: 'test-room',
        entity: 'invalid-entity',
        event: 'create',
        payload: { data: 'test-data' },
      };

      const response = await request(app).post('/notify').send(invalidData);

      expect(response.status).toBe(400);
      expect(mockEmitToRoomChanges).not.toHaveBeenCalled();
    });
  });

  describe('GET /github/setup', () => {
    it('should create GitHub app installation and redirect', async () => {
      const workspaceId = 'workspace-123';
      const userId = 'user-456';
      const state = Buffer.from(
        JSON.stringify({ workspaceId, userId })
      ).toString('base64');

      mockPrisma.githubAppInstallation.create.mockResolvedValue({
        id: 789,
        workspaceId,
        createdById: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const response = await request(app).get('/github/setup').query({
        installation_id: '789',
        state: state,
      });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(
        `http://localhost:3000/workspace/${workspaceId}/settings/general`
      );
      expect(mockPrisma.githubAppInstallation.create).toHaveBeenCalledWith({
        data: {
          id: 789,
          workspaceId,
          createdById: userId,
        },
      });
    });

    it('should return 400 for invalid parameters', async () => {
      // Invalid installation_id
      const response1 = await request(app).get('/github/setup').query({
        installation_id: 'invalid',
        state: 'valid-state',
      });

      expect(response1.status).toBe(400);
      expect(mockPrisma.githubAppInstallation.create).not.toHaveBeenCalled();
    });
  });

  describe('GET /github/wiki/:installationId/:repoId', () => {
    beforeEach(() => {
      mockGetRepoInfo.mockResolvedValue({
        id: 123,
        full_name: 'owner/repo',
        name: 'repo',
        owner: { login: 'owner' },
      } as any);
      mockGetGithubToken.mockResolvedValue('test-token');
    });

    it('should return OK when wiki exists', async () => {
      mockCheckGithubWikiExists.mockResolvedValue(undefined);

      const response = await request(app).get('/github/wiki/456/123');

      expect(response.status).toBe(200);
      expect(response.text).toBe('OK');
      expect(mockGetRepoInfo).toHaveBeenCalledWith(456, 123);
      expect(mockGetGithubToken).toHaveBeenCalledWith(456);
      expect(mockCheckGithubWikiExists).toHaveBeenCalledWith(
        'owner/repo',
        'test-token'
      );
    });

    it('should handle wiki errors appropriately', async () => {
      mockCheckGithubWikiExists.mockRejectedValue(
        new Error('Repository not found')
      );

      const response = await request(app).get('/github/wiki/456/123');

      expect(response.status).toBe(404);
      expect(response.text).toBe('Wiki not found');
    });
  });

  describe('POST /github/wiki/:installationId/:repoId/file', () => {
    beforeEach(() => {
      mockGetRepoInfo.mockResolvedValue({
        id: 123,
        full_name: 'owner/repo',
        name: 'repo',
        owner: { login: 'owner' },
      } as any);
      mockGetGithubToken.mockResolvedValue('test-token');
      mockPullGithubWiki.mockResolvedValue(undefined);
      mockCreateGithubWikiFile.mockResolvedValue(undefined);
      mockRenameGithubWikiFile.mockResolvedValue(undefined);
      mockPushGithubWiki.mockResolvedValue(undefined);
    });

    it('should handle file operations successfully', async () => {
      const fileData = {
        name: 'test-file',
        content: 'Test content',
      };

      const response = await request(app)
        .post('/github/wiki/456/123/file')
        .send(fileData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        'File created or updated successfully'
      );
      expect(mockCreateGithubWikiFile).toHaveBeenCalledWith(
        123,
        'test-file',
        'Test content'
      );
    });

    it('should return 400 for invalid requests', async () => {
      const invalidData = {};
      const response = await request(app)
        .post('/github/wiki/456/123/file')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(mockPullGithubWiki).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /github/wiki/:installationId/:repoId/file', () => {
    beforeEach(() => {
      mockGetRepoInfo.mockResolvedValue({
        id: 123,
        full_name: 'owner/repo',
        name: 'repo',
        owner: { login: 'owner' },
      } as any);
      mockGetGithubToken.mockResolvedValue('test-token');
      mockPullGithubWiki.mockResolvedValue(undefined);
      mockDeleteGithubWikiFile.mockResolvedValue(undefined);
      mockPushGithubWiki.mockResolvedValue(undefined);
    });

    it('should delete a wiki file successfully', async () => {
      const fileData = {
        name: 'file-to-delete',
      };

      const response = await request(app)
        .delete('/github/wiki/456/123/file')
        .send(fileData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('File deleted successfully');
      expect(mockDeleteGithubWikiFile).toHaveBeenCalledWith(
        123,
        'file-to-delete'
      );
    });

    it('should return 400 for invalid requests', async () => {
      const response = await request(app)
        .delete('/github/wiki/456/123/file')
        .send({});

      expect(response.status).toBe(400);
      expect(mockDeleteGithubWikiFile).not.toHaveBeenCalled();
    });
  });
});
