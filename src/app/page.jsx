import Image from "next/image";

export default function Home() {
  return <>     
    <div className="relative h-700px w-auto md:h-screen">
      <Image className="absolute object-cover w-full" src="/hero-image.jpg" alt="" layout="fill" />
      <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
        <h1 className="text-6xl font-bold md:text-5xl">Land Awaits Your Imagination</h1>
        <div className="text-wrap text-xs leading-relaxed">
          <p className="mt-4 text-2xl md:text-lg">Welcome to a realm where your imagination knows no bounds.Our collection of pristine land parcels invites you to paint your dreams upon nature's canvas. Whether you envision a tranquil retreat nestled among trees or aspire to build your legacy in an urban landscape, our diverse listings cater to your unique aspirations. Explore rolling hills, vast plains, or scenic waterfronts each plot holds the promise of your vision. Begin your journey here, where land becomes a space for your creativity to flourish and your dreams to take shape.</p>
        </div>
        <div className="">
          <button className="mt-8 px-8 py-4 bg-gray-700 text-white font-bold text-xl rounded-md mr-5">Explore Land</button> 
          <button className="mt-8 px-8 py-4 bg-gray-400 text-white font-bold text-xl rounded-md">Claim your Spot </button> 
        </div>
      </div>
    </div>
  </>;
}
