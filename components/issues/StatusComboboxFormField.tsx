import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import ComboboxFormField from '../form/ComboboxFormField';

const statuses = [
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

export default function StatusComboboxFormField({
  form,
}: {
  form: UseFormReturn;
}) {
  return (
    <ComboboxFormField form={form} fieldName='status' properties={statuses} />
  );
}
