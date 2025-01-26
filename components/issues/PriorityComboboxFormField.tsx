import { prioritiesIssue } from '@/config/constants';
import { Issue, IssuePartial } from '@/prisma/zod';
import { UseFormReturn } from 'react-hook-form';
import ComboboxFormField from '../form/ComboboxFormField';

export default function StatusComboboxFormField({
  form,
}: Readonly<{
  form: UseFormReturn<Issue> | UseFormReturn<IssuePartial>;
}>) {
  return (
    <ComboboxFormField
      form={form}
      fieldName='priority'
      properties={prioritiesIssue}
    />
  );
}
