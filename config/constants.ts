import {
  IssuePriority,
  IssueStatus,
  WorkspaceInviteStatus,
  WorkspaceRole,
} from '@prisma/client';
import {
  CheckCircle2,
  Circle,
  CircleDashed,
  CircleEllipsis,
  Ellipsis,
  LoaderCircle,
  SignalHigh,
  SignalLow,
  SignalMedium,
  TriangleAlert,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

type TField = {
  label: string;
  icon: LucideIcon;
};

type TPriorityIssue = {
  value: IssuePriority;
} & TField;

type TStatusIssue = {
  value: IssueStatus;
} & TField;

type TStatusWorkspaceInvite = {
  value: WorkspaceInviteStatus;
  label: string;
};

type TRoleWorkspaceMember = {
  value: WorkspaceRole;
  label: string;
};

const prioritiesIssue: TPriorityIssue[] = [
  {
    value: 'URGENT',
    label: 'Urgent',
    icon: TriangleAlert,
  },
  {
    value: 'HIGH',
    label: 'High',
    icon: SignalHigh,
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    icon: SignalMedium,
  },
  {
    value: 'LOW',
    label: 'Low',
    icon: SignalLow,
  },
  {
    value: 'NO_PRIORITY',
    label: 'No priority',
    icon: Ellipsis,
  },
];

const statusesIssue: TStatusIssue[] = [
  {
    value: 'IN_REVIEW',
    label: 'In Review',
    icon: CircleEllipsis,
  },
  {
    value: 'TODO',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'IN_PROGRESS',
    label: 'In Progress',
    icon: LoaderCircle,
  },
  {
    value: 'BACKLOG',
    label: 'Backlog',
    icon: CircleDashed,
  },
  {
    value: 'DONE',
    label: 'Done',
    icon: CheckCircle2,
  },
  {
    value: 'CANCELED',
    label: 'Canceled',
    icon: XCircle,
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
];

export {
  prioritiesIssue,
  statusesIssue,
  statusesWorkspaceInvite,
  statusesWorkspaceMember,
};
