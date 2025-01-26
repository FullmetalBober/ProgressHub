import { InviteStatus, Priority, Role, Status } from '@prisma/client';
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import type { JSX } from 'react';

type TField = {
  label: string;
  icon: JSX.Element;
};

type TPriorityIssue = {
  value: Priority;
} & TField;

type TStatusIssue = {
  value: Status;
} & TField;

type TStatusWorkspaceInvite = {
  value: InviteStatus;
  label: string;
};

type TRoleWorkspaceMember = {
  value: Role;
  label: string;
};

const prioritiesIssue: TPriorityIssue[] = [
  {
    value: 'NO_PRIORITY',
    label: 'No priority',
    icon: <HelpCircle />,
  },
  {
    value: 'URGENT',
    label: 'Urgent',
    icon: <Circle />,
  },
  {
    value: 'HIGH',
    label: 'High',
    icon: <ArrowUpCircle />,
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    icon: <CheckCircle2 />,
  },
  {
    value: 'LOW',
    label: 'Low',
    icon: <XCircle />,
  },
];

const statusesIssue: TStatusIssue[] = [
  {
    value: 'BACKLOG',
    label: 'Backlog',
    icon: <HelpCircle />,
  },
  {
    value: 'TODO',
    label: 'Todo',
    icon: <Circle />,
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    icon: <ArrowUpCircle />,
  },
  {
    value: 'DONE',
    label: 'Done',
    icon: <CheckCircle2 />,
  },
  {
    value: 'CANCELED',
    label: 'Canceled',
    icon: <XCircle />,
  },
];

const statusesWorkspaceInvite: TStatusWorkspaceInvite[] = [
  {
    value: 'PENDING',
    label: 'Pending',
  },
  {
    value: 'ACCEPTED',
    label: 'Accepted',
  },
  {
    value: 'DECLINED',
    label: 'Declined',
  },
];

const statusesWorkspaceMember: TRoleWorkspaceMember[] = [
  {
    value: 'OWNER',
    label: 'Owner',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
  },
  {
    value: 'MEMBER',
    label: 'Member',
  },
  {
    value: 'GUEST',
    label: 'Guest',
  },
];

export {
  prioritiesIssue,
  statusesIssue,
  statusesWorkspaceInvite,
  statusesWorkspaceMember,
};
