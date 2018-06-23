import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }
  navigateToRegisterPage() {
    return browser.get('/register');
  }

  getH2Text() {
    return element(by.css('app-carousel h2')).getText();
  }

  getParagraphText() {
    return element(by.css('app-carousel p')).getText();
  }
  getFirstLabelText() {
    return element(by.css('app-register label')).getText();
  }

}
