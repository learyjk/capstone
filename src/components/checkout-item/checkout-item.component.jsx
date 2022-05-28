import { useContext } from "react";
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'


const CheckoutItem = ({ checkoutItem }) => {
  const { id, imageUrl, name, quantity, price } = checkoutItem;
  const { removeItemFromCart, adjustCartItemQuantity } = useContext(CartContext);

  const handleRemoveCartItem = () => {
    removeItemFromCart(id);
  }

  const handleChangeQuantity = (amount) => {
    adjustCartItemQuantity(id, amount)
  }

  return (
    <div className='checkout-item-container'>
      <img className='image-container' src={imageUrl} alt={name} />
      <span className='name'>{name}</span>
      <div className='quantity'>
        <span className='quantity arrow' onClick={() => handleChangeQuantity(-1)}>-</span>
        <span className='quantity'>{quantity}</span>
        <span className='quantity arrow' onClick={() => handleChangeQuantity(1)}>+</span>
      </div>

      <span className='price'>{price}</span>
      <span className='remove-button' onClick={handleRemoveCartItem}>X</span>
    </div>
  );
}

export default CheckoutItem;