'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  function setQueryParams(
    key: string,
    value?: string,
    opts?: { shallow?: boolean }
  ) {
    if (value) urlSearchParams.set(key, String(value));
    else urlSearchParams.delete(key);

    const search = urlSearchParams.toString();
    const query = `?${search}`;
    const url = `${pathname}${query}`;
    if (opts?.shallow) window.history.replaceState(null, '', url);
    else router.replace(url);
  }

  return { queryParams: searchParams, setQueryParams };
}
