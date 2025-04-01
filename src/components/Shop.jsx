import { useEffect, useContext } from "react";
import { API_KEY, API_URL } from "../config";

import { ShopContext } from "../context";

import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
  const { loading, order, isBasketShow, altername, setGoods } = useContext(ShopContext);

  // 🎲 Генерируем массив 50 случайных цен от 200 до 1000
  const prices = Array.from(
    { length: 50 },
    () => Math.floor(Math.random() * (1000 - 200 + 1)) + 200
  );

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        const updatedItems = data.items.map((item, index) => ({
          ...item,
          price: prices[index % prices.length], // 💰 Назначаем цену
        }));
        setGoods(updatedItems);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(function getGoods() {
  //   fetch(API_URL, {
  //     headers: {
  //       Authorization: API_KEY,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setGoods(data.items);
  //     });
  //     // eslint-disable-next-line
  // }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} />
      {loading ? <Preloader /> : <GoodsList />}
      {isBasketShow && <BasketList />}
      {altername && <Alert />}
    </main>
  );
}

export { Shop };
