import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { Menu } from '@headlessui/react';
import DropdownLink from './dropdownlink';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, signOut } from 'next-auth/react';

import  Cookie  from 'js-cookie';


function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const sellername = Cookie.get('Sellername');
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    setHydrated(true);
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  if (!hydrated) {
    return null;
  }
  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <div>
      <Head>
        <title>{title ? title + '-Bijoux' : '4X Xpression'}</title>
        <meta name="description" content="Destiny Wig Giveaway Event" />
        <link
          rel="image_src"
          href="https://bijouxhair.com/tim/ad/mainbanner.jpg"
        />
        <meta property="og:title" content="Destiny Wig Giveaway Event" />
        <meta
          property="og:image"
          content="https://bijouxhair.com/tim/ad/mainbanner.jpg"
        />
        <meta property="og:description" content="Destiny Wig Giveaway Event" />
        <meta property="og:site_name" content="Beauty Elements" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md ">

             {session?.user?.isAdmin? ( 
              <Link href="/">
              <div className="text-lg font-bold">{session.user.name}</div>
              </Link>
            ) : (
              <Link href="/">
              <div className="text-lg font-bold">{sellername}</div>
              </Link>
            )} 
           
           
           <div className='flex justify-between'>
              <Link href="/cart" className="px-4 flex">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
           
              {session?.user?.isAdmin? (
                 <Menu as="div" className="relative inline-block z-10">
                 <Menu.Button className="text-blue-600 font-bold text-lg">       
                  {/* { session.user.name } */}
                  Menu
                 </Menu.Button>
                 <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    {/* <Menu.Item>
                    <DropdownLink
                       className="dropdown-link"
                       href="/admin/dashboard"
                     >
                       Dashboard
                     </DropdownLink>
                   </Menu.Item> */}
                    <Menu.Item>
                    <DropdownLink
                       className="dropdown-link"
                       href="/admin/orders"
                     >
                       Orders
                     </DropdownLink>
                   </Menu.Item>
                  
                   <Menu.Item> 
                     <DropdownLink
                       className="dropdown-link"
                       href="/admin/products/productadd"
                     >
                       Product Add
                     </DropdownLink>
                   </Menu.Item>
                   <Menu.Item>
                     <DropdownLink
                       className="dropdown-link"
                       href="/admin/products/productedit"
                     >
                       Product Edit
                     </DropdownLink>
                   </Menu.Item>
                   {/* <Menu.Item>
                     <DropdownLink
                       className="dropdown-link"
                       href="/admin/users"
                     >
                       Users
                     </DropdownLink>
                   </Menu.Item> */}
                   <Menu.Item>
                     <DropdownLink
                       className="dropdown-link"
                       href="/admin/campaign/campaignhistory"
                     >
                       Campaign History
                     </DropdownLink>
                   </Menu.Item>
                   {/* <Menu.Item>
                     <DropdownLink
                       className="dropdown-link"
                       href="/admin/campaign/campaigninput"
                     >
                       Campaign Input
                     </DropdownLink>
                   </Menu.Item> */}
                   <Menu.Item>
                     <DropdownLink
                       className="dropdown-link"
                       href="/contest/gallery"
                     >
                       Event Gallery
                     </DropdownLink>
                   </Menu.Item>
                   <Menu.Item>
                     <div
                       className="dropdown-link"
                       href="#"
                       onClick={logoutClickHandler}
                       >
                       Logout
                     </div>
                   </Menu.Item>
                 </Menu.Items>
               </Menu>
              
              ) : session?.user?.storename ? (
                <div> <div>Welcome </div>
                    <button onClick={logoutClickHandler}> Logout</button>
               </div>
              ) : (
                <Link href="/login">
                  <div className="p-2">Login</div>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner lg: h-50">
          Copyright @2023 Localflyer.online
        </footer>
      </div>
    </div>
  );
}

export default Layout;
