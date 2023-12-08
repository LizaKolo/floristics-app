import { Component } from "../Abstract/Component";
import { TFlower, TServices } from "../Abstract/Type";

export class FlowerCard extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TFlower) {
    super(parrent, 'div', ["flowercard"]);
    const divFlower = new Component(this.root, 'div', ["flowercard-div"]);
    new Component(divFlower.root, 'img', ["flowercard-img"], null, ['src', 'alt'], [data.url, data.name]);
    new Component(divFlower.root, 'span', ["flowercard-name"], data.name);
    new Component(divFlower.root, 'span', ["flowercard-price"], `${data.price} руб.`);

    divFlower.root.onclick = () => {
      this.addGoodInBasket();
    }
    // services.dbService.addListener('goodInBasket', (dat) => {
    //   const user = services.authService.user;
    //   services.dbService.dataUser?.basket.forEach(el => {
    //     if (el.good.type === data.type) {
    //       services.dbService.delGoodFromBasket(user, el.good)
    //     }
    //   })
    // })
  }
  addGoodInBasket() {
    const user = this.services.authService.user;
    this.services.dbService.addToBasket(user, this.data)
      .catch(() => { })
  }
}