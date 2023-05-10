import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
// import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const dispatch = useDispatch();
  const getAppointmentsData = useCallback(async () => {
		try {
			dispatch(showLoading());
			const resposne = await axios.get("/users/get-appointments-by-user-id", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch(hideLoading());
			if (resposne.data.success) {
				setAppointments(resposne.data.data);
			}
		} catch (error) {
			dispatch(hideLoading());
		}
	}, [dispatch]);
	const columns = [
		{
			title: "Id",
			dataIndex: "_id",
		},
		{
			title: "Doctor",
			dataIndex: "name",
			render: (text, record) => (
				<span>
					{record.doctorInfo.firstName} {record.doctorInfo.lastName}
				</span>
			),
		},
		{
			title: "Phone",
			dataIndex: "phoneNumber",
			render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
		},
		{
			title: "Date & Time",
			dataIndex: "createdAt",
			render: (text, record) => (
				<span>
					{moment(record.date).format("DD-MM-YYYY")}
					{moment(record.time).format("HH:mm")}
				</span>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
		},
	];
	  useEffect(() => {
			getAppointmentsData();
		}, [getAppointmentsData]);
	return (
		<Layout>
			<h1 className='page-title'>Appointments</h1>
			<hr />
			<Table columns={columns} dataSource={appointments} />
		</Layout>
	);
};

export default Appointments;
