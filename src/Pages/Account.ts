import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";
import { CardHistory } from "../Common/CardHistory";

export class Account extends Component {
  divAuthorization: Component;
  divHistory: Component;
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'div', ["account"])
    const user = services.authService.user;

    this.divAuthorization = new Component(this.root, 'div', ["account__authorization"])
    new Component(this.divAuthorization.root, 'p', ["account__title"], "Личный кабинет")

    const divGoogle = new Component(this.divAuthorization.root, 'div', ["account__google"])
    new Component(divGoogle.root, 'img', [], null, ["alt", "src"], ["google", "./assets/google.png"])
    const regButton = new Component(divGoogle.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", "Авторизоваться"]);
    regButton.root.onclick = () => {
      this.services.authService.authWidthGoogle();
    }

    this.divHistory = new Component(this.root, 'div', ["account__history"])
    new Component(this.divHistory.root, 'p', ["account__title"], "История заказов")
    const divRecord = new Component(this.divHistory.root, 'div', [])
    services.dbService.getAllHistory(user).then((historys) => {
      this.putHistoryOnPage(divRecord, historys);
    });

    services.dbService.addListener('addInHistory', (history) => {
      this.putHistoryOnPage(divRecord, [history as TDataHistory]);
    });

    const outButton = new Component(this.divHistory.root, 'input', ["auth__btn", "out__btn"], null, ["type", "value"], ["button", "Выйти из личного кабинета"]);
    outButton.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }

    if (user) {
      this.toggleButton(true);
      // window.location.reload();
    } else {
      this.toggleButton(false);
    }

    this.services.authService.addListener('userAuth', (isAuthUser) => {
      if (isAuthUser) {
        this.toggleButton(true)
      } else {
        this.toggleButton(false)
      }
    });
  }
  toggleButton(isAuthUser: boolean): void {
    if (isAuthUser) {
      this.divAuthorization.remove();
      this.divHistory.render();
    } else {
      this.divAuthorization.render();
      this.divHistory.remove();
    }
  }
  putHistoryOnPage(teg: Component, historys: TDataHistory[]) {
    historys.forEach((history) => {
      new CardHistory(teg.root, this.services, history);
    });
  }
}