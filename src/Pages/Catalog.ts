import { Component } from "../Abstract/Component";
import { TBasket, TBear, TCard, TDataBasket, TFlower, TServices } from "../Abstract/Type";
import { BearCard } from "../Common/BearCard";
import { CardBasket } from "../Common/CardBasket";
import { CardCard } from "../Common/CardCard";
import { FlowerCard } from "../Common/FlowerCard";

export class Catalog extends Component {
  divNullBasket: Component;
  divFullBasket: Component;
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'div', ["catalog"])
    services.dbService.calcDataBasket();

    let isBasketClear = false;
    if (services.dbService.dataUser) {
      if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
    }
    this.divNullBasket = new Component(this.root, 'div', [])
    new Component(this.divNullBasket.root, 'p', ["cardbasket__text", "center__basket"], "Корзина пуста");

    const flowersCatalogNull = new Component(this.divNullBasket.root, 'div', ["catalog__flower"])
    new Component(flowersCatalogNull.root, 'p', ["basket__title"], "Букеты к выбору")
    const divFlowerNull = new Component(flowersCatalogNull.root, 'div', ["catalog__flower-div"])
    services.dbService.getAllFlowers().then((flowers) => {
      divFlower.root.innerHTML = '';
      this.putFlowerOnPage(divFlowerNull, flowers);
    });
    new Component(this.divNullBasket.root, 'p', ["basket__title"], "Рекомендуем")

    const bearsCatalogNull = new Component(this.divNullBasket.root, 'div', ["catalog__bear"])
    services.dbService.getAllBears().then((bears) => {
      bearsCatalog.root.innerHTML = '';
      this.putBearOnPage(bearsCatalogNull, bears);
    });

    const cardsCatalogNull = new Component(this.divNullBasket.root, 'div', ["catalog__card"])
    services.dbService.getAllCards().then((cards) => {
      cardsCatalog.root.innerHTML = '';
      this.putCardOnPage(cardsCatalogNull, cards);
    });

    this.divFullBasket = new Component(this.root, 'div', [])
    this.toggleBasket(isBasketClear);
    const divBasket = new Component(this.divFullBasket.root, 'div', ["basket__div-date"]);
    if (services.dbService.dataUser) {
      services.dbService.dataUser.basket.forEach(el => {
        this.putGoodsOnPage(divBasket, el);
      });
    };

    services.dbService.addListener('goodInBasket', (good) => {
      divBasket.root.innerHTML = '';
      if (services.dbService.dataUser) {
        services.dbService.dataUser.basket.forEach(el => {
          this.putGoodsOnPage(divBasket, el);
        })
      }
      this.toggleBasket(true);
    })

    const divTotal = new Component(this.divFullBasket.root, 'div', ["cardbasket__total"]);
    new Component(divTotal.root, 'span', ["cardbasket__total-span1"], "Итого:");
    const spanSumma = new Component(divTotal.root, 'span', ["cardbasket__total-span2"], `${services.dbService.dataBasket.summa},00 руб.`);
    const btnOplata = new Component(divTotal.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", "Купить"]);
    btnOplata.root.onclick = () => {
      const user = services.authService.user;
      services.dbService.addBasketInHistory(user);
    }
    services.dbService.addListener('changeDataBasket', (dataBasket) => {
      spanSumma.root.innerHTML = `${(dataBasket as TDataBasket).summa},00 руб.`;
      let isBasketClear = false;
      if (services.dbService.dataUser) {
        if (services.dbService.dataUser.basket.length > 0) isBasketClear = true;
      }
      this.toggleBasket(isBasketClear);
    })
    services.dbService.addListener("clearBasket", () => {//очистить корзину
      divBasket.root.innerHTML = '';
      this.toggleBasket(false);
    })

    const flowersCatalog = new Component(this.divFullBasket.root, 'div', ["catalog__flower"])
    new Component(flowersCatalog.root, 'p', ["basket__title"], "Также к выбору")
    const divFlower = new Component(flowersCatalog.root, 'div', ["catalog__flower-div"])
    services.dbService.getAllFlowers().then((flowers) => {
      divFlower.root.innerHTML = '';
      this.putFlowerOnPage(divFlower, flowers);
    });
    new Component(this.divFullBasket.root, 'p', ["basket__title"], "Рекомендуем")

    const bearsCatalog = new Component(this.divFullBasket.root, 'div', ["catalog__bear"])
    services.dbService.getAllBears().then((bears) => {
      bearsCatalog.root.innerHTML = '';
      this.putBearOnPage(bearsCatalog, bears);
    });

    const cardsCatalog = new Component(this.divFullBasket.root, 'div', ["catalog__card"])
    services.dbService.getAllCards().then((cards) => {
      cardsCatalog.root.innerHTML = '';
      this.putCardOnPage(cardsCatalog, cards);
    });

  }

  putFlowerOnPage(teg: Component, flowers: TFlower[]) {
    flowers.forEach((el) => {
      new FlowerCard(teg.root, this.services, el);
    })
  }
  putBearOnPage(teg: Component, bear: TBear[]) {
    bear.forEach((el) => {
      new BearCard(teg.root, this.services, el);
    })
  }
  putCardOnPage(teg: Component, card: TBear[]) {
    card.forEach((el) => {
      new CardCard(teg.root, this.services, el);
    })
  }

  putGoodsOnPage(teg: Component, good: TBasket) {
    new CardBasket(teg.root, this.services, good);
  }
  toggleBasket(isBasketClear: boolean) {
    if (isBasketClear) {
      this.divNullBasket.remove();
      this.divFullBasket.render();
    } else {
      this.divNullBasket.render();
      this.divFullBasket.remove();
    }
  }
}