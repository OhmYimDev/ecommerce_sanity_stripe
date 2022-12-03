import React, { useRef } from 'react';
import { useStateContext } from '../context/StateContext';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { urlFor } from '../lib/client';

import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';

const Cart = () => {
    const cartRef = useRef();

    const { setShowCart,
        totalQuantities,
        cartItems,
        toggleCartItemQuantity,
        onRemove,
        totalPrice
    } = useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems)
        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className="cart-container">
                <button className='cart-heading'
                    type='button'
                    onClick={() => setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="num-of-items">({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping is empty</h3>
                        <button
                            type='button'
                            className="btn-continue-shopping"
                            onClick={() => setShowCart(false)}
                        >Continue Shopping </button>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div key={item._id} className="product">
                            <img className='cart-product-image' src={urlFor(item?.image[0])} alt={item.name} />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div className='quantity-desc'>
                                        <span className='minus'
                                            onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                                            <AiOutlineMinus />
                                        </span>
                                        <span className='num'>
                                            {item.quantity}
                                        </span>
                                        <span className='plus'
                                            onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                                            <AiOutlinePlus />
                                        </span>
                                    </div>
                                    <button type='button'
                                        className='remove-item'
                                        onClick={() => onRemove(item)}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal :</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type='button'
                                className='btn-pay'
                                onClick={handleCheckout}>
                                Pay with stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
