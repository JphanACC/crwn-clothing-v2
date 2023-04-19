import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'
const CartIcon = () => {
    const { isCartOpen, setCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => {
        setCartOpen(!isCartOpen);
    }
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon
