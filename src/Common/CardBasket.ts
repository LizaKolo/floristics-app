import { Component } from "../Abstract/Component";
import { TBasket, TBear, TCard, TFlower, TServices } from "../Abstract/Type";
import { CardBasketBear } from "./CardBasketBear";
import { CardBasketCard } from "./CardBasketCard";

export class CardBasket extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TBasket) {
    super(parrent, 'div', ["cardbasket"])
    if (data.good.type === 'flower') {
      const goodName = new Component(this.root, 'span', ["cardbasket__name"], `Букет: "${data.good.name}"`);
    }
    const divRow = new Component(this.root, 'div', ['cardbasket__row']);
    if (data.good.type === 'flower') {
      const flowerImage = new Component(divRow.root, 'img', ["cardbasket__flower-img"], null, ['src', 'alt'], [data.good.url, data.good.name]);
    }
    const divColumn = new Component(divRow.root, 'div', ["cardbasket__column"]);
    if (data.good.type === 'flower') {
      new Component(divColumn.root, 'p', ["cardbasket__text"], "Выберите размер букета");
      const divButton = new Component(divColumn.root, 'div', ["cardbasket__buttons"]);
      new Component(divButton.root, 'input', ["cardbasket__input", "active"], null, ["value", "type", "data-supplement"], ["Стандарт", "button", '0']);
      new Component(divButton.root, 'input', ["cardbasket__input"], null, ["value", "type", "data-supplement"], ["+30% цветов", "button", '30']);
      new Component(divButton.root, 'input', ["cardbasket__input"], null, ["value", "type", "data-supplement"], ["+60% цветов", "button", '60']);
      const buttons = Array.from(divButton.root.children);
      buttons.forEach((button) => {
        button.addEventListener('click', (el) => {
          this.services.dbService.dataBasket.supplement = Number((el.target as HTMLInputElement).dataset.supplement);
          this.services.dbService.calcDataBasket();
          buttons.forEach((btn) => {
            btn.classList.remove('active');
          });
          button.classList.add('active');
        });
      });
      const divSize = new Component(divColumn.root, 'div', ["cardbasket__size"]);
      const size = new Component(divSize.root, 'span', [], `Размер: ${(data.good as TFlower).size}`);
      new Component(divSize.root, 'p', [], "Доставка в пределах МКАД в г. Москва: Бесплатно");
      const price = new Component(divColumn.root, 'span', ["cardbasket__price"], `${data.good.price},00 руб.`);

      const divRowRecomendation = new Component(divColumn.root, 'div', ["cardbasket__recomendation-row"]);

      if (services.dbService.dataUser) {
        services.dbService.dataUser.basket.forEach(el => {
          if (el.good.type === 'bear') {
            this.putBearOnPage(divRowRecomendation, el.good);
          }
        });
      };
      if (services.dbService.dataUser) {
        services.dbService.dataUser.basket.forEach(el => {
          if (el.good.type === 'card') {
            this.putCardOnPage(divRowRecomendation, el.good);
          }
        });
      };

    }
  }
  putBearOnPage(teg: Component, good: TBear) {
    new CardBasketBear(teg.root, this.services, good);

  }
  putCardOnPage(teg: Component, good: TCard) {
    new CardBasketCard(teg.root, this.services, good);
  }
}