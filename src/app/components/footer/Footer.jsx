import Image from 'next/image';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="text-black py-8 mt-10">
      <div className="bg-custom-green-100 py-8 px-4 text-center w-100">
        <div className="text-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1 className="text-3xl mb-4 text-white">Need more information?</h1>
              <p className="text-md text-white">Write your concern to us</p>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 mt-3 rounded">Click here</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-5">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/5 text-center md:text-left">
            <Image src="/logo.png" alt="logo" width={300} height={300} />
            <p className="mb-4">Where Visions Find Ground: Pulse Your Property Dreams with Us!</p>
          </div>
          <div className="w-full md:w-1/5 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Jump to</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Home</li>
              <li className="mb-2">Post your ad</li>
              <li className="mb-2">Market Insights</li>
              <li className="mb-2">Browse Ads</li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Help</li>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Browse Lands</li>
              <li className="mb-2">Price Predition</li>
              <li className="mb-2">Post Ads</li>
            </ul>
          </div>
          <div className="w-full md:w-1/5 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
            <div className="flex justify-center">
              <FontAwesomeIcon icon={faFacebook} size="sm" />
              <FontAwesomeIcon icon={faLinkedin} size="sm" />
              <FontAwesomeIcon icon={faTwitter} size="sm" />
              <FontAwesomeIcon icon={faYoutube} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
