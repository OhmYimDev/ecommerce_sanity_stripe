import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link'
import { runFireworks } from '../lib/utils';
import { useStateContext } from '../context/StateContext';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);
    return (
        <div className='success-container'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h1>Thank You For Your Order!</h1>
                <p className='email-msg'>Check your email inbox for the receipt.</p>
                <p className='description'>If you have any questions, please email
                    <a className='email' href='mailto:phongphan_dw@hotmail.com'>
                        phongphan_dw@hotmail.com
                    </a>
                </p>
                <Link href='/'>
                    <button type='button' width={300} className='btn-continue-shop'>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success
