import { randomUUID } from 'node:crypto';
import { test } from '../fixtures';;

test('Subscribe', async ({ app }) => {
  await app.home.open();
  await app.home.subscribeToNewsletters(`xotabu4+${randomUUID()}@gmail.com`);
  await app.home.expectNotification('You have successfully subscribed to the newsletter')
});
