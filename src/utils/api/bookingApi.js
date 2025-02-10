import axios from "../service/axiosCustomize.js";

export const bookRoom = async (roomId, userId, booking) => {
  return await axios.get(`/bookings/book-room/${roomId}/${userId}`, booking);
};

export const getAllBookings = async () => {
  return await axios.get("/bookings/all");
};

export const getBookingByConfirmationCode = async (bookingCode) => {
  return await axios.get(`/bookings/get-by-confirmation-code/${bookingCode}`);
};

export const cancelBooking = async (bookingId) => {
  return await axios.delete(`/bookings/cancel/${bookingId}`);
};
