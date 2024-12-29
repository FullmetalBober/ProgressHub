import { statuses } from '@/config/constants';
import { Issue } from '@prisma/client';
import { UseFormReturn } from 'react-hook-form';
import ComboboxFormField from '../form/ComboboxFormField';

export default function StatusComboboxFormField({
  form,
}: Readonly<{
  form: UseFormReturn<Issue>;
}>) {
  return (
    <ComboboxFormField form={form} fieldName='status' properties={statuses} />
  );
}
