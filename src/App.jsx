import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/HomePage";
import AllRoomsPage from "./pages/booking_rooms/AllRoomsPage";
import RoomDetailsBookingPage from "./pages/booking_rooms/RoomDetailsPage";
import FindBookingPage from "./pages/booking_rooms/FindBookingPage";
import AdminPage from "./pages/admin/AdminPage";
import ManageRoomPage from "./pages/admin/ManageRoomPage";
import EditRoomPage from "./pages/admin/EditRoomPage";
import AddRoomPage from "./pages/admin/AddRoomPage";
import ManageBookingsPage from "./pages/admin/ManageBookingsPage";
import EditBookingPage from "./pages/admin/EditBookingPage";
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import { AdminRoute, RestrictedRoute, GuestRoute } from "./component/guard";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="content">
          <Routes>
            {/* Guest Routes */}
            <Route exact path="/login" element={<GuestRoute element={<LoginPage />} />} />
            <Route path="/register" element={<GuestRoute element={<RegisterPage />} />} />

            {/* Public Routes */}
            <Route exact path="/home" element={<HomePage />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />

            {/* Restricted Routes */}
            <Route
              path="/room-details-book/:roomId"
              element={<RestrictedRoute element={<RoomDetailsBookingPage />} />}
            />
            <Route
              path="/profile"
              element={<RestrictedRoute element={<ProfilePage />} />}
            />
            <Route
              path="/edit-profile"
              element={<RestrictedRoute element={<EditProfilePage />} />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route
              path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRoomPage />} />}
            />
            <Route
              path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoomPage />} />}
            />
            <Route
              path="/admin/add-room"
              element={<AdminRoute element={<AddRoomPage />} />}
            />
            <Route
              path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookingsPage />} />}
            />
            <Route
              path="/admin/edit-booking/:bookingCode"
              element={<AdminRoute element={<EditBookingPage />} />}
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
