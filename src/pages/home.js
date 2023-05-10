import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/doctor";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

const Home = () => {
	const [doctors, setDoctors] = useState([]);
	const dispatch = useDispatch();
	const getData = useCallback(async () => {
		try {
			dispatch(showLoading());
			const response = await axios.get("/users/get-all-approved-doctors", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			dispatch(hideLoading());
			if (response.data.success) {
				setDoctors(response.data.data);
			}
		} catch (error) {
			dispatch(hideLoading());
			// console.log(error);
		}
	}, [dispatch]);
	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<Layout>
			<Row gutter={20}>
				{doctors.map((doctor, key) => (
					<Col span={8} xs={24} sm={24} lg={8} key={key}>
						<Doctor doctor={doctor} />
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export default Home;
