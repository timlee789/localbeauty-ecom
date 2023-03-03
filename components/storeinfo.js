import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

function StoreInfo(props) {
  return (
    <div>
      <div className="card mt-5" key={props.id}>
        <Link href={`/store/${props.id}`}>
          <div>
            <h2 className="text-md text-center font-bold">
              City: {props.city}
            </h2>
            <h2 className="text-lg font-bold p-5 text-center">{props.name}</h2>
          </div>
          <div className='text-center'>
            <h3>{props.address}</h3>
            <h2>{props.state}</h2>
            <h3>{props.tel}</h3>
          </div>
          {/* <Image
            //src={props.img1}
            alt={props.name}
            className="rounded shadow-md"
            width={350}
            height={70}
          /> */}
        </Link>
      </div>
    </div>
  );
}

export default StoreInfo;
