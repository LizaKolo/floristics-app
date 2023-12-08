import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class Header extends Component {
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'header', ["header"]);


    const divAdress = new Component(this.root, 'div', ["header__adress"])
    new Component(divAdress.root, 'span', [], "г. Брест, ул. Московская 287а")
    const phone = new Component(divAdress.root, 'div', ["header__number"])
    new Component(phone.root, 'img', [], null, ["src", "alt"], ["./assets/Icons/phone.svg", 'phone'])
    new Component(phone.root, 'span', [], "+375(29)888-88-88")
    new Component(divAdress.root, 'span', [], "Режим работы: 7:40 - 24:00")

    const divNavigation = new Component(this.root, 'div', ["header__navigation"]);
    const logo = new Component(divNavigation.root, 'a', [], null, ["href"], ["#"]);
    new Component(logo.root, 'img', [], null, ["src", "alt"], ["./assets/Icons/logo.svg", "logotip"]);
    const menu = new Component(divNavigation.root, 'div', ['header__menu']);
    new Component(menu.root, 'a', [], 'О нас', ['href'], ["#"])
    new Component(menu.root, 'a', [], 'Каталог', ['href'], ["#catalog"])
    new Component(menu.root, 'a', [], 'Личный кабинет', ['href'], ["#account"])
  }
}