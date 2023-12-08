import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";

export class CardHistory extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TDataHistory) {
    super(parrent, 'div', ["cardhistory"])

    const divTitle = new Component(this.root, 'div', ["cardhistoru__title"]);
    new Component(divTitle.root, 'span', ["cardhistory__text"], 'Наименование');
    new Component(divTitle.root, 'span', ["cardhistory__text"], 'Цена');

    const divRow = new Component(this.root, 'div', ["cardhistoru__row"]);
    data.basket.forEach(el => {
      const divColumn = new Component(divRow.root, 'div', ["cardhistoru__column"]);
      new Component(divColumn.root, 'img', ["cardhistory__img"], null, ["src", 'alt'], [el.good.url, el.good.name]);
      new Component(divColumn.root, 'span', ["cardhistory__name"], el.good.name)
      new Component(divColumn.root, 'span', ["cardhistory__price"], `${el.good.price}.00 руб.`)
    })
    const divSumm = new Component(this.root, 'div', ["cardhistoru__title"]);
    new Component(divSumm.root, 'span', ["cardhistory__text"], 'Итого');
    new Component(divSumm.root, 'span', ["cardhistory__text"], `${data.dataBasket.summa},00 руб.`);
  }
}