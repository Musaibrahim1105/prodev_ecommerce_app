import React from 'react'

const ProductCard = () => {
  return (
    <div className='bg-gray-100'>
        <section className='md:h-full flex items-center text-gray-600'>
            <div className='container px-5 py-24 mx-auto'>
                <div className='text-center mb-12'>
                    <h5 className='text-base md:text-lg text-indigo-700 mb-1'> See Our Recent News</h5>
                    <h1 className='text-4xl md:text-6xl text-gray-700 font-semibold'> Tailwind CSS Responsive Card</h1>
                </div>

                <div className='flex flex-wrap m-4'>
                    <div className='p-4 sm:w-1/3'>
                        <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                            <img src="https://images.unsplash.com/photo-1758380388614-66e9fd1aa159?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8" alt="image" className='lg:h-48 md-h-48 w-full object-cover object-center' />
                            <div className='p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in'>
                                <h2 className=' text-base font-medium text-indigo-300 mb-1'> September 20, 2025</h2>
                                <h1 className='text-2xl font-semibold mb-3'>Cities are crowded</h1>
                                <p className='leading-relaxed mb-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem eos quae, iure deserunt adipisci odio maxime repellat possimus quibusdam quasi minima ducimus culpa similique, natus, id aperiam sequi cum. Optio.</p>
                                <div className='flex items-center flex-wrap'>
                                    <a href="#" className=' text-indigo-300 inline-flex items-center md:mb-2 lg:mb-0'>Read more...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default ProductCard