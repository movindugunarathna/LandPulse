import React, { useState, useEffect } from "react";
import Image from "next/image";

const ImageComponent = ({ imageArray }) => {
    console.log(imageArray);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Initial selected image index

    // Function to handle image selection
    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="card-wrapper w-full h-full">
            <div className="card w-full h-full grid gap-6 md:flex md:justify-center md:items-center">
                <div className="w-full h-full product-imgs flex flex-col justify-center m-2">
                    <div className="w-full h-full img-display overflow-hidden">
                        <div className="w-full h-full img-showcase flex justify-center items-center transition-all duration-500 ease-in-out">
                            <Image
                                src={imageArray[selectedImageIndex].url}
                                alt="land image"
                                className="w-auto h-auto sm:h-96"
                                width={200}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className="img-select flex p-3 justify-center">
                        {imageArray.map((imageObj, index) => (
                            <div className="img-item m-1" key={index}>
                                <a
                                    href="#"
                                    onClick={() => handleImageSelect(index)}
                                >
                                    <Image
                                        src={imageObj.url}
                                        alt="land image"
                                        className="w-24 h-16 sm:h-24"
                                        width={200}
                                        height={200}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ImageComponent;
