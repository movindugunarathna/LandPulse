import Image from 'next/image';

export default function CreateAd() {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-800 ml-10">Create Advertisement</h2>
      <div className="grid grid-cols-2 gap-4 bg-gray-200 p-8 rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Column 1</h1>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget dui at mauris porttitor ornare.</p>
        </div>
        <div className="text-center">
          <form action="/submit_form" method="post">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2 text-left ">
                Title:
              </label>
              <input type="text" id="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2 text-left">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2 text-left">
                Price:
              </label>
              <input type="text" id="price" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-bold mb-2 text-left">
                Location:
              </label>
              <input type="text" id="location" name="location" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="grid grid-cols-3 mb-4">
              <div className="mr-3">
                <label htmlFor="predicted_price" className="block text-gray-700 font-bold mb-2 text-left">
                  Predicted Price:
                </label>
                <input
                  type="text"
                  id="predicted_price"
                  name="predicted_price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
              <button id="accept" name="accept" className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3">
                Accept
              </button>
              <button id="publish" name="publish" className="bg-custom-green-100 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
