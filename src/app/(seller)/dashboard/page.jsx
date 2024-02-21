import React from "react";
import  Image from "next/image"
import Link from 'next/link';

export default function Dashboard() {
  return (
      <>
       {/* profile pane */}
        <div className="profile-pane w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="head flex flex-col items-center pb-10">
            <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white items-center">Seller Profile</h2>
            <div className="profile-image flex flex-col items-center pb-10">
              <div className="img">
                <Image width={100} height={100}  src="/avatar.png" alt="profile image" />
              </div>
            </div>
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400"><Link href="">Edit Profile</Link> </span>
          </div>

          <div className="account head flex flex-col items-left pb-10">
            <h6>Account</h6>
            <div className="flex items-center justify-between mb-4">
              <strong>Joined</strong>
              <span>Jnne 22, 2024</span>
              <strong>Asset Total</strong>
              <span>Rs. 0,000,000.00</span>
            </div>
          </div>

          <div className="account head flex flex-col items-left pb-10">
            <h6>Contact</h6>
            <div>
              <strong>Email</strong>
              <span>Jnne 22, 2024</span>
              <strong>Phone</strong>
              <span>Rs. 0,000,000.00</span>
            </div>
          </div>

          <div className="account head flex flex-col items-left pb-10">
            <h6>Identity</h6>
            <div>
              <strong>Address</strong>
              <span>Jnne 22, 2024</span>
              <strong>National ID</strong>
              <span>Rs. 0,000,000.00</span>
            </div>
          </div>

        </div>
      </>
    );
}
