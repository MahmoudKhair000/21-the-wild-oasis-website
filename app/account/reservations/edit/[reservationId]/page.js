import UpdateReservationForm from '@/app/_components/UpdateReservationForm';
import { getBooking, getCabin } from '@/app/_lib/data-service';

async function Page({ params }) {
  const { reservationId } = params;
  const booking = await getBooking(reservationId);
  const cabin = await getCabin(booking.cabinId);
  // console.log(params);
  // console.log(booking);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>
      {/* I had to extract the form in a client component
      , to use useFormStatus() hook */}
      <UpdateReservationForm
        booking={booking}
        cabin={cabin}
        reservationId={reservationId}
      />
    </div>
  );
}

export default Page;
