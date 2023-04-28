import React from "react";
import { useNavigate } from 'react-router-dom';

const Doctor = ({ doctor }) => {
    const navigate = useNavigate();
	return (
		<>
			{!doctor ? (
				<h1 className='page-header'>No Doctors Available</h1>
			) : (
				<div
					className='card p-2 coursor-pointer'
					onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
					<h1 className='card-title'>
						{doctor.firstName} {doctor.lastName}
					</h1>
					<hr />

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
						<b>Timings : </b>
						{doctor.timings[0]} - {doctor.timings[1]}
					</p>
				</div>
			)}
		</>
	);
};

export default Doctor;
