'use client';

import { updateReservation } from '@/app/_lib/actions';
import { useFormStatus } from 'react-dom';
import SpinnerMini from './SpinnerMini';

function UpdateReservationForm({ booking, cabin, reservationId }) {
  const { maxCapacity } = cabin;
  const { observations, numGuests } = booking;

  return (
    <form
      action={updateReservation}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={numGuests}
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
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={observations ?? ''}
          placeholder="Write down your observations.."
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
      {/* The hidden input to pass the reservationId value */}
      <input
        type="hidden"
        name="reservationId"
        value={reservationId}
      />
    </form>
  );
}

function Button() {
  // The whole component has to be wrapped
  // , and rendered in a form element
  const status = useFormStatus();
  const isPending = status?.pending;

  return (
    <button
      disabled={isPending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 capitalize"
    >
      {!isPending ? (
        <>Update reservation</>
      ) : (
        <span>
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default UpdateReservationForm;
