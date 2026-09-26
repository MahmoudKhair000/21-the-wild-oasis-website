'use client';

import Image from 'next/image';
// import { useState } from 'react';
import { updateGuest } from '@/app/_lib/actions';
import { cloneElement } from 'react';
import { useFormStatus } from 'react-dom';
import SpinnerMini from './SpinnerMini';

function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={fullName}
          defaultValue={fullName}
          name="fullName"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          value={email}
          defaultValue={email}
          name="email"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="h-6 w-9 rounded-sm relative">
            {countryFlag && (
              <Image
                src={countryFlag}
                className="object-cover h-full w-full"
                fill
                alt="Country flag"
              />
            )}
          </div>
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {

  const status = useFormStatus();
  console.log(status);

  return (
    <button
      disabled={status.pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {status.pending ? 'Updating....' : 'Update profile'}
    </button>
  );
}

export default UpdateProfileForm;
