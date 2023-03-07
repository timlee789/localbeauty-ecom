import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getError } from '@/utils/error';
import { Menu } from '@headlessui/react';
import DropdownLink from './dropdownlink';

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

export default function Categories() {

  const session = getSession();
  const { user } = session;

  const [{ loading, error, menus }, dispatch] = useReducer(reducer, {
    loading: true,
    menus: [],
    error: '',
  });


  const router = useRouter();
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
      <ul className='flex justify-center'>
        {menus.map((cat) => (
          <li>
          {cat.category}
        </li>
        ))}
        
      </ul>  
      {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className=" justify-center flex-wrap">
          <Menu as="div" className="relative inline-block mx-10 z-10">
                 <Menu.Button className="text-blue-600 font-bold text-lg">       
                 Menu
                 </Menu.Button>    
            {menus.map((cat) => (
              <div key={cat._id} className='flex justify-center'>        
              <Menu.Items className='absolute right-0 w-56 origin-top-right bg-white  shadow-lg'>
                    <Menu.Item>                      
                    <DropdownLink
                       className="dropdown-link"
                       href="/admin/dashboard"
                     >
                       {cat.category}
                     </DropdownLink>
                   </Menu.Item>             
                 </Menu.Items>
              </div>
            ))}
          </Menu>
          </div>
        </div>
      )} */}
  </div>
  
  );
}

