import { WorkspaceMember } from '@/prisma/zod';
import { auth } from './auth/utils';
import prisma from './db';

type TRoles = WorkspaceMember['role'][];

type TAvailableEntities = {
  workspaceId: string;
  issueId: string;
  workspaceInviteId: string;
  workspaceMemberId: string;
};

type TCheckEntity =
  | Pick<TAvailableEntities, 'workspaceId'>
  | Pick<TAvailableEntities, 'issueId'>
  | Pick<TAvailableEntities, 'workspaceInviteId'>
  | Pick<TAvailableEntities, 'workspaceMemberId'>;

const workspaceAvailability = (userId: string, workspaceId: string) =>
  prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

const issueAvailability = (userId: string, issueId: string) =>
  prisma.workspaceMember.findFirst({
    where: {
      userId,
      workspace: {
        issues: {
          some: {
            id: issueId,
          },
        },
      },
    },
    select: {
      role: true,
    },
  });

const workspaceInviteAvailability = (
  userId: string,
  workspaceInviteId: string
) =>
  prisma.workspaceMember.findFirst({
    where: {
      userId,
      workspace: {
        workspaceInvite: {
          some: {
            id: workspaceInviteId,
          },
        },
      },
    },
    select: {
      role: true,
    },
  });

const workspaceMemberAvailability = (
  userId: string,
  workspaceMemberId: string
) =>
  prisma.workspaceMember.findFirst({
    where: {
      userId,
      workspace: {
        members: {
          some: {
            id: workspaceMemberId,
          },
        },
      },
    },
    select: {
      role: true,
    },
  });

function getWorkspaceMember(userId: string, entity: TCheckEntity) {
  if ('workspaceId' in entity)
    return workspaceAvailability(userId, entity.workspaceId);
  else if ('issueId' in entity)
    return issueAvailability(userId, entity.issueId);
  else if ('workspaceInviteId' in entity)
    return workspaceInviteAvailability(userId, entity.workspaceInviteId);
  else if ('workspaceMemberId' in entity)
    return workspaceMemberAvailability(userId, entity.workspaceMemberId);

  throw new Error('Invalid options provided in getWorkspaceMember');
}

async function protect(entity?: TCheckEntity, workspaceRoles?: TRoles) {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || !user?.email) {
    return {
      error: 'You must be logged in to access this resource',
    };
  } else if (!entity) {
    return {
      user,
    };
  }

  const workspaceMember = await getWorkspaceMember(user.id, entity);

  if (!workspaceMember) {
    return {
      error: 'You are not a member of this workspace',
    };
  } else if (workspaceRoles && !workspaceRoles.includes(workspaceMember.role)) {
    return {
      error: 'You do not have the required role to access this resource',
    };
  } else {
    return {
      user,
    };
  }
}

export async function protectAction(
  entity?: TCheckEntity,
  workspaceRoles?: TRoles
) {
  const { user, error } = await protect(entity, workspaceRoles);

  if (error) {
    throw new Error(error);
  }
  if (!user?.id || !user?.email) {
    throw new Error('Something went wrong, user not found in `protectAction`');
  }

  return {
    id: user.id,
    email: user.email,
  };
}
