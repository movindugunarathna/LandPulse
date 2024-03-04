import React, { useState } from 'react';
import { landTypes } from '@/data/landTypes';
import GoogleMapComp from '../../GoogleMap/GoogleMapSearch';

export default function PredictPrice() {
  const [selectedLandTypes, setSelectedLandTypes] = useState([]);

  return (
    <div className="">
      <label
        htmlFor="price"
        className="block text-gray-700 font-bold mb-2 text-left"
      >
        Land Type:
      </label>
      <div className=" w-full flex justify-start items-center gap-4">
        {landTypes.map((item) => (
          <input
            key={item.value}
            type="button"
            className={`inline-flex items-center justify-center px-4 py-1 font-sans font-semibold tracking-wide 
                                                        border ${selectedLandTypes.includes(item.type) ? 'bg-gray-400' : 'border-black'} rounded-lg`}
            value={item.type}
            onClick={() => {
              if (selectedLandTypes.includes(item.type)) {
                setSelectedLandTypes(
                  selectedLandTypes.filter((type) => type !== item.type)
                );
              } else setSelectedLandTypes([...selectedLandTypes, item.type]);
            }}
          />
        ))}
      </div>
      <label
        htmlFor="location"
        className="block text-gray-700 font-bold mt-5 text-left"
      >
        Pick the Location:
      </label>
      <div className="grid grid-cols-2 gap-10">
        <div className="">
          <GoogleMapComp className="w-full h-96 mt-2" />
        </div>
        <div>
          <div className="">
            <label
              htmlFor="predicted-price"
              className="block text-gray-700 font-bold mt-5 text-left"
            >
              Predicted Price
            </label>
            <div className="text-2xl font-bold text-black">Rs {}/=</div>
            <div className="mt-5">
              <label
                htmlFor="price-range"
                className="block text-gray-700 font-bold mt-5 text-left"
              >
                Price Range
              </label>
              <div className="text-xl font-bold text-black">
                Rs {} - Rs {}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
