/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
	const [collapsed, setCollapsed] = useState(false);
	const { user } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const userMenu = [
		{
			name: "Home",
			path: "/",
			icon: "ri-home-line",
		},
		{
			name: "Appointments",
			path: "/appointments",
			icon: "ri-file-list-line",
		},
		{
			name: "Apply Doctor",
			path: "/apply-doctor",
			icon: "ri-hospital-line",
		},
	];

	const doctorMenu = [
		{
			name: "Home",
			path: "/",
			icon: "ri-home-line",
		},
		{
			name: "Appointments",
			path: "/doctor/appointments",
			icon: "ri-file-list-line",
		},
		{
			name: "Profile",
			path: `/doctor/profile/${user?._id}`,
			icon: "ri-user-line",
		},
	];

	const adminMenu = [
		{
			name: "Home",
			path: "/",
			icon: "ri-home-line",
		},
		{
			name: "Users",
			path: "/admin/userslist",
			icon: "ri-user-line",
		},
		{
			name: "Doctors",
			path: "/admin/doctorslist",
			icon: "ri-hospital-line",
		},
		
	];

	const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
	const role = user?.isAdmin
		? "Admin"
		: user?.isDoctor
		? "Doctor"
		: "User";

	return (
		<div className='main'>
			<div className='d-flex layout'>
				<div className='sidebar'>
					<div className='sidebar-header'>
						<h1 className='logo'>{`${
							collapsed ? "T-M🩺" : "TECO Medics🩺"
						}`}</h1>
						<h1 className='role'>{role}</h1>
					</div>

					<div className='menu'>
						{menuToBeRendered.map((menu, key) => {
							const isActive = location.pathname === menu.path;
							return (
								<div
									key={key}
									className={`d-flex menu-item 
              						${isActive && "active-menu-item"}`}>
									<Link className={menu.icon} to={menu.path}></Link>
									{!collapsed && <Link to={menu.path}>{menu.name}</Link>}
								</div>
							);
						})}
						<div
							className={`d-flex menu-item`}
							onClick={() => {
								localStorage.clear();
								navigate("/login");
							}}>
							<Link className='ri-logout-circle-line' to='/login'></Link>
							{!collapsed && <Link to='/login'>Logout</Link>}
						</div>
					</div>
				</div>
				<div className='content'>
					<div className='header'>
						{collapsed ? (
							<i
								className='ri-menu-line header-action-icon'
								onClick={() => setCollapsed(false)}></i>
						) : (
							<i
								className='ri-close-line header-action-icon'
								onClick={() => setCollapsed(true)}></i>
						)}
						<div className='d-flex align-items-center px-4'>
							<Badge
								count={user?.unseenNotifications.length}
								onClick={() => navigate("/notifications")}>
								<i className='ri-notification-line header-action-icon px-3'></i>
							</Badge>
							<Link className='anchor mx-2' to='/'>
								{user?.name}
							</Link>
						</div>
					</div>

					<div className='body'>{children}</div>
				</div>
			</div>
		</div>
	);
}

export default Layout;
