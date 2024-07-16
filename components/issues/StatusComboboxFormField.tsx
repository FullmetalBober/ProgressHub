import { statuses } from '@/config/constants';
import { UseFormReturn } from 'react-hook-form';
import ComboboxFormField from '../form/ComboboxFormField';

export default function StatusComboboxFormField({
  form,
}: Readonly<{
  form: UseFormReturn;
}>) {
  return (
    <ComboboxFormField form={form} fieldName='status' properties={statuses} />
  );
}
