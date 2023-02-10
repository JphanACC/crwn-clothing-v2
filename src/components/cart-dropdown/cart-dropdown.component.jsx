import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        //setIsCartOpen(!isCartOpen);
        navigate('/checkout');
    }
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-items"/> 
                {cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem}/>
                })}
                
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
            
        </div>
    )
}

export default CartDropdown
