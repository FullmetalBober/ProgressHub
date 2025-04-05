import { env } from '@/lib/env.mjs';
import { createNodeMiddleware, Probot } from 'probot';

const probot = new Probot({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_PRIVATE_KEY,
  secret: env.GITHUB_WEBHOOK_SECRET,
  logLevel: 'debug',
});

function handle(app: Probot) {
  app.on('installation.deleted', async context => {});
  app.on('issues.edited', async context => {
    // console.log(context);
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World! }
    const params = context.issue({ body: 'Hello World!' });
    console.log(env.GITHUB_PRIVATE_KEY);
    // Post a comment on the issue
    return context.octokit.issues.createComment(params);
  });
}

const probotMiddleware = createNodeMiddleware(handle, {
  probot,
  webhookPath: '/api/github/webhooks',
});

export default probotMiddleware;
