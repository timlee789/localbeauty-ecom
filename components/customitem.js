import React, { useContext } from 'react';
import Image from 'next/image';
import { Store } from '../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function CustomItemScreen(props) {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === props._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/cartproduct/${props._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...props, quantity } });
  };
  return (
    <div >
      <div className="flex justify-center card ">
         <Carousel showArrows={true} showThumbs={false} swipeable={true} autoPlay >
        <div>
          <Image
            src={props.image}
            alt="banner"
            width={200}
            height={240}
            className="element1"
          />
          </div>
        <div>
          <Image
            src={props.image}
            alt="banner"
            width={200}
            height={240}
            className="element1 lg:element2"
          />
          </div>
        <div>
          <Image
            src={props.image}
            alt="banner"
            width={200}
            height={240}
            className="element1  lg:element2"
          />
          </div>
        <div>
          <Image
            src={props.image}
            alt="banner"
            width={200}
            height={240}
            className="element1  lg:element2"
          />
          </div>
          
        </Carousel>
      </div>
      <div>
      <div className="bg-slate-100 mb-6 text-center">
        <div className='flex justify-center'>
        <div className="text-xs text-red-800 line-through"> U$: {props.listprice}</div> &nbsp;&nbsp;&nbsp;
        <div className="font-bold text-sm">sale U$: {props.saleprice}</div>
        </div>
        <div>{props.description}</div>
        <div className="font-bold text-xs text-blue-800 mb-4 mt-2">{props.description1}</div>
        <div className='text-xs'>{props.productname}</div>
        {/* <div>{props.user}</div> */}
        <button className="primary-button w-full font-bold text-sm" onClick={addToCartHandler}>
          Add to Cart
        </button>
      </div>
      </div>
      {/* <div>{props.user}</div> */}
    </div>
  );
}
