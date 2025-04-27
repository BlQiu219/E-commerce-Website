import React from "react";
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
    return (
        <div>

            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={'ABOUT'} text2={'US'} />
            </div>  

            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img className="w-full md:max-w-[480px]" src={assets.aboutus} alt="" />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>At Forever Beauty, we believe that beauty knows no borders. Our platform was created to bring the finest international cosmetic brands directly to you, combining luxury, innovation, and care in every product.</p>
                    <p>We proudly curate an exclusive collection of makeup, skincare, fragrance, and personal care products from globally renowned brands. Our commitment is to deliver authenticity, quality, and excellence—so you can shop with complete confidence.</p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>Our mission at Forever Beauty is to inspire confidence and celebrate individuality. We are dedicated to providing premium beauty solutions tailored to every skin type, every style, and every dream.</p>
                </div>
            </div>

            <div className="text-4xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Authentic International Brands</b>
                    <p className="text-gray-600">We partner only with official suppliers and authorized distributors to guarantee 100% genuine products.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Luxury Shopping Experience</b>
                    <p className="text-gray-600">From seamless browsing to premium packaging, we strive to bring the feel of a high-end boutique to your doorstep.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Beauty Experts at Your Service</b>
                    <p className="text-gray-600">Our professional support team is always ready to assist you with personalized advice and prompt service.</p>
                </div>
            </div>

            <NewsletterBox />
        </div>
    )
};

export default About;
