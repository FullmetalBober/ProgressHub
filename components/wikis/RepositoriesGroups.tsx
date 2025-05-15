'use client';

import { TGithubAccount } from '@/lib/types';
import { useState } from 'react';
import RepositoryGroupComponent from './RepositoryGroupComponent';
import RepositorySearch from './RepositorySearch';

export default function RepositoriesGroups(
  props: Readonly<{
    accounts: TGithubAccount[];
  }>
) {
  const [search, setSearch] = useState('');
  const discoveredRepos = props.accounts.map(account => ({
    ...account,
    repositories: account.repositories.filter(repo =>
      repo.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <main className='container px-4 py-8'>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='w-full sm:w-[300px] md:w-[400px]'>
          <RepositorySearch onSearch={handleSearch} />
        </div>
        {/* <RepositorySort
          onSort={handleSort}
          repositories={searchActive ? repositories : allRepositories}
        /> */}
      </div>

      <div className='space-y-8'>
        {discoveredRepos.map(group => (
          <RepositoryGroupComponent
            key={group.id}
            group={group}
            defaultOpen={true}
          />
        ))}
      </div>
    </main>
  );
}
