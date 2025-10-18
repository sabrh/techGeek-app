import dbConnect, { collectionNamesObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import ProductActions from '@/components/ProductActions';

export default async function ProductDetailsPage({ params }) {
  const productCollection = dbConnect(collectionNamesObj.productCollection);
  const data = await productCollection.findOne({ _id: new ObjectId(params.id) });

  return (
    <div>
      {/*<div className="flex justify-center">
        <figure className="relative w-full max-w-5xl">
          <Image
            src="/assets/images/banner/banner.png"
            width={1100}
            height={300}
            alt="banner"
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center ps-10">
            <h2 className="text-white font-bold text-xl md:text-2xl">Product Details</h2>
          </div>
        </figure>
      </div>*/}

      <div className="flex flex-col lg:flex-row items-center mx-auto max-w-4xl gap-8 my-10 p-5">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md" />
        {/*<Image
          src={data.image}
          alt={data.name}
          width={400}
          height={300}
          className="object-contain rounded-md"
        />*/}
        <div className="flex-1">
          <h2 className="font-bold text-xl my-5">{data.name}</h2>
          <div className="flex flex-col md:flex-row gap-4 text-gray-700 text-sm">
            <p>Category: {data.category}</p>
            <p>Price: ${data.price}</p>
          </div>
          <p className="my-5">{data.description}</p>
          <ProductActions productId={data._id.toString()} />
        </div>
      </div>
    </div>
  );
}
