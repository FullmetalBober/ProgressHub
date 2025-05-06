export type TGithubAccount = {
  id: number;
  name: string;
  avatarUrl: string;
  repositories: TGithubRepository[];
};

export type TGithubRepository = {
  id: number;
  name: string;
  image: string;
  description: string | null;
  isPrivate: boolean;
};
