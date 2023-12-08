import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class MainPage extends Component {
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, 'div', ["mainpage"])

    const divImage = new Component(this.root, 'div', ["mainpage__image-bg"])
    new Component(divImage.root, 'h1', ["mainpage__image-h1"], "Каждый букет - произведение искусства")
    new Component(divImage.root, 'p', ["mainpage__image-p"], "Сделайте жизнь ярче с нашими букетами")

    const divIformation = new Component(this.root, 'div', ["mainpage__information"])
    const divInfa = new Component(divIformation.root, 'div', ["mainpage__infa"])
    new Component(divInfa.root, 'span', ["mainpage__infa-span1"], 'О нас')
    const divDescription = new Component(divInfa.root, 'div', ["mainpage__description"])
    new Component(divDescription.root, 'span', ["mainpage__infa-span2"], 'Посетите нашу чудесную цветочную лавку!')
    new Component(divDescription.root, 'p', ["mainpage__infa-span3"], 'Наша лавка — это выражение того, что мы любим делать: быть креативными с цветочными композициями. Если вы ищете флориста для своей идеальной свадьбы или просто хотите украсить любую комнату уникальным живым декором, HANABIRA с удовольстивем поможет вам.')

    new Component(divIformation.root, 'img', ["mainpage-img"], null, ["src", "alt"], ["./assets/Image.png", 'image'])
  }
}