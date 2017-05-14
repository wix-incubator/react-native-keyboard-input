describe('Sanity', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have example screen', async () => {
    await expect(element(by.label('Keyboards example'))).toBeVisible();
  });

  it('should switch between keyboards', async () => {
    await element(by.id('input')).tap();
    await element(by.id('show1')).tap();
    await expect(element(by.label('HELOOOO!!!'))).toBeVisible();
    await element(by.id('show2')).tap();
    await expect(element(by.label('*** ANOTHER ONE ***'))).toBeVisible();
    await element(by.id('reset')).tap();
    await expect(element(by.label('Keyboards example'))).toBeVisible();
  });

  it('should select item on the first demo keyboard', async () => {
    await element(by.id('input')).tap();
    await element(by.id('show1')).tap();
    await expect(element(by.label('HELOOOO!!!'))).toBeVisible();
    await element(by.id('click-me')).tap();
    await expect(element(by.id('demo-message'))).toBeVisible();
  });

  it('should expand the keyboard', async () => {
    await element(by.id('input')).tap();
    await expect(element(by.id('show2'))).toBeVisible();
    await element(by.id('show2')).tap();
    await element(by.id('toggle-fs')).tap();
    await expect(element(by.id('show2'))).toBeNotVisible();
    await element(by.id('toggle-fs')).tap();
    await expect(element(by.id('show2'))).toBeVisible();
  });
});
