import { createSignal, Show } from "solid-js";
import ProductCard from './Component/ProductCard'
import CartModal from './Component/CartModal'
import './App.css';

function App() {
  const [show, setShow] = createSignal(false);
  return (
    <div class="App">
      <ul class="topnav">
        <li class="right"><span>Solid Shop!</span></li>
      </ul>
      
      <Show
        when={show()}
        fallback={
        <span class="btn" onClick={(e) => setShow(true)}>
          <i class="material-icons">shopping_cart</i>
        </span>
        }
      >
        <div class="modal">
          <p>
            <span class="modalBtn" onClick={(e) => setShow(false)}>
            <i class="material-icons">close</i>
            </span>
            <span class="modalTitle">
              Cart Shoping
            </span>
          </p>
          <CartModal />
        </div>
      </Show>
          

      <ProductCard />
    </div>
  );
}

export default App;
