import React, { useContext } from 'react';
import db from '../../utils/db';
import CustomItemScreen from '../../components/customitem';
import Layout from '../../components/layout';
import SubLayout from '@/components/subLayout';
import Product from '../../models/Product';
import User from '../../models/Users';
import HeadBanner from '../../components/headbanner';
import Cookies from 'js-cookie';


// import Registration from '../contest/registration';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';



function CategoryScreen({ user, product }) {
const seller = Cookies.get('Seller');

  return (
    <Layout>
    <SubLayout/>
  
      <div>
        {user.map((heads) => (
          <HeadBanner key={heads._id} img1={heads.img1} />
        ))}

        <div className="lg:justify-center mt-4">
          <div>
         
            <div>
              <div className=" grid grid-cols-1 p-5 gap-5 md:grid-cols-4 ">
                {product.map((sto) => (
                  <CustomItemScreen
                    key={sto._id}
                    _id={sto._id}
                    productname={sto.productname}
                    price={sto.price}
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
  const seller = Cookies.get('Seller');
  const { params } = context;
  const { category } = params;
  await db.connect();
  const user = await User.find({ _id: seller });
  const product = await Product.find({ category: 'Destiny Wig' , user: seller});
  //const featuredProducts = await Product.find({ isFeatured: true }).lean();
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      //featuredProducts: featuredProducts.map(db.convertDocToObj),
      //user: user,
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
export default CategoryScreen;

