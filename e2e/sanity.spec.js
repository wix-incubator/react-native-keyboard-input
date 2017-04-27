describe('Sanity', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have example screen', async () => {
    await expect(element(by.label('Keyboards example'))).toBeVisible();
  });

  it('should switch between keyboards', async () => {
    await element(by.id('input')).tap();
    await element(by.label('show1')).tap();
    await element(by.label('show2')).tap();
    await element(by.label('reset')).tap();
    await expect(element(by.label('Keyboards example'))).toBeVisible();
  });

  //This test times-out at the moment since detox can't find elements in the keyboard window
  //it('should show the first demo keyboard', async () => {
  //  await element(by.id('input')).tap();
  //  await element(by.label('show1')).tap();
  //  await expect(element(by.label('HELOOOO!!!'))).toBeVisible();
  //});
});
