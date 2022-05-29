import { useContext } from "react";
import { Link } from 'react-router-dom';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />
          }) : (
            <EmptyMessage>Your Cart is empty</EmptyMessage>
          )
        }
      </CartItems>
      <Link to='/checkout'>
        <Button>Go to Checkout</Button>
      </Link>

    </CartDropdownContainer>
  )
}

export default CartDropdown;