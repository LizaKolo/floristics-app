import { Component } from "../Abstract/Component";
import { TBasket, TCard, TServices } from "../Abstract/Type";

export class CardBasketCard extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TCard) {
    super(parrent, 'div', ["cardbasket__recomendation-column"])
    let card = false;
    services.dbService.dataUser?.basket.forEach(el => {
      if (el.good.type === 'card') card = true;
    })
    if (card && data.type === 'card') {
      new Component(this.root, 'img', ["cardbasket__bear-img"], null, ["src", "alt"], [data.url, data.name])
      new Component(this.root, 'span', ["cardbasket__bear-price"], `${data.price} руб.`)
      const btnDel = new Component(this.root, 'input', ["cardbasket__bear-input"], null, ['value', 'type'], ['Убрать', 'button']);
      btnDel.root.onclick = () => {
        const user = this.services.authService.user;
        this.services.dbService.delGoodFromBasket(user, this.data)
          .then(() => {
            this.remove();
          })
          .catch(() => { })
      }
    }
  }
}