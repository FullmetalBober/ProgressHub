import { User } from '@prisma/client';
import { UseFormReturn } from 'react-hook-form';
import CustomAvatar from '../CustomAvatar';
import ComboboxFormField from '../form/ComboboxFormField';

export default function AssigneeComboboxFormField({
  form,
  users,
}: {
  form: UseFormReturn;
  users: User[];
}) {
  const properties = users.map(user => ({
    value: user.id,
    label: user.email || user.name || user.id,
    icon: <CustomAvatar src={user.image} name={user.email} />,
  }));

  return (
    <ComboboxFormField
      form={form}
      fieldName='assigneeId'
      properties={properties}
    />
  );
}
