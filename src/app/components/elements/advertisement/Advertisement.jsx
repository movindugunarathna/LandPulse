import Image from 'next/image';

const Advertisement = ({ advertisement }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div key={advertisement._id} className="mb-4">
        <Image src={advertisement.image} alt={advertisement.image} width={500} height={300} className="rounded-md" />
        <div className="text-lg font-medium mb-2">{advertisement.landType}</div>
        <div className="text-gray-500 mb-4">
          <span className="text-gray-800 text-sm">Price per perch </span>LKR {advertisement.price}
        </div>
        <h2 className="text-2xl font-bold mb-2">{advertisement.title}</h2>
        <p className="text-gray-700 mb-4">{advertisement.description}</p>
      </div>
    </div>
  );
};

export default Advertisement;
