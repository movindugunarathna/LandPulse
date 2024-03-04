import React, { useState } from 'react';
import InputPrice from './components/InputPrice';
import PredictPrice from './components/PredictPrice';

export default function PriceSection({ setPriceDetails, priceDetails }) {
  const [isPricePredict, setIsPricePredict] = useState(true);
  const [selectedLandTypes, setSelectedLandTypes] = useState([]);

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setPriceDetails({
        ...priceDetails,
        selected: false,
      });
    }
  };

  return (
    <div
      className="absolute top-0 left-0 m-0 p-0 w-screen h-screen bg-white bg-opacity-60 flex justify-center items-center z-0"
      onClick={handleClick}
    >
      <div className="w-2/3 h-2/3 bg-white rounded-md border border-black z-10">
        <form
          onSubmit={() => onSubmit()}
          className="w-full h-full flex flex-col justify-between gap-8 p-4 px-8"
        >
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mt-2">
              <div
                className={`w-1/3 pb-4 font-medium text-center 
                            ${isPricePredict ? 'text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white' : 'text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300'} 
                            hover:cursor-pointer`}
                onClick={() => setIsPricePredict(true)}
              >
                Predict
              </div>

              <div
                className={`w-1/3 pb-4 font-medium text-center 
                            ${!isPricePredict ? 'text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white' : 'text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300'}
                            hover:cursor-pointer`}
                onClick={() => setIsPricePredict(false)}
              >
                Input
              </div>
            </div>
          </div>

          {isPricePredict ? <PredictPrice /> : <InputPrice />}

          <div className="text-center flex justify-between items-center">
            <input
              type="button"
              className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide 
                            border border-black rounded-lg "
              value={'Cancel'}
              onClick={handleClick}
            />
            <input
              type="submit"
              className="inline-flex items-center justify-center px-8 py-2 font-sans font-semibold tracking-wide text-white bg-custom-green-100 hover:bg-lime-900 rounded-lg "
              value={'Submit'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
