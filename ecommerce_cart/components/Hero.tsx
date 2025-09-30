import React from 'react';


const Hero: React.FC = () => {
return (
<section className="relative bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
<div className="bg-black bg-opacity-40">
<div className="max-w-6xl mx-auto px-6 py-24 text-center">
<h1 className="text-4xl md:text-6xl font-extrabold text-white">Discover Amazing Products</h1>
<p className="mt-4 text-lg text-gray-200">Shop the latest products with amazing deals. Fast checkout and mobile-friendly.</p>
</div>
</div>
</section>
);
};


export default Hero;