import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { Header } from "../component/header.component";
import { step } from "../../support/reporters/step";

export class Home extends AppPage {
  public pagePath = "/";
  public header = new Header(this.page);
  private carousel = this.page.locator(".main .homepage .home-carousel");

  @step()
  async expectLoaded(message = "Expected Home page to be opened") {
    await expect(this.carousel, message).toBeVisible();
  }

  @step()
  async subscribeToNewsletters(email: string) {
    await this.expectLoaded();
    await this.page.getByPlaceholder("Please Enter Your Email").fill(email);
    await this.page.getByRole("button", { name: "Subscribe" }).click();
  }
}
