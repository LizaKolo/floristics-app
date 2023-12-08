import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, Timestamp } from "firebase/firestore";
import { Observer } from "../Abstract/Observer";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { TBasket, TBear, TCard, TDataBasket, TDataHistory, TDataUser, TFlower } from "../Abstract/Type";

export class DBService extends Observer {
  private db: Firestore = getFirestore(this.DBFirestore);

  dataUser: TDataUser | null = null;

  dataBasket: TDataBasket = {
    summa: 0,
    supplement: 0
  };

  constructor(private DBFirestore: FirebaseApp) {
    super();
  }

  async getDataUser(user: User | null): Promise<void> {
    if (user === null) return;

    const docRef = doc(this.db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.dataUser = docSnap.data() as TDataUser;
      // console.log(docSnap.data());
    } else {
      const data = {
        email: user.email,
        name: user.displayName,
        fotoUrl: user.photoURL,
        basket: [],
      };
      await setDoc(doc(this.db, "users", user.uid), data);
      const docSetSnap = await getDoc(docRef);
      this.dataUser = docSetSnap.data() as TDataUser || null;
      console.log("create documemt");
    }
  }

  async getAllFlowers(): Promise<TFlower[]> {
    const q = query(collection(this.db, 'flowers'));
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    const flowers = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      const url = await getDownloadURL(uri);
      const flower = {
        name: data.name as string,
        price: data.price as number,
        description: data.description as string,
        size: data.size as string,
        type: data.type as string,
        url: url,
        id: doc.id
      };
      return flower;
    });
    return Promise.all(flowers);
  }
  async getAllBears(): Promise<TBear[]> {
    const q = query(collection(this.db, 'bears'));
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    const bears = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      const url = await getDownloadURL(uri);
      const bear = {
        name: data.name as string,
        price: data.price as number,
        type: data.type as string,
        url: url,
        id: doc.id
      };
      return bear;
    });
    return Promise.all(bears);
  }
  async getAllCards(): Promise<TCard[]> {
    const q = query(collection(this.db, 'cards'));
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    const cards = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      const url = await getDownloadURL(uri);
      const card = {
        name: data.name as string,
        type: data.type as string,
        price: data.price as number,
        url: url,
        id: doc.id
      };
      return card;
    });
    return Promise.all(cards);
  }

  async addToBasket(user: User | null, good: TFlower | TBear | TCard): Promise<void> {
    try {
      // Проверяем наличие пользователя и данных пользователя
      if (!user || !this.dataUser) return;

      // Проверяем, есть ли товар уже в корзине
      const index = this.dataUser.basket.find(el => el.good.id === good.id);
      if (index) {
        console.log("Товар уже есть в корзине");
      } else {
        // Копируем данные пользователя
        const newUser: TDataUser = { ...this.dataUser };
        const existingIndex = newUser.basket.findIndex(el => el.good.type === good.type);

        if (existingIndex !== -1) {
          // Если товар уже есть в корзине, удаляем его
          newUser.basket.splice(existingIndex, 1);
        }
        // Создаем новый объект корзины
        const newBasket: TBasket = { good: good };

        // Добавляем новую корзину в пользователя
        newUser.basket.push(newBasket);
        console.log(user.uid)
        // Обновляем данные пользователя в Firestore
        await setDoc(doc(this.db, "users", user.uid), newUser)
          .then(() => {
            // Обновляем данные пользователя в текущем состоянии
            this.dataUser = newUser;

            // Диспатчим событие 'goodInBasket' с новой корзиной
            this.calcDataBasket();
            this.dispatch('goodInBasket', good);
            this.dispatch('changeDataBasket', this.dataBasket);
          })

      }
    } catch (error) {
      console.log(error);
    }
  }
  async delGoodFromBasket(user: User | null, good: TFlower | TBear | TCard): Promise<void> {
    if (!user || !this.dataUser) return;

    const newBasket = this.dataUser.basket.filter((el) => el.good.id !== good.id);

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);
    newUser.basket = newBasket;

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        this.calcDataBasket();
        this.dispatch('delGoodFromBasket', good.id);
        this.dispatch('changeDataBasket', this.dataBasket);
      })
      .catch(() => {

      })
  }

  calcDataBasket() {
    if (!this.dataUser) return;
    let summa = 0;
    this.dataUser.basket.forEach(el => {
      summa += el.good.price;
    });
    this.dataBasket.summa = summa + this.dataBasket.supplement;
    this.dispatch('changeDataBasket', this.dataBasket);
  }
  async addBasketInHistory(user: User | null): Promise<void> {//добавление корзины в историю
    if (!user || !this.dataUser) return;

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser)
    newUser.basket = [];

    const dataHistory = {
      basket: this.dataUser.basket,
      dataBasket: this.dataBasket,
      data: Timestamp.now()
    };
    await addDoc(collection(this.db, 'users', user.uid, 'history'), dataHistory)
      .then(async () => {
        await setDoc(doc(this.db, 'users', user.uid), newUser)
          .then(() => {
            if (!this.dataUser) throw "БД отсутствует";
            this.dataUser.basket.forEach((el) => {
              this.dispatch('delGoodFromBasket', el.good.id);
            })
            this.dispatch('addInHistory', dataHistory)
            this.dataUser = newUser;
            this.calcDataBasket();
            this.dispatch('clearBasket');
            this.dispatch('changeDataBasket', this.dataBasket);
            // this.calcCountDocsHistory(user);
          })
          .catch(() => { });
      })
      .catch(() => { });
  }
  async getAllHistory(user: User | null): Promise<TDataHistory[]> {
    if (!user || !this.dataUser) return [];
    const querySnapshot = await getDocs(collection(this.db, 'users', user.uid, 'history'));
    const rez = querySnapshot.docs.map((doc) => {
      const data = doc.data() as TDataHistory;
      data.id = doc.id;
      return data;
    });
    return rez;
  }
}
