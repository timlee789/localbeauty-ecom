import db from '../../../utils/db';
import { getSession } from 'next-auth/react';
import Product from '../../../models/Product';

const postHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: ' Signin Required' });
  }
  const { user } = session;
  if (req.method !== 'POST') {
    return;
  }
  const { productname, price, stock, description1, description2, imageField, category } = req.body;

  await db.connect();
  const newProduct = new Product({
    productname,
    price,
    countInStock: stock,
    description1,
    description2,
    category,
    image: imageField,
    user: user._id,
  });
 const product = await newProduct.save();

  await db.disconnect();
  res.status(200).send({ message: 'Product created successfully', product });
};

export default postHandler;
