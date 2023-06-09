import React, { useCallback, useState } from 'react';
import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUsersData = useCallback(async () => {
		try {
			dispatch(showLoading());
			const response = await axios.get("/admin/get-all-users", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch(hideLoading());
			if (response.data.success) {
				setUsers(response.data.data);
			}
		} catch (error) {
			dispatch(hideLoading());
		}
	}, [dispatch]);

	useEffect(() => {
		getUsersData();
	}, [getUsersData]);
  const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Created At",
			dataIndex: "createdAt",
			render: (record, text) => moment(record.createdAt).format("DD-MM-YYYY"),
		},
		{
			title: "Actions",
			dataIndex: "actions",
			render: (text, record) => (
				<div className='d-flex'>
					<h1 className='anchor'>Block</h1>
				</div>
			),
		},
	];
  return (
      <Layout>
      <h1 className='page-header'>UsersList</h1>
      <hr/>
      <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default UsersList;