import fs from 'fs/promises';
import { join } from 'path';
import simpleGit from 'simple-git';

const gitSavesDir = '.resources/githubWikis';
const basePath = join(process.cwd(), gitSavesDir);
const gitBaseConfig = {
  config: [
    "user.name='ProgressHub'",
    "user.email='vladyslav.mankivskyi@gmail.com'",
  ],
};

function buildFilePath(repoId: number, fileName: string) {
  return join(basePath, repoId.toString(), fileName + '.md');
}

export async function checkGithubWikiExists(
  repoFullName: string,
  token: string
) {
  const dirExists = await fs
    .access(basePath)
    .then(() => true)
    .catch(() => false);
  if (!dirExists) await fs.mkdir(basePath, { recursive: true });

  const gitClone = simpleGit(basePath, gitBaseConfig);
  await gitClone.raw(
    'ls-remote',
    `https://x-access-token:${token}@github.com/${repoFullName}.wiki.git`
  );
}

export async function pullGithubWiki(
  repoId: number,
  repoFullName: string,
  token: string
) {
  const path = join(basePath, repoId.toString());

  const dirExists = await fs
    .access(path)
    .then(() => true)
    .catch(() => false);

  if (!dirExists) {
    await fs.mkdir(path, { recursive: true });

    const gitClone = simpleGit(basePath, gitBaseConfig);
    await gitClone.clone(
      `https://x-access-token:${token}@github.com/${repoFullName}.wiki.git`,
      path
    );
  } else {
    const gitMain = simpleGit(path);
    await gitMain.pull();
  }
}

export async function pushGithubWiki(
  repoId: number,
  repoFullName: string,
  token: string
) {
  const path = join(basePath, repoId.toString());
  const gitMain = simpleGit(path, gitBaseConfig);

  await gitMain.add(path);

  const changes = await gitMain.status();
  if (changes.isClean()) {
    console.log('No changes to commit');
    return;
  }

  await gitMain.commit(
    `update wiki via ProgressHub ${new Date().toISOString()}`
  );
  await gitMain.push(
    `https://x-access-token:${token}@github.com/${repoFullName}.wiki.git`
  );
}

export async function createGithubWikiFile(
  repoId: number,
  fileName: string,
  content: string
) {
  const path = buildFilePath(repoId, fileName);

  await fs.writeFile(path, content);
}

export async function deleteGithubWikiFile(repoId: number, fileName: string) {
  const path = buildFilePath(repoId, fileName);

  const fileExists = await fs
    .access(path)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) return;
  return fs.unlink(path);
}

export async function renameGithubWikiFile(
  repoId: number,
  oldFileName: string,
  newFileName: string
) {
  if (oldFileName === newFileName) return;

  const oldPath = buildFilePath(repoId, oldFileName);
  const newPath = buildFilePath(repoId, newFileName);

  const fileExists = await fs
    .access(oldPath)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) return;

  await fs.rename(oldPath, newPath);
}
