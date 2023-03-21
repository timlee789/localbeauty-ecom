import React, { useContext } from 'react';
import db from '../../utils/db';
import CustomItemScreen from '../../components/customitem';
import Layout from '../../components/layout';
import Product from '../../models/Product';
import User from '../../models/Users';
import HeadBanner from '../../components/headbanner';
import Cookies from 'js-cookie';
import Store from '../../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';




function StoreScreen({ user, product}) {
   //const { state, dispatch } = useContext(Store);
   //const { cart } = state;
   //const { userStore} = cart;
//    dispatch({
//     type: 'SAVE_USER_STORE',
//     payload: user[0]._id
// });
  Cookies.set( 'Seller', user[0]._id)   
  Cookies.set( 'Sellername', user[0].name)   
  //Cookies.set( 'Seller', JSON.stringify(user[0]._id) )   
      
 //console.log(user)
  return (
    <Layout>
  
  
      <div>
        {user.map((heads) => (
          <HeadBanner key={heads._id} banner={heads.banner} />
        ))}

        <div className="lg:justify-center mt-4">
          <div>
            {/* <div>
              {store.map((hed) => (
                <Registration key={hed._id} id={hed._id} />
              ))}
            </div> */}
            <div>
              <div className=" grid grid-cols-1 p-5 gap-5 md:grid-cols-4 ">
                {product.map((sto) => (
                  <CustomItemScreen
                    key={sto._id}
                    _id={sto._id}
                    productname={sto.productname}
                    listprice={sto.listprice}
                    saleprice={sto.saleprice}
                    image={sto.image}
                    description1={sto.description1}
                    user={sto.user}
                    countInStock={sto.countInStock}
                  />
                ))}
              </div>
              {/* <HomePage /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await db.connect();
  const user = await User.find({ _id: id });
  const product = await Product.find({ user: id });
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
export default StoreScreen;

