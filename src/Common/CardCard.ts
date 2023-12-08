import { Component } from "../Abstract/Component";
import { TCard, TServices } from "../Abstract/Type";

export class CardCard extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TCard) {
    super(parrent, 'div', ["cardcard"]);

    const divCard = new Component(this.root, 'div', ["cardcard-div"]);
    new Component(divCard.root, 'img', ["cardcard-img"], null, ['src', 'alt'], [data.url, data.name]);
    new Component(divCard.root, 'span', ["cardcard-name"], data.name);
    new Component(divCard.root, 'span', ["cardcard-price"], `${data.price} руб.`);
    divCard.root.onclick = () => {
      this.addGoodInBasket();
    }
  }
  addGoodInBasket() {
    const user = this.services.authService.user;
    this.services.dbService.addToBasket(user, this.data)
      .catch(() => { })
  }
}