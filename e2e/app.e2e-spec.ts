import { SctZenSuitePage } from './app.po';

describe('sct-zen-suite App', () => {
  let page: SctZenSuitePage;

  beforeEach(() => {
    page = new SctZenSuitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
