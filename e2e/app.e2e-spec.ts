import { AppPage } from './app.po';

describe('reservation-system App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display carousel h2 text', () => {
    page.navigateTo();
    expect(page.getH2Text()).toEqual('ZAREZERWUJ BOISKO');
  });

  it('should display carousel paragraph text', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Sprawdź dostępne obiekty i preferowane terminy.');
  });

  it('should navigate to register page and display the first label text', () => {
    page.navigateToRegisterPage();
    expect(page.getFirstLabelText()).toEqual('Nazwa użytkownika');
  });
});
