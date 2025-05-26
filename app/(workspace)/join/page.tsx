import CustomAvatar from '@/components/CustomAvatar';
import { JoinWorkspaceButton } from '@/components/join/JoinWorkspaceButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Приєднатися до робочого простору',
};

export default async function JoinPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  if (!userEmail) return null;

  const invites = await prisma.workspaceInvite.findMany({
    where: {
      email: userEmail,
    },
    include: {
      workspace: {
        include: {
          members: {
            select: { id: true },
          },
        },
      },
    },
  });

  return (
    <Card className='max-w-lg mx-auto'>
      <CardHeader>
        <CardTitle>Ви маєте доступ до цих робочих просторів</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {invites.map(invite => {
            const membersCount = invite.workspace?.members.length;

            return (
              <li
                key={invite.id}
                className='flex items-center space-x-4 rounded-md border p-4'
              >
                <CustomAvatar
                  src={invite.workspace?.image}
                  name={invite.workspace?.name}
                  className='mr-2 h-10 w-10'
                />
                <div className='flex-1 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {invite.workspace?.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {membersCount}{' '}
                    {membersCount === 1 ? 'учасник' : 'учасників'}
                  </p>
                </div>
                <JoinWorkspaceButton inviteId={invite.id} />
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' className='w-full' asChild>
          <Link href='/create'>Створити новий робочий простір</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
