import React, { useState, useEffect } from 'react';

// --- Helper function to convert 12-hour time (e.g., "6:00 PM") to 24-hour time (e.g., "18:00:00")
const convertTo24HourFormat = (time12h) => {
  if (!time12h) return null; // Handle potential empty values

  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
    if (hours === 24) hours = 12; // Special case for 12 PM
  }

  // Pad with leading zeros if necessary and append seconds
  return `${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
};
// --- End Helper Function ---
const SimpleReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: 'regular',
    special_requests: '',
    table_preference: '',
    location: 'Downtown Dubai' // Added location field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);

  // Define available time slots
  const availableTimes = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  // Define occasions
  const occasions = [
    { value: 'regular', label: 'Regular Dining' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'meeting', label: 'Business Meeting' },
    { value: 'celebration', label: 'Celebration' },
    { value: 'romantic', label: 'Romantic Dinner' }
  ];

  // Define table preferences
  const tablePreferences = [
    { value: '', label: 'No preference' },
    { value: 'window', label: 'Window seat' },
    { value: 'quiet', label: 'Quiet area' },
    { value: 'outdoor', label: 'Outdoor seating' }
  ];

 // ... (other imports and component definition up to the locations definition)

  // Define restaurant locations based on Dubai areas
  const locations = [
    'Downtown Dubai',
    'Dubai Marina',
    'Palm Jumeirah',
    'Jumeirah Beach Residence (JBR)',
    'Al Barsha',
    'Al Quoz',
    'Business Bay',
    'Deira',
    'Bur Dubai',
    'Karama',
    'Trade Centre',
    'Jumeirah',
    'Madinat Jumeirah',
    'Dubai Silicon Oasis',
    'Emirates Hills',
    'The Greens',
    'Al Wasl',
    'Oud Metha',
    'Al Rigga',
    'Garhoud'
    // Add more Dubai locations as needed
  ];

// ... (rest of the component code remains the same)
  // Generate recommended dates (next 3 days)
  useEffect(() => {
    const generateRecommendedDates = () => {
      const dates = [];
      for (let i = 1; i <= 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      }
      return dates;
    };
    setTimeSlots(generateRecommendedDates());
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Convert time to 24-hour format
      const time24Hour = convertTo24HourFormat(formData.time);

      // Prepare reservation data - ensure all required fields are present and not undefined
      // Map frontend field names to backend expectations
      const reservationData = {
        // Essential fields from the form
        name: formData.name, // Comes from form
        email: formData.email, // Comes from form
        phone: formData.phone, // Comes from form
        date: formData.date, // Comes from form
        time: time24Hour, // Use the converted 24-hour time
        guests: parseInt(formData.guests), // Ensure it's a number
        occasion: formData.occasion || null, // Optional, send null if empty
        special_requests: formData.special_requests || null, // Optional, send null if empty
        table_preference: formData.table_preference || null, // Optional, send null if empty
        location: formData.location, // Comes from form

        // --- CRITICAL: Provide default or mapped values for backend expectations ---
        customer_id: 1, // Placeholder - you might implement customer login later
        location_id: 1, // Placeholder - you might map 'location' string to an ID later
        table_id: null, // Often assigned by the system, or you could send a preference
      };

      console.log("Sending reservation data:", reservationData); // Debug log

      // API call to backend
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData) // Send the prepared data
      });

      const result = await response.json();

      if (result.success) {
        // Show success message using the original time format from the form
        setSubmitMessage(`Thank you, ${formData.name}! Your table for ${formData.guests} guests on ${formData.date} at ${formData.time} has been reserved at our ${formData.location} location. Confirmation sent to ${formData.email}.`);
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '', // Clear time selection
          guests: 2,
          occasion: 'regular',
          special_requests: '',
          table_preference: '',
          location: 'California' // Reset to default
        });
      } else {
        setSubmitMessage(`Reservation failed: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage('Reservation failed. Please make sure the backend server is running.');
      console.error("Reservation submission error:", error); // Debug log
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="simple-reservation-form">
      <h2>Make a Reservation</h2>
      
      {/* Display message if available */}
      {submitMessage && (
        <div className={`message ${submitMessage.includes('failed') ? 'error' : 'success'}`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Restaurant Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">Number of Guests *</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              {occasions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Reservation Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <div className="recommended-dates">
              <p>Recommended dates:</p>
              <div className="date-buttons">
                {timeSlots.map(date => (
                  <button
                    type="button"
                    key={date}
                    onClick={() => setFormData(prev => ({ ...prev, date }))}
                    className="date-btn"
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Reservation Time *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select Time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="table_preference">Table Preference</label>
            <select
              id="table_preference"
              name="table_preference"
              value={formData.table_preference}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              {tablePreferences.map(pref => (
                <option key={pref.value} value={pref.value}>{pref.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="special_requests">Special Requests</label>
          <textarea
            id="special_requests"
            name="special_requests"
            value={formData.special_requests}
            onChange={handleChange}
            placeholder="Any special requests? Dietary restrictions, celebrations, etc."
            rows="3"
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming Reservation...' : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  );
};

export default SimpleReservationForm;