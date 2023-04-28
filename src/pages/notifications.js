import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const markAllAsSeen = async () => {
		try {
			console.log(user);
			dispatch(showLoading());
			const response = await axios.post(
				"/users/mark-all-notifications-as-seen",
				{ userId: user._id },{
				    headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
											});
			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				dispatch(setUser(response.data.data));
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			toast.error("somthing went wrong", error.message);
		}
	};

	const deleteAll = async () => {
		try {
			console.log(user);
			dispatch(showLoading());
			const response = await axios.post(
				"/users/delete-all-notifications",
				{ userId: user._id },{
			    headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
				});
			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				dispatch(setUser(response.data.data));
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			toast.error("somthing went wrong", error.message);
		}
	};
	return (
		<Layout>
			<h1 className='page-title'>Notifications</h1>
			<hr />
			<Tabs>
				<Tabs.TabPane tab='Unseen' key={0}>
					<div className='d-flex justify-content-end'>
						<h1 className='anchor' onClick={() => markAllAsSeen()}>
							Mark all as seen
						</h1>
					</div>
					{user?.unseenNotifications.map((notification, key) => (
						<div
							key={key}
							className='card p-2 mt-2'
							onClick={() => navigate(notification.onClickPath)}>
							<div className='card-text'>{notification.message}</div>
						</div>
					))}
				</Tabs.TabPane>
				<Tabs.TabPane tab='Seen' key={1}>
					<div className='d-flex justify-content-end'>
						<h1 className='anchor' onClick={() => deleteAll()}>
							Delete All{" "}
						</h1>
					</div>
					{user?.seenNotifications.map((notification, key) => (
						<div
							key={key}
							className='card p-2 mt-2'
							onClick={() => navigate(notification.onClickPath)}>
							<div className='card-text'>{notification.message}</div>
						</div>
					))}
				</Tabs.TabPane>
			</Tabs>
		</Layout>
	);
};
export default Notifications;