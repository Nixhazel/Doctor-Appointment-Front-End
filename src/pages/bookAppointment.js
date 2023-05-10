import { Button, Col, Row, TimePicker, DatePicker } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment from "moment";

const BookAppointment = () => {
	const [isAvailable, setIsAvailable] = useState(false);
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const { user } = useSelector((state) => state.user);
	const [doctor, setDoctor] = useState(null);
	const params = useParams();
	const navigate = useNavigate()

	const dispatch = useDispatch();

	const getDoctorData = useCallback(async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"/doctors/get-doctor-info-by-id",
				{
					doctorId: params.doctorId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			dispatch(hideLoading());
			if (response.data.success) {
				setDoctor(response.data.data);
			}
		} catch (error) {
			console.log(error);
			dispatch(hideLoading());
		}
	}, [params.doctorId, dispatch]);

    const bookNow = async () => {
        setIsAvailable(false);
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"/users/book-appointment",
				{
					doctorId: params.doctorId,
					userId: user._id,
					doctorInfo: doctor,
					userInfo: user,
					date: date,
					time: time,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				navigate("/appointments");
			}
		} catch (error) {
			toast.error("Error Booking Appointment");
			dispatch(hideLoading());
		}
	};

	const checkAvailability = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"/users/check-booking-availability",
				{
					doctorId: params.doctorId,
					date: date,
					time: time,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				setIsAvailable(true);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			toast.error("Error Booking Appointment");
			dispatch(hideLoading());
		}
	};

	useEffect(() => {
		getDoctorData();
	}, [getDoctorData]);
	return (
		<Layout>
			{doctor && (
				<div>
					<h1 className='page-title'>
						{" "}
						{doctor.firstName} {doctor.lastName}
					</h1>
					<hr />
					<Row gutter={20} className='mt-5' align='middle'>
						<Col span={8} sm={24} xs={24} lg={8}>
							<img
								src='https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg'
								alt=''
								width='100%'
								height='400'
							/>
						</Col>
						<Col span={8} sm={24} xs={24} lg={8}>
							<h1 className='normal-text'>
								<b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
							</h1>
							<p>
								<b>Phone Number : </b>
								{doctor.phoneNumber}
							</p>
							<p>
								<b>Address : </b>
								{doctor.address}
							</p>
							<p>
								<b>Fee per Visit : </b>
								{doctor.feePerCunsultation}
							</p>
							<p>
								<b>Website : </b>
								{doctor.website}
							</p>

							<div className='d-flex flex-column pt-2 mt-2'>
								<DatePicker
									format='DD-MM-YYYY'
									onChange={(value) => {
										setDate(moment(value).format("DD-MM-YYYY"));
										setIsAvailable(false);
									}}
								/>
								<TimePicker
									format='HH:mm'
									className='mt-3'
									onChange={(value) => {
										setIsAvailable(false);
										setTime(moment(value).format("HH:mm"));
									}}
								/>
								{!isAvailable && (
									<Button
										className='primary-button mt-3 full-width-button'
										onClick={checkAvailability}>
										Check Availability
									</Button>
								)}

								{isAvailable && (
									<Button
										className='primary-button mt-3 full-width-button'
										onClick={bookNow}>
										Book Now
									</Button>
								)}
							</div>
						</Col>
					</Row>
				</div>
			)}
		</Layout>
	);
};

export default BookAppointment;
