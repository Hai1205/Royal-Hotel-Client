import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cancelBooking, getBookingByConfirmationCode } from '../../utils/api/bookingApi'

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await getBookingByConfirmationCode(bookingCode);

                setBookingDetails(response.data.booking);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    const acheiveBooking = async (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to Acheive this booking?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await cancelBooking(bookingId);

                    if (response.status === 200) {
                        toast.success('The boking was Successfully Acheived.');
                        navigate('/admin/manage-bookings');
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
        });
    };

    return (
        <div className="find-booking-page">
            <h2>Booking Detail</h2>

            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details</h3>

                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>

                    <p>Check-in Date: {bookingDetails.checkInDate}</p>

                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>

                    <p>Num Of Adults: {bookingDetails.numOfAdults}</p>

                    <p>Num Of Children: {bookingDetails.numOfChildren}</p>

                    <p>Guest Email: {bookingDetails.guestEmail}</p>

                    <br />
                    <hr />
                    <br />

                    <h3>Booker Detials</h3>

                    <div>
                        <p> Name: {bookingDetails.user.name}</p>

                        <p> Email: {bookingDetails.user.email}</p>

                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <h3>Room Details</h3>

                    <div>
                        <p> Room Type: {bookingDetails.room.roomType}</p>

                        <p> Room Price: ${bookingDetails.room.roomPrice}</p>

                        <p> Room Description: {bookingDetails.room.roomDescription}</p>

                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>

                    <button
                        className="acheive-booking"
                        onClick={() => acheiveBooking(bookingDetails.id)}>Acheive Booking
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;
