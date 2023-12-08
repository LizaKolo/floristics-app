import { Component } from "../Abstract/Component";
import { TBear, TServices } from "../Abstract/Type";

export class BearCard extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TBear) {
    super(parrent, 'div', ["cardbear"])

    const divBear = new Component(this.root, 'div', ["bearcard-div"])
    new Component(divBear.root, 'img', ["bearcard-img"], null, ['src', 'alt'], [data.url, data.name])
    new Component(divBear.root, 'span', ["bearcard-name"], data.name)
    new Component(divBear.root, 'span', ["bearcard-price"], `${data.price} руб.`)

    divBear.root.onclick = () => {
      this.addGoodInBasket();
    }
  }
  addGoodInBasket() {
    const user = this.services.authService.user;
    this.services.dbService.addToBasket(user, this.data)
      .catch(() => { })
  }
}