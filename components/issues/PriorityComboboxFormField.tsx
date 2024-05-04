import { priorities } from '@/config/constants';
import { UseFormReturn } from 'react-hook-form';
import ComboboxFormField from '../form/ComboboxFormField';

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
