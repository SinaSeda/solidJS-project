// import { mergeProps } from "solid-js";
import { createSignal, onMount, For, createEffect, mergeProps } from "solid-js";

import './ProductCard.css'

export default function ProductCard(props) {
  // const merged = mergeProps({ greeting: "Hi", name: "John" }, props);
  const LOCAL_STORAGE_KEY = "cartStor"
  const [cart, setCart] = createSignal([]);
  let localCartStor = localStorage.getItem(LOCAL_STORAGE_KEY)
  const [cartData, setcartData] = createSignal([]);
	onMount(async () => {
    const res = await fetch(`https://6125d9d12d4e0d0017b6c4af.mockapi.io/Product`);
		setCart(await res.json());
    // localStorage.setItem(LOCAL_STORAGE_KEY, localCartStor)
    if(localCartStor !== null) {
      const localStorCart = JSON.parse(localCartStor)
      setcartData([...cartData(), ...localStorCart])
    }
	});
  

  function updateShoppingCart(x) {
    
    setcartData([...cartData(), x])
    // console.log(cartData())
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartData()))
  }
  return <>

    <div class="cards">
      <For each={cart()} fallback={<p>Loading...</p>}>{ cart =>
        <figure>
          <img src={cart.image} alt={cart.Title} />
          <figcaption>
            <h1 class="cartTitle">{cart.Title}</h1>
            <p class="cartTitle">$<span class="cartPrice">{cart.price}</span></p>
            <p class="material-icons cartBtn" onClick={() => updateShoppingCart({cart})}>add_shopping_cart</p>
          </figcaption>
        </figure>
      }</For>
    </div>
  </>;
}
