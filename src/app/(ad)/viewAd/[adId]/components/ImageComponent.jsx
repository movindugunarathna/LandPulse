import Image from "next/image";

const ImageComponent = () => {
    const imageSources = [
        "/Rectangle2.png",
        "/Rectangle2.png",
        "/Rectangle2.png",
        "/Rectangle2.png",
        "/Rectangle2.png",
    ];

    return (
        <div>
            {/* Render the first image in a separate div */}
            <div>
                <Image
                    width={400}
                    height={400}
                    src={imageSources[0]} // First image source
                    alt="icon arrow circle left"
                    className="w-full"
                />
            </div>

            {/* Render the rest of the images in another div */}
            <div className="flex flex-row w-1/4">
                {imageSources.slice(1).map((src, index) => (
                    <Image
                        key={index + 1} // Ensure unique keys
                        width={400}
                        height={400}
                        src={src}
                        alt="icon arrow circle left"
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageComponent;
