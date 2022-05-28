import { useContext } from 'react'
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  //console.log(cartItems)

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <span className='header-block'>Product</span>
        <span className='header-block'>Description</span>
        <span className='header-block'>Quantity</span>
        <span className='header-block'>Price</span>
        <span className='header-block'>Remove</span>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
      ))}
    </div>
  )
}

export default Checkout;