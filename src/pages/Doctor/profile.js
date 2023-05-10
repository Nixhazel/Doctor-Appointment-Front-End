// import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import DoctorForm from "../../components/doctorForm";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import moment from 'moment'

const Profile = () => {
	const { user } = useSelector((state) => state.user);
	const params = useParams()
	const [doctor, setDoctor] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"/doctors/update-doctor-profile",
				{
					...values,
					userId: user._id,
					timings: [
						moment(values.timings[0]).format("HH:mm"),
						moment(values.timings[1]).format("HH:mm"),
					],
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

				navigate("/");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			toast.error("somthing went wrong", error.message);
		}
	};

	const getDoctorData = useCallback(async () => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"/doctors/get-doctor-info-by-user-id",
				{
					userId: params.userId,
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
	}, [params.userId, dispatch]);

	useEffect(() => {
		getDoctorData();
	}, [user, getDoctorData]);

	return (
		<Layout>
			<h1 className='page-title'>Doctor Profile</h1>
			<hr />
			{doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
		</Layout>
	);
};

export default Profile;
