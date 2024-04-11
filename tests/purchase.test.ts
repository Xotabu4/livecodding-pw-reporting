import { test } from '../fixtures';

test('logged in user can buy a product', async ({ app, user }) => {
  await app.home.header.openShop();  
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();
  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});

test('logged in user can purchase multiple items', async ({ app, user }) => {
  // Item #1
  await app.home.header.openShop();
  await app.shop.openProductDetailsByName('CHERRY TOMATOES');
  await app.product.addToBag();
  await app.home.open();

  // Item #2
  await app.home.header.openShop();
  await app.shop.openProductDetailsByName('MARINATED CUCUMBERS NEZHIN STYLE');
  await app.product.addToBag();

  await app.accountDetails.miniCart.placeOrder();
  await app.confirmation.expectOrderPlaced();
});
