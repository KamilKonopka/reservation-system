import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getH2Text() {
    return element(by.css('app-carousel h2')).getText();
  }

  getParagraphText() {
    return element(by.css('app-carousel p')).getText();
  }

}
