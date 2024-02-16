import React from "react";
import  Image from "next/image"

export default function Dashboard() {
  return (
      <>
       {/* profile pane */}
        <div className="profile-pane w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-1 text-xl font-medium text-gray-900 dark:text-white items-center">Seller Profile</h2>
          <div className="profile-image flex flex-col items-center pb-10">
            <div className="img">
              <Image width={100} height={100}  src="/avatar.png" alt="profile image" />
            </div>
          </div>
        </div>
      </>
    );
}
