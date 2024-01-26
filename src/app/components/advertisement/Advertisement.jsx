import Image from 'next/image';

const Advertisement = ({ landType, price, pricePer, headline, description, image }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <Image src={image} alt={headline} className="w-full h-40 object-cover rounded-t-lg mb-4" width={500} height={500} />
      <div className="text-lg font-medium mb-2">{landType}</div>
      <div className="text-2xl font-bold mb-2">{price}</div>
      <div className="text-gray-500 mb-4">{pricePer}</div>
      <h2 className="text-2xl font-bold mb-2">{headline}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
    </div>
  );
};

export default Advertisement;
