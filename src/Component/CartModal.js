import { createSignal, onMount, For} from "solid-js";

import './ProductCard.css'

export default function ProductCard() {
  const LOCAL_STORAGE_KEY = "cartStor"
  const [cartShop, setCartShop] = createSignal([]);
  const [totalPrice, setTotalPrice] = createSignal(0);
  const [cartItem, setCartItem] = createSignal(0);
	onMount(async () => {
    let cartShopingData = localStorage.getItem(LOCAL_STORAGE_KEY)
    const x = await JSON.parse(cartShopingData)
		setCartShop(await [...cartShop(), ...x]);
    // console.log(cartShop())
    var total = 0
    for(let i=0; i<x.length; i++) {
      total = total + Number(x[i].cart.price)
    }
    // console.log(total)
    setTotalPrice(totalPrice() + total)
    setCartItem(cartItem() + x.length)
    
	});
  

  
  return <>
    <div class="modalCards">
      <For each={cartShop()} fallback={<p>Loading...</p>}>{ cart =>
        <figure>
          <img src={cart.cart.image} alt={cart.cart.Title} />
          <figcaption>
            <h1 style="display:inline" class="cartTitle">{cart.cart.Title}</h1>
            <p style="display:inline" class="cartTitle">$<span class="cartPrice">{cart.cart.price}</span></p>
          </figcaption>
        </figure>
      }</For>
    </div>
    <h3>Your cart contains {cartItem} items worth ${totalPrice}</h3>
  </>;
}
