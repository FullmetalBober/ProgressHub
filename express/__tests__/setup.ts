Object.defineProperty(process.env, 'NODE_ENV', {
  value: 'test',
  writable: true,
  configurable: true,
});

jest.mock('@/lib/db', () => {
  const createMockFn = () => {
    const fn = jest.fn();
    fn.mockResolvedValue = jest.fn(value => {
      fn.mockImplementation(() => Promise.resolve(value));
      return fn;
    });
    fn.mockRejectedValue = jest.fn(error => {
      fn.mockImplementation(() => Promise.reject(error));
      return fn;
    });
    return fn;
  };

  return {
    __esModule: true,
    default: {
      githubAppInstallation: {
        create: createMockFn(),
        delete: createMockFn(),
        findUnique: createMockFn(),
        findFirst: createMockFn(),
        update: createMockFn(),
      },
      githubWikiFile: {
        findUnique: createMockFn(),
        update: createMockFn(),
      },
    },
  };
});

jest.mock('@/lib/env.mjs', () => ({
  env: {
    NODE_ENV: 'test',
    WEB_DEPLOYMENT_URL: 'http://localhost:3000',
    GITHUB_APP_ID: 'test-app-id',
    GITHUB_PRIVATE_KEY: 'test-private-key',
    GITHUB_CLIENT_ID: 'test-client-id',
    GITHUB_CLIENT_SECRET: 'test-client-secret',
    DATABASE_URL: 'test-database-url',
    NEXTAUTH_SECRET: 'test-secret',
    NEXTAUTH_URL: 'http://localhost:3000',
  },
}));

jest.mock('../socket', () => ({
  emitToRoomChanges: jest.fn(),
}));

jest.mock('../utils/git', () => ({
  checkGithubWikiExists: jest.fn(),
  createGithubWikiFile: jest.fn(),
  deleteGithubWikiFile: jest.fn(),
  pullGithubWiki: jest.fn(),
  pushGithubWiki: jest.fn(),
  renameGithubWikiFile: jest.fn(),
}));

jest.mock('../utils/github', () => ({
  getGithubToken: jest.fn(),
  getRepoInfo: jest.fn(),
}));
