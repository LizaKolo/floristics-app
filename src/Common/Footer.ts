import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class Footer extends Component {
  constructor(parrent: HTMLElement) {
    super(parrent, 'footer', ["footer"]);

    const logo = new Component(this.root, 'a', [], null, ["href"], ["#"]);
    new Component(logo.root, 'img', [], null, ["src", "alt"], ["./assets/Icons/logo.svg", "logotip"]);

    const divMenu = new Component(this.root, 'div', ["footer__menu"])
    new Component(divMenu.root, 'h2', ["footer__menu-title"], 'Меню')
    new Component(divMenu.root, 'a', [], 'Каталог', ['href'], ["#catalog"])
    new Component(divMenu.root, 'a', [], 'О нас', ['href'], ["#"])

    const divContacts = new Component(this.root, 'div', ["footer__contacts"])
    new Component(divContacts.root, 'h2', ["footer__menu-title"], "Контакты")
    new Component(divContacts.root, 'span', [], "Адрес: г. Брест, ул. Московская 287")
    new Component(divContacts.root, 'span', [], "Телефон: +375(29)888-88-88 ")
    new Component(divContacts.root, 'span', [], "E-mail: flowers.by@gmail.com")

    const divSocial = new Component(this.root, 'div', ["footer__social"])
    new Component(divSocial.root, 'h2', ["footer__menu-title"], "Следите за нами")
    const divIcons = new Component(divSocial.root, 'div', ["footer__icons"])
    const inst = new Component(divIcons.root, 'a', [], null, ["href"], ["#"]);
    new Component(inst.root, 'img', [], null, ["src", "alt"], ["./assets/Icons/Inst.svg", "instagram"]);
    const viber = new Component(divIcons.root, 'a', [], null, ["href"], ["#"]);
    new Component(viber.root, 'img', [], null, ["src", "alt"], ["./assets/Icons/Viber.svg", "viber"]);
    const telega = new Component(divIcons.root, 'a', [], null, ["href"], ["#"]);
    new Component(telega.root, 'img', [], null, ["src", "alt"], ["./assets/Icons/Telega.svg", "telegram"]);
  }
}