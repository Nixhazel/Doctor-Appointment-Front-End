import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { Table } from "antd";
import { toast } from "react-hot-toast";
import moment from "moment";

const DoctorsList = () => {
	const [doctors, setDoctors] = useState([]);
	const dispatch = useDispatch();

	 const getDoctorsData = useCallback(async () => {
			try {
				dispatch(showLoading());
				const response = await axios.get("/admin/get-all-doctors", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				dispatch(hideLoading());
				if (response.data.success) {
					setDoctors(response.data.data);
				}
			} catch (error) {
				dispatch(hideLoading());
			}
		}, [dispatch]);


	const changeDoctorStatus = async (record, status) => {
		try {
			dispatch(showLoading());
			const response = await axios.post(
				"/admin/change-doctor-account-status",
				{ doctorId: record._id, userId: record.userId, status: status },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				getDoctorsData();
			}
		} catch (error) {
			toast.error("Error change doctor account status");
			dispatch(hideLoading());
		}
	};


	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (text, record) => (
				<span>
					{record.firstName} {record.lastName}
				</span>
			),
		},
		{
			title: "Phone",
			dataIndex: "phoneNumber",
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
		},
		{
			title: "status",
			dataIndex: "status",
		},
		{
			title: "Actions",
			dataIndex: "actions",
			render: (text, record) => (
				<div className='d-flex'>
					{record.status === "pending" && (
						<h1
							className='anchor'
							onClick={() => changeDoctorStatus(record, "approved")}>
							Approve
						</h1>
					)}
					{record.status === "approved" && (
						<h1
							className='anchor'
							onClick={() => changeDoctorStatus(record, "blocked")}>
							Block
						</h1>
					)}
				</div>
			),
		},
	];


	useEffect(() => {
		getDoctorsData();
	}, [getDoctorsData]);
	return (
		<Layout>
			<h1 className='page-header'>DoctorsList</h1>
			<hr />
			<Table columns={columns} dataSource={doctors} />
		</Layout>
	);
};

export default DoctorsList;
