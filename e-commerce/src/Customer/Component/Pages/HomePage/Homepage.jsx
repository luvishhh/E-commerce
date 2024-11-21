import React from 'react'
import MainCarousel from '../../HomeCarousel/MainCarousel'
import SectionCarousel from '../../HomeSectionCarosel/SectionCarousel'
import Footer from '../../../Footer/Footer'

const Homepage = () => {
  return (
    <div>
      <MainCarousel/>


      <div className='py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10'>
        <SectionCarousel sectionName={"Products"}/>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default Homepage
