import { env } from '@/lib/env.mjs';

const InviteWorkspaceEmail = ({ workspaceName }: { workspaceName: string }) => (
  <div>
    <h1>Welcome!</h1>
    <p>
      You have been invited to join the workspace{' '}
      <strong>{workspaceName}</strong>.
    </p>
    <hr />
    <p>
      Click the link below to join the workspace and get started with your new
      team!
    </p>
    <a href={`${env.WEB_DEPLOYMENT_URL}/join`}>Join Workspace</a>
    <hr />
    <p>
      You should be logged in using this email address to join the workspace.
    </p>
  </div>
);

export default InviteWorkspaceEmail;
