//import bcrypt from 'bcrypt';
//import User from '../../../models/Users';
import Guest from '../../../models/Guest';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, tel, password } = req.body;
  // if (!name || !email || !password || password.trim().length < 5) {
  //   res.status(422).json({
  //     message: 'Validation error',
  //   });
  //   return;
  // }
  await db.connect();

  const existingUser = await Guest.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: 'User exist already!' });
    await db.disconnect();
    return;
  }

  const newguest = new Guest({
    name,
    email,
    tel,
    password
  });
  const guest = await newguest.save();
  await db.disconnect();
  res.status(201).send({ 
     _id: guest._id,
     name: guest.name,
     email: guest.email,
    // tel: guest.tel,
   // image: guest.IsAdmin,
  });
}
export default handler;
