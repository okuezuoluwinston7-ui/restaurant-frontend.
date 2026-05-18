import React from 'react';
import SimpleReservationForm from '../components/simpleReservationForm'; // Use the existing form

const ReservationPage = () => {
  return (
    <div id="reservation"> {/* Add id if header link scrolls */}
      <div className="container">
        <SimpleReservationForm />
      </div>
    </div>
  );
};

export default ReservationPage;