// import React from 'react';
// import { Row, Col } from 'react-bootstrap';

// const Bankfooter = () => {
// 	const bankData = [
// 		{
// 			account_owner: 'MANIKANDAN',
// 			payment_details: {
// 				type: 'bank_transfer',
// 				bank_name: 'TMB BANK',
// 				account_number: '435100050301863',
// 				ifsc_code: 'TMBL0000435',
// 				branch: 'SIVAKASI',
// 				qr_code: null,
// 			},
// 		},
// 	];

// 	return (
// 		<div
// 			style={{ backgroundColor: '#1c1c1c', color: '#ffffff' }}
// 			className='mt-lg-5 my-1'
// 		>
// 			<div className='container-fluid'>
// 				<Row className='justify-content-center'>
// 					{bankData.map((bank, index) => (
// 						<Col
// 							lg={3}
// 							md={4}
// 							sm={12}
// 							xs={12}
// 							key={index}
// 							className='d-flex flex-column align-items-center text-center p-4'
// 						>
// 							{/* Account Owner */}
// 							<h5 className='mb-2'>{bank.account_owner}</h5>

// 							{/* Bank Name */}
// 							<p className='mb-1'>Bank: {bank.payment_details.bank_name}</p>

// 							{/* Account Number */}
// 							<p className='mb-1'>A/C No: {bank.payment_details.account_number}</p>

// 							{/* IFSC */}
// 							<p className='mb-1'>IFSC: {bank.payment_details.ifsc_code}</p>

// 							{/* Branch */}
// 							<p className='mb-1'>Branch: {bank.payment_details.branch}</p>

// 							{/* QR Code */}
// 							{bank.payment_details?.qr_code && (
// 								<img
// 									src={bank.payment_details.qr_code}
// 									alt='QR Code'
// 									className='qr-code-img mt-2'
// 									style={{ maxWidth: '150px' }}
// 								/>
// 							)}
// 						</Col>
// 					))}
// 				</Row>
// 			</div>
// 		</div>
// 	);
// };

// export default Bankfooter;

import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Bankfooter = () => {
	const [loading, setLoading] = useState(true);
	const [bankData, setBankData] = useState([]);
	const organizationId = import.meta.env.VITE_ORGANIZATION;

	const fetchBank = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/payments/${organizationId}/lists`
			);
			const { data } = response.data;
			setBankData(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error.message);
		}
	};

	useEffect(() => {
		fetchBank();
	}, []);

	return (
		<div
			style={{ backgroundColor: '#1c1c1c', color: '#ffffff' }}
			className='mt-lg-5 my-1'
		>
			<div className='container-fluid'>
				<Row>
					{bankData.map((bank, index) => (
						<Col
							lg={3}
							md={3}
							sm={12}
							xs={12}
							key={index}
							className={`small box d-flex flex-column align-items-center justify-content-start p-lg-4 p-2 ${
								index !== bankData.length - 1 ? 'border-end border-white' : ''
							}`}
						>
							{/* Account Owner */}
							<h5 className='mb-md-3 mb-1 text-md-start text-center'>
								{bank.account_owner}
							</h5>

							{/* Bank Name */}
							<p className='text-center'>
								{bank.payment_details.type === 'bank_transfer'
									? `Bank Name: ${bank.payment_details.bank_name}`
									: `Bank: ${bank.payment_details.bank_name || ''}`}
							</p>

							{/* Account Number (only for bank transfer) */}
							{bank.payment_details.type === 'bank_transfer' && (
								<p className='text-center'>
									Ac No: {bank.payment_details.account_number}
								</p>
							)}

							{/* IFSC or UPI */}
							{bank.payment_details.type === 'bank_transfer' ? (
								<p className='text-center'>IFSC: {bank.payment_details.ifsc_code}</p>
							) : (
								<p className='text-center'>UPI: {bank.payment_details.upi_id}</p>
							)}

							{/* QR Code */}
							{bank.payment_details?.qr_code && (
								<img
									src={`${import.meta.env.VITE_CRACKERS}/uploads/${
										bank.payment_details.qr_code
									}`}
									alt='QR Code'
									className='qr-code-img'
									style={{ maxWidth: '150px', marginTop: '10px' }}
								/>
							)}
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default Bankfooter;
