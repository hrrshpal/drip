import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>At DRIP, we believe style isn’t just what you wear — it’s how you show up.</p>
        <p>Built for those who move with confidence, DRIP is more than just clothing. It’s a statement. A mindset. A way of expressing individuality without saying a word. We focus on creating pieces that are clean, versatile, and effortlessly stylish — designed to fit into your everyday life while still standing out.</p>
        <p>Our approach is simple: quality over noise. Every piece is crafted with attention to comfort, durability, and modern aesthetics, so you never have to choose between looking good and feeling good.</p>
        <p>Whether you're keeping it casual or stepping out, DRIP is made to move with you — wherever you go, whatever your vibe.</p>
        <p>This isn’t just fashion.</p>
        <p>This is <b>DRIP</b>.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Effortless Style</b>
          <p className='text-gray-600'>Our designs are made to keep things simple yet impactful — pieces that elevate your look without trying too hard.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Everyday Comfort</b>
          <p className='text-gray-600'>Crafted with quality materials and a focus on fit, our clothing is made to feel as good as it looks, all day long.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Built to Last</b>
          <p className='text-gray-600'>We prioritize durability and quality, so every piece stays fresh and reliable, wear after wear.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
