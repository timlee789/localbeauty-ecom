import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import { Menu } from '@headlessui/react';
import DropdownLink from './dropdownlink';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getError } from '@/utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, menus: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function subLayout() {
  const [{ loading, error, menus }, dispatch] = useReducer(reducer, {
    loading: true,
    menus: [],
    error: '',
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/menu/menulist');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>      
      <div>      
          <nav >       
              {loading ? (
                <div>Loading...</div>
              ) : error?(
                <div className='alert-error'>{error}</div>
              ) : (
                <div>
                   <ul className="flex h-4 items-center px-4 justify-between ">
                    {menus.map((cat) => (
                       <li>
                        <Link href={`/category/${cat.category}`}>
                      {cat.category}
                      </Link>
                     </li>
                    ))}
                    
                    
                 </ul>
                </div>
              )}        
          </nav>     
      </div>
    </div>
  );
}

export default subLayout;
