import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="text-black py-8 mt-10">
      <div className="md:w-1/4 text-center md:text-left">
        <h2 className="text-xl font-bold mb-4">Need more information?</h2>
        <p>Write your concern to us and our specialist will get back to you.</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <Image src="/logo.png" alt="logo" width={300} height={300} />
            <p className="mb-4">Where Visions Find Ground: Pulse Your Property Dreams with Us!</p>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Jump to</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Home</li>
              <li className="mb-2">Post your ad</li>
              <li className="mb-2">Market Insights</li>
              <li className="mb-2">Browse Ads</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Help</li>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Terms & Conditions</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Services</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Browse Lands</li>
              <li className="mb-2">Price Predition</li>
              <li className="mb-2">Post Ads</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
