import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from './pages/applyDoctor';
import Notifications from "./pages/notifications";
import UsersList from './pages/Admin/usersList';
import DoctorsList from './pages/Admin/doctorsList';
import Profile from "./pages/Doctor/profile";
import BookAppointment from "./pages/bookAppointment";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";

const App = () => {
	const { loading } = useSelector((state) => state.alerts);
	return (
		<BrowserRouter>
			{loading && (
				<div className='spinner-parent'>
					<div className='spinner-border' role='status'></div>
				</div>
			)}
			<Toaster position='top-center' reverseOrder={false} />
			<Routes>
				<Route
					path='/login'
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/apply-doctor'
					element={
						<ProtectedRoute>
							<ApplyDoctor />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/notifications'
					element={
						<ProtectedRoute>
							<Notifications />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/userslist'
					element={
						<ProtectedRoute>
							<UsersList />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/doctorslist'
					element={
						<ProtectedRoute>
							<DoctorsList />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/doctor/profile/:userId'
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/book-appointment/:doctorId'
					element={
						<ProtectedRoute>
							<BookAppointment />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/appointments'
					element={
						<ProtectedRoute>
							<Appointments />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/doctor/appointments'
					element={
						<ProtectedRoute>
							<DoctorAppointments />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
