import { env } from '@/lib/env.mjs';

const InviteWorkspaceEmail = ({ workspaceName }: { workspaceName: string }) => (
  <div>
    <h1>Ласкаво просимо!</h1>
    <p>
      Вас запросили приєднатися до робочого простору{' '}
      <strong>{workspaceName}</strong>.
    </p>
    <hr />
    <p>
      Натисніть на посилання нижче, щоб приєднатися до робочого простору та
      почати роботу з вашою новою командою!
    </p>
    <a href={`${env.WEB_DEPLOYMENT_URL}/join`}>
      Приєднатися до Робочого Простору
    </a>
    <hr />
    <p>
      Ви повинні увійти в систему, використовуючи цю адресу електронної пошти,
      щоб приєднатися до робочого простору.
    </p>
  </div>
);

export default InviteWorkspaceEmail;
