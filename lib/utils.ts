import { WorkspaceMember } from '@/prisma/zod';
import { clsx, type ClassValue } from 'clsx';
import { FormatDistanceToken, isValid, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${path}`;
}

export function getImageUrl(key?: string | null) {
  if (key?.startsWith('https://')) return key;
  else if (key) return `https://ijhhu279hm.ufs.sh/f/${key}`;
  return 'https://github.com/shadcn.png';
}

export function checkIsOwner(
  sessionUserId: string,
  workspaceMembers: Pick<WorkspaceMember, 'userId' | 'role'>[]
) {
  return workspaceMembers.some(
    ({ userId, role }) => sessionUserId === userId && role === 'OWNER'
  );
}

export function checkIsOwnerOrAdmin(
  sessionUserId: string,
  workspaceMembers: Pick<WorkspaceMember, 'userId' | 'role'>[]
) {
  return workspaceMembers.some(
    ({ userId, role }) =>
      sessionUserId === userId && (role === 'OWNER' || role === 'ADMIN')
  );
}

export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return value => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    }
  };
}

export function convertHtmlTaskListToMdCompatible(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const taskLists = doc.querySelectorAll('ul[data-type="taskList"]');

  taskLists.forEach(taskList => {
    const items = taskList.querySelectorAll('li[data-type="taskItem"]');
    const markdownLines = Array.from(items).map(item => {
      const checked = item.getAttribute('data-checked') === 'true' ? 'x' : ' ';
      const text = item.querySelector('div')?.textContent?.trim() ?? '';

      return `\n- [${checked}] ${text}`;
    });
    markdownLines.unshift('\n');
    markdownLines.push('\n');

    const markdownText = markdownLines.join('');
    const textNode = doc.createTextNode(markdownText);

    taskList.replaceWith(textNode);
  });

  return doc.body.innerHTML;
}

export function transformDatesInObject<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(transformDatesInObject) as unknown as T;
  }

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      const date = parseISO(value);
      result[key] = isValid(date) ? date : value;
    } else if (typeof value === 'object' && value !== null) {
      result[key] = transformDatesInObject(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

export const formatDistanceLocale: Record<
  FormatDistanceToken,
  (count: number) => string
> = {
  lessThanXSeconds: c => `${c}с`,
  xSeconds: c => `${c}с`,
  halfAMinute: () => '30с',
  lessThanXMinutes: c => `${c}хв`,
  xMinutes: c => `${c}м`,
  aboutXHours: c => `${c}г`,
  xHours: c => `${c}г`,
  xDays: c => `${c}д`,
  aboutXWeeks: c => `${c}т`,
  xWeeks: c => `${c}т`,
  aboutXMonths: c => `${c}м`,
  xMonths: c => `${c}м`,
  aboutXYears: c => `${c}р`,
  xYears: c => `${c}р`,
  overXYears: c => `${c}р`,
  almostXYears: c => `${c}р`,
};
