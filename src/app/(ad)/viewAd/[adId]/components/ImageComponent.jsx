import React, { useState, useEffect } from "react";
import Image from "next/image";

// Array of image URLs
const landImages = [
    "/download.jpeg",
    "/download1.jpeg",
    "/download2.jpeg",
    "/download3.jpeg",
];

const ImageComponent = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Initial selected image index

    // Function to handle image selection
    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="card-wrapper max-w-full max-h-full">
            <div className="card grid gap-6 md:flex md:justify-center md:items-center">
                <div className="product-imgs flex flex-col justify-center m-2">
                    <div className="img-display overflow-hidden">
                        <div className="img-showcase flex transition-all duration-500 ease-in-out">
                            <Image
                                src={landImages[selectedImageIndex]}
                                alt="land image"
                                className="w-full h-60 sm:h-96"
                                width={200}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className="img-select flex p-3 justify-center">
                        {landImages.map((imageUrl, index) => (
                            <div className="img-item m-1" key={index}>
                                <a
                                    href="#"
                                    onClick={() => handleImageSelect(index)}
                                >
                                    <Image
                                        src={imageUrl}
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
