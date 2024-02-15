'use client';
import FileInput from '@/app/components/FileInput/fileInput';
import Image from 'next/image';

export default function CreateAd() {
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    // Handle file selection here
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 ml-10">Create Advertisement</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 rounded-lg">
        <div className="text-center">
          <p className="text-gray-700">Drop your images here or</p>
          <FileInput onChange={handleFileSelection} />
        </div>
        <form action="/submit_form" method="post">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2 text-left ">
              Title:
            </label>
            <input type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2 text-left">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              cols="50"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-4">
            <div className="mb-4 md:mr-5">
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2 text-left">
                Price:
              </label>
              <input type="text" id="price" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5" />
            </div>
            <div className="mb-4">
              <label htmlFor="landType" className="block text-gray-700 font-bold mb-2 text-left">
                Land Type:
              </label>
              <select id="landType" name="landType" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
              </select>
            </div>
          </div>
          <button id="publish" name="publish" className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
