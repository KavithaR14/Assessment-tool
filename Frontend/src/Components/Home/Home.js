import React from 'react'
import Hero from '../Hero/Hero';
import Services from '../Services/Services';
import About from '../About/About';
import Testimonial from '../Testimonial/Testimonial';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';


function Home() {
    return (
        <>
        {/* <TestPage/> */}
        {/* <Navbars/> */}
            <Navbar/>
            <Hero/>
            <Services/>
            <About/>
            <Testimonial/>
            <Footer/>
        </>
    )
}

export default Home;