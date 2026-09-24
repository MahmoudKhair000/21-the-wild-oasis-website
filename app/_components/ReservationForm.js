'use client';

import { format } from 'date-fns';
import { useReservation } from '@/app/_contexts/ReservationContext';
import Image from 'next/image';

function ReservationForm({ cabin, user }) {
  // CHANGE
  const { range } = useReservation();
  const { from: fromDate, to: toDate } = range;
  console.log(range);
  const { maxCapacity } = cabin;

  return (
    <div className="scale-[1.01] flex flex-col justify-between">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <div className='relative w-8 h-8'>
            <Image
              // Important to display google profile images
              referrerPolicy='no-referrer'
              className='h-8 rounded-full'
              fill
              src={user.image}
              alt={user.name}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      {/* {range.from && range.to && (
        <p className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center py-4 px-6 border border-primary-800">
          <span>{format(new Date(range.from), 'EEE MMM dd yyyy')}</span>
          <span> &mdash; </span>
          <span>{format(new Date(range.to), 'EEE MMM dd yyyy')}</span>
        </p>
      )} */}

      <form className="bg-primary-900 py-5 px-8 lg:py-10 lg:px-16 text-lg flex gap-5 flex-col flex-grow justify-end">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option
              value=""
              key=""
            >
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option
                value={x}
                key={x}
              >
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-end items-center gap-6 mb-8">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
