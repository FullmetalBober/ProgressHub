import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import ComboboxFormField from '../form/ComboboxFormField';

const priorities = [
  {
    value: 'NO_PRIORITY',
    label: 'No priority',
    icon: HelpCircle,
  },
  {
    value: 'URGENT',
    label: 'Urgent',
    icon: Circle,
  },
  {
    value: 'HIGH',
    label: 'High',
    icon: ArrowUpCircle,
  },
  {
    value: 'MEDIUM',
    label: 'Medium',
    icon: CheckCircle2,
  },
  {
    value: 'LOW',
    label: 'Low',
    icon: XCircle,
  },
];

export default function StatusComboboxFormField({
  form,
}: {
  form: UseFormReturn;
}) {
  return (
    <ComboboxFormField
      form={form}
      fieldName='priority'
      properties={priorities}
    />
  );
}
