import dbConnect from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function ProductsSection () {

    const productCollection = dbConnect("products");
    const data = await productCollection.find({}).toArray();
    
    return (
        <section>
        <h3 className='mx-auto font-bold text-lg'>Our Products</h3>
        <div className='grid grid-cols-12 gap-4 container mx-auto'>
        {data.map((item) => {
            return (
                <div className='col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border' key={item._id}>
                    <figure className='w-full h-3/4 flex justify-center items-center'>
                        <Image src={item.image} 
                        className='w-full h-full object-fill'
                        width={300} height={200} alt={item.name} />
                    </figure>
                    <div className='flex justify-between items-center mt-4'>
                        <div>
                            <h2 className='font-bold text-xl'>{item.name}</h2>
                            <p className='font-bold text-xl'>$ {item.price}</p>
                        </div>
                        <div>
                            <Link className='/product-details'>Details</Link>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
        </section>
    );
};

