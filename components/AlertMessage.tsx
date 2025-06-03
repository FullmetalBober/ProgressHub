import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type TAlertProps = React.ComponentProps<typeof Alert>;

export default function AlertMessage({
  title,
  ...props
}: TAlertProps & { title: string }) {
  return (
    <Alert variant='destructive'>
      {props.variant === 'default' && <CheckCircle2Icon />}
      {props.variant === 'destructive' && <AlertCircleIcon />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{props.children}</AlertDescription>
    </Alert>
  );
}
