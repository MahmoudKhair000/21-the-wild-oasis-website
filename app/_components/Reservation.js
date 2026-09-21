import {
  getBookedDatesByCabinId,
  getCabin,
  getSettings,
} from '@/app/_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    // getCabin(cabin.id),
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  // console.log(settings, bookedDates);

  return (
    <div className="grid grid-cols-2 border border-primary-800 ">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm
        cabin={cabin}
        settings={settings}
      />
    </div>
  );
}

export default Reservation;
