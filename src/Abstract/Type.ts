import { Timestamp } from "firebase/firestore";
import { AuthService } from "../Services/AuthService";
import { DBService } from "../Services/DBService";
import { LogicService } from "../Services/LogicService";

export type TServices = {
  authService: AuthService;
  logicService: LogicService;
  dbService: DBService;
}

export type TFlower = {
  name: string,
  price: number,
  description: string,
  size: string,
  url: string,
  id: string,
  type: string
}
export type TBear = {
  name: string,
  price: number,
  url: string,
  id: string,
  type: string
}
export type TCard = {
  name: string,
  price: number,
  url: string,
  id: string,
  type: string
}
export type TBasket = {
  good: TFlower | TBear | TCard
}

export type TDataUser = {
  name: string,
  fotoUrl: string,
  email: string,
  // basket: ;
  basket: TBasket[];
}
export type TDataBasket = {
  summa: number,
  supplement: number
}
export type TDataHistory = {
  basket: TBasket[],
  dataBasket: TDataBasket,
  data: Timestamp,
  id: string
}