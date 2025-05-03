import fs from 'fs/promises';
import { join } from 'path';
import simpleGit from 'simple-git';

const gitSavesDir = '.resources/githubWikis';
const basePath = join(process.cwd(), gitSavesDir);

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

    const gitClone = simpleGit(basePath);
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
  repoId: string,
  repoFullName: string,
  token: string
) {
  const path = join(__dirname, gitSavesDir, repoId);

  const gitMain = simpleGit(path);
  await gitMain.add(path);
  await gitMain.commit(
    `update wiki via ProgressHub ${new Date().toISOString()}`
  );
  await gitMain.push(
    `https://x-access-token:${token}@github.com/${repoFullName}.wiki.git`
  );
}
