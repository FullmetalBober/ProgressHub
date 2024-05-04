import { Priority, Status } from '@prisma/client';
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';

type TField = {
  label: string;
  icon: JSX.Element;
};

type TPriority = {
  value: Priority;
} & TField;

type TStatus = {
  value: Status;
} & TField;

const priorities: TPriority[] = [
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

const statuses: TStatus[] = [
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

export { priorities, statuses };
