import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState(1);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        })
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

        if (checkProductInCart) {
            const updateCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updateCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setCartItems(newCartItems);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price * product.quantity)
    }

    const toggleCartItemQuantity = (id, value) => {
        let foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value == 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
        } else if (value == 'dec') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        }
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                qty,
                totalQuantities,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                totalPrice,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
