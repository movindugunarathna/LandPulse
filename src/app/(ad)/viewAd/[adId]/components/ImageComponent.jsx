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
            <div className="object-cover">
                <Image
                    width={200}
                    height={200}
                    src={imageSources[0]}
                    alt="main img"
                />
            </div>

            <div className="flex flex-row flex-nowrap w-1/4">
                {imageSources.slice(1).map((src, index) => (
                    <Image
                        key={index + 1}
                        width={200}
                        height={200}
                        src={src}
                        alt="other imgs"
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageComponent;
