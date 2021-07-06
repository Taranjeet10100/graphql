import React, { Component, useState } from "react";
import { Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {
  const history = useHistory();
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 mb-12" style={{ backgroundImage: `url(../assets/images/i1.jpg)`, backgroundOrigin: 'border-box', backgroundRepeat: 'no-repeat'}}>
          <div className="container mx-auto h-full sm:p-12">
            <nav className="flex px-4 justify-between items-center">
              <div className="text-4xl font-bold">
                <a href='/' style={{ color: '#000000', textDecoration: 'none' }}>Managex<span className="text-green-700">.</span></a>
              </div>
              <div>
                <img src="../assets/images/i2.png" alt="Mangex" className="w-8" />
              </div>
            </nav>
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-6xl font-bold" style={{ fontSize: '36px' }}>Find your <span className="text-green-700">greeny</span> stuff for your room</h1>
                <div className="w-20 h-2 bg-green-700 my-4"></div>
                <button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 shadow" onClick={() => { history.push('/login') }} style={{ background: '#4cabaf' }}>Create Account</button>
              </div>
            </header>
          </div>
        </div>
        <div className="w-full sm:w-6/12 mb-12">
                    <div className="row">
                        <div className="col-12">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="../assets/images/hi1.jpg"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="../assets/images/hi2.jpg"
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="../assets/images/hi3.jpg"
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>
      </div>
    </>
  )
}
export default Home;