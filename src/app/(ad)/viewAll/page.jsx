import Advertisement from '@/app/components/elements/advertisement/Advertisement';
import React from 'react';

const ViewAll = () => {
  return (
    <>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sort</button> */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-52">
        <Advertisement
          image={''}
          landType="Bare"
          price="$500,000"
          pricePer="$10,000 per acre"
          headline="Beautiful Farmland for Sale"
          description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
        />

        <Advertisement
          image={''}
          landType="Agricultural"
          price="$500,000"
          pricePer="$10,000 per acre"
          headline="Beautiful Farmland for Sale"
          description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
        />
        <Advertisement
          image={''}
          landType="Agricultural"
          price="$500,000"
          pricePer="$10,000 per acre"
          headline="Beautiful Farmland for Sale"
          description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
        />
        <Advertisement
          image={''}
          landType="Agricultural"
          price="$500,000"
          pricePer="$10,000 per acre"
          headline="Beautiful Farmland for Sale"
          description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
        />
        <Advertisement
          image={''}
          landType="Agricultural"
          price="$500,000"
          pricePer="$10,000 per acre"
          headline="Beautiful Farmland for Sale"
          description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
        />

        <Advertisement
          image={''}
          landType="Bare"
          price="$500,000"
          pricePer="$10,000 per acre"
          headline="Beautiful Farmland for Sale"
          description="This 50-acre farmland is perfect for farming or ranching. Located in a prime location with easy access to major roads and amenities."
        />
      </div>
    </>
  );
};

export default ViewAll;
