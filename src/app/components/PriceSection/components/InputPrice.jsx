import React from "react";

export default function InputPrice() {
    return (
        <div className="w-full h-full">
            <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2 text-left"
            >
                Selling Price:
            </label>
            <input
                type="text"
                id="price"
                name="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
            />
        </div>
    );
}
