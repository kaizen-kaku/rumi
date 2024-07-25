'use client';

import { Lora } from "next/font/google";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

const lora = Lora({ subsets: ["latin"] });

export default function AccessDenied() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className={`${lora.className} text-3xl font-bold text-white mb-2`}>
            Access Restricted
          </h2>
          <p className="text-accent text-lg mb-8">
            We apologize for the inconvenience.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <p className="text-gray-300 text-base mb-6">
            This area is reserved for administrators. It appears you don&lsquo;t have the necessary permissions to access this page.
          </p>
          <p className="text-gray-300 text-base mb-6">
            If you believe this is an error, please contact your system administrator for assistance.
          </p>
        </div>
        <div>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent2 transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}