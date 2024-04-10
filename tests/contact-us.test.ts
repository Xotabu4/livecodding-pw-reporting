import { randomUUID } from "node:crypto";
import { test } from "../fixtures";

test("Contact us", async ({ app }) => {
  await app.contactus.open();

  const email = `xotabu4+${randomUUID()}@gmail.com`;
  await app.contactus.submitContactUsForm({
    email,
    fullName: "test name",
    message: "test message",
  });
  await app.home.expectNotification(
    `We receved your message, we will reach you on your email address ${email}!`
  );
});
