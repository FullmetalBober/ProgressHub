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
  repoId: number,
  repoFullName: string,
  token: string
) {
  const path = join(basePath, repoId.toString());
  const gitMain = simpleGit(path);

  await gitMain.add(path);
  await gitMain.commit(
    `update wiki via ProgressHub ${new Date().toISOString()}`
  );
  await gitMain.push(
    `https://x-access-token:${token}@github.com/${repoFullName}.wiki.git`
  );
}

export async function getMDFilesGithubWiki(repoId: number) {
  const path = join(basePath, repoId.toString());

  const files = await fs.readdir(path);
  const mdFiles = files.filter(file => file.endsWith('.md'));
  const mdFilesWithContent = await Promise.all(
    mdFiles.map(async file => {
      const filePath = join(path, file);
      const content = await fs.readFile(filePath, 'utf-8');
      return {
        name: file,
        content,
      };
    })
  );

  return mdFilesWithContent;
}

export async function createGithubWikiFile(
  repoId: number,
  fileName: string,
  content: string
) {
  const path = join(basePath, repoId.toString(), fileName + '.md');

  await fs.writeFile(path, content);
}

export async function deleteGithubWikiFile(repoId: number, fileName: string) {
  const path = join(basePath, repoId.toString(), fileName);

  await fs.unlink(path);
}

export async function renameGithubWikiFile(
  repoId: number,
  oldFileName: string,
  newFileName: string
) {
  const oldPath = join(basePath, repoId.toString(), oldFileName);
  const newPath = join(basePath, repoId.toString(), newFileName);

  await fs.rename(oldPath, newPath);
}
