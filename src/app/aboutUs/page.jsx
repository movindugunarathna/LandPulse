import React from 'react';

const Page = () => {
  return (
    <div>
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1>LandPulse - Buy and Sell</h1>
      </header>
      <div className="main flex flex-col md:flex-row md:flex-wrap justify-between items-center p-4">
        <div id="about" className="w-full md:w-1/3 p-4 mx-auto">
          <h2 className="text-xl font-bold">About LandPulse</h2>
          <p>LandPulse is a platform on which you can buy and sell different types of lands and properties! Select your desired location and start browsing</p>
        </div>
        <div id="buynsell" className="w-full md:w-2/3 flex justify-between">
          <div id="sell" className="w-full p-4">
            <h2 className="text-xl font-bold">Have lands or properties to sell?</h2>
            <p>Sign up for a free account to start selling your items!</p>
            <p>It only takes less than 2 minutes to post an ad. We have an in-built price forecasting system for you to deduce and decide the true value of your property</p>
            <p>What are you waiting for? Create an account, post your ad, and start selling!</p>
          </div>
          <div id="buy" className="w-full p-4">
            <h2 className="text-xl font-bold">Looking to buy a land or property?</h2>
            <p>LandPulse has the widest selection of items all over Sri Lanka</p>
            <p>Whether you're looking for residential, agricultural, commercial, or industrial, you will find the best deal on Landpulse.</p>
            <p>Our search and filters make it super easy to find exactly what you're looking for!</p>
          </div>
        </div>
        <div id="terms" className="w-full p-4 mx-auto"> {/* Added mx-auto class */}
          <h2 className="text-xl font-bold">Our Terms and conditions</h2>
          <p>By accessing or using LandPulse, you agree to abide by the following terms and conditions. You may use LandPulse for personal, non-commercial purposes only and must comply with all applicable laws and regulations. Users are responsible for the accuracy and legality of their uploaded content and must not violate intellectual property rights or upload objectionable material. LandPulse collects and uses personal information in accordance with its Privacy Policy. LandPulse and its suppliers are not liable for any damages arising from the use of the platform. These terms are governed by the laws of Sri Lanka, and users agree to the exclusive jurisdiction of the courts in that jurisdiction. LandPulse may revise these terms at any time, and continued use constitutes acceptance of the current terms and conditions.</p>
        </div>
        <div id="contact-info" className="w-full p-4 bg-gray-200 shadow-md mx-auto"> {/* Added mx-auto class */}
          <h2 className="text-xl font-bold">Questions? Get in touch!</h2>
          <p>9am - 6pm on weekdays</p>
          <p>8am - 5pm on weekends and mercantile holidays</p>
          <h3 className="font-bold mt-4">Call us</h3>
          <p>011 2 350 350</p>
          <h3 className="font-bold mt-4">Email us</h3>
          <p><a href="mailto:support@Landpulse.lk" className="text-blue-500">support@LandPulse.lk</a></p>
        </div>
      </div>
      <footer className="p-4"></footer>
    </div>
  );
};

export default Page;
