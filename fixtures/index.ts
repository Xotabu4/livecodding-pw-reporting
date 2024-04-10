import { test as baseTest } from "@playwright/test";
import { Application } from "../app";
import { UserCreateRequest, UserCreatedResponse } from "../api/models";
import { randomUUID } from "node:crypto";

export const test = baseTest.extend<
  {
    user: { userModel: UserCreateRequest; createdUser: UserCreatedResponse };
  } & { app: Application }
>({
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },
  /**
   * Provides a user that is created and logged in.
   */
  user: async ({ app }, use) => {
    const userModel = {
      isSubscribed: false,
      email: `test+${randomUUID()}@test.com`,
      firstName: "test",
      lastName: "test",
      password: "xotabu4@gmail.com",
    };

    const createdUser = await app.api.auth.createNewUser(userModel);
    await app.headlessLogin(userModel);
    await app.home.open();

    await use({ userModel, createdUser });
  },
});
