import React from "react";
import  Image from "next/image"
import Link from 'next/link';

export default function Dashboard() {
  return (
      <>
       {/* profile pane */}
        <div className="profile-pane w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-10 ml-4">
          <div className="head flex flex-col items-center pb-10">
            <h2 className="mb-1 text-xl text-gray-900 dark:text-white items-center mb-5 font-semibold">Seller Profile</h2>
            <div className="profile-image flex flex-col items-center pb-10">
              <div className="img">
                <Image width={100} height={100}  src="/avatar.png" alt="profile image" />
              </div>
            </div>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400 hover:font-semibold"><Link href="">Edit Profile</Link> </span>
          </div>

          <div className="account head flex flex-col items-left pb-10">
            <h6  className="text-lg font-bold mb-2">Account</h6>
            <div className=" mb-2 text-sm">
              <div className="flex flex-raw justify-between mb-1">
                <span className="font-semibold text-gray-700">Joined</span>
                <span>Jnne 22, 2024</span>
              </div>
              <div className="flex flex-raw justify-between mb-1">
                <span className="font-semibold text-gray-700">Asset Total</span>
                <span>Rs. 0,000,000.00</span>
              </div>
            </div>
          </div>

          <div className="account head flex flex-col items-left pb-10">
            <h6 className="text-lg font-bold mb-2">Contact</h6>
            <div className=" mb-2 text-sm">
              <div className="flex flex-raw justify-between mb-1">
                <span className="font-semibold text-gray-700">Email</span>
                <span>Jnne 22, 2024</span>
              </div>
              <div className="flex flex-raw justify-between mb-1">
                <span className="font-semibold text-gray-700">Phone</span>
                <span>Rs. 0,000,000.00</span>
              </div>
            </div>
          </div>

          <div className="account head flex flex-col items-left pb-10">
            <h6 className="text-lg font-bold mb-2">Identity</h6>
            <div className=" mb-2 text-sm">
              <div className="flex flex-raw justify-between mb-1">
                <span className="font-semibold text-gray-700 mr-4 ">Address</span>
                <span className="text-right">24\A Rogger St, Wellampitia,Jaela. Colombo</span>
              </div>
              <div className="flex flex-raw justify-between mb-1">
                <span className="font-semibold text-gray-700">National ID</span>
                <span>Rs. 0,000,000.00</span>
              </div>
            </div>
          </div>

        </div>
      </>
    );
}