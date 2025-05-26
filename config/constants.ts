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
    label: 'Терміново',
    icon: TriangleAlert,
  },
  {
    value: 'HIGH',
    label: 'Високий',
    icon: SignalHigh,
  },
  {
    value: 'MEDIUM',
    label: 'Середній',
    icon: SignalMedium,
  },
  {
    value: 'LOW',
    label: 'Низький',
    icon: SignalLow,
  },
  {
    value: 'NO_PRIORITY',
    label: 'Без пріоритету',
    icon: Ellipsis,
  },
];

const statusesIssue: TStatusIssue[] = [
  {
    value: 'IN_REVIEW',
    label: 'У огляді',
    icon: CircleEllipsis,
  },
  {
    value: 'TODO',
    label: 'Тудушка',
    icon: Circle,
  },
  {
    value: 'IN_PROGRESS',
    label: 'У процесі',
    icon: LoaderCircle,
  },
  {
    value: 'BACKLOG',
    label: 'Беклог',
    icon: CircleDashed,
  },
  {
    value: 'DONE',
    label: 'Виконано',
    icon: CheckCircle2,
  },
  {
    value: 'CANCELED',
    label: 'Скасовано',
    icon: XCircle,
  },
];

const statusesWorkspaceInvite: TStatusWorkspaceInvite[] = [
  {
    value: 'PENDING',
    label: 'Очікується',
  },
  {
    value: 'ACCEPTED',
    label: 'Прийнято',
  },
  {
    value: 'DECLINED',
    label: 'Відхилено',
  },
];

const statusesWorkspaceMember: TRoleWorkspaceMember[] = [
  {
    value: 'OWNER',
    label: 'Власник',
  },
  {
    value: 'ADMIN',
    label: 'Адмін',
  },
  {
    value: 'MEMBER',
    label: 'Учасник',
  },
];

export {
  prioritiesIssue,
  statusesIssue,
  statusesWorkspaceInvite,
  statusesWorkspaceMember,
};
