import React, { useState, useEffect } from 'react';
import './about.css';
import CountUp from 'react-countup';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';
import SlickFooter from './SlickFooter';
import Footer from '../Components/Footer/Footer.jsx';
import { FaWhatsapp } from 'react-icons/fa';
import { CiLocationOn, CiMail, CiPhone } from 'react-icons/ci';
const Contact = () => {
	const [loading, setLoading] = useState(true);
	const [contactData, setContactData] = useState([]);
	const fetchContact = async () => {
		try {
			const response = await fetch('', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const responseData = await response.json();

			setLoading(false);
			if (responseData.status === 200) {
				setContactData(responseData.company);
			} else {
				throw new Error(responseData.msg);
			}
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error.message);
		}
	};

	useEffect(() => {
		fetchContact();
	}, []);
	return (
		<div>
			<div className='about-img py-md-5 py-5'>
				<div className='about-img-banner-content py-md-5 py-0'>
					<h1>Contact Us</h1>
				</div>
			</div>
			<div className='pt-md-5 pt-2'>
				<Container className='my-md-5'>
					<Row
						className='text-center'
						style={{ display: 'flex', alignItems: 'stretch' }}
					>
						<Col lg={4} md={6} className='d-flex'>
							<div className='py-5 px-3 border shadow-sm rounded flex-fill mb-2'>
								<h5 className='d-flex align-items-center justify-content-center'>
									<CiLocationOn className='text-danger' /> Address
								</h5>
								<p className='' style={{ color: 'gray' }}>
									25E, Arumugam Road, <br />
									Sivakasi <br />
								</p>
							</div>
						</Col>
						<Col lg={4} md={6} className='d-flex'>
							<div className='py-5 px-3 border shadow-sm rounded flex-fill mb-2'>
								{/* <FontAwesomeIcon icon={faPhoneAlt} size="2x" className="text-danger mb-3" /> */}
								<h5 className='d-flex align-items-center justify-content-center'>
									<CiPhone className='text-danger' /> &nbsp;Phone
								</h5>
								<p>
									<a
										style={{ color: 'gray' }}
										className='text-decoration-underline'
										href={`tel:+${9080129766}`}
									>
										+91 9080129766
									</a>
								</p>
								<p>
									<a
										style={{ color: 'gray' }}
										className='text-decoration-underline'
										href={`tel:+${8098490678}`}
									>
										+91 8098490678
									</a>
								</p>
							</div>
						</Col>
						<Col lg={4} md={6} className='d-flex'>
							<div className='py-5 px-3 border shadow-sm rounded flex-fill mb-2'>
								<h5 className='d-flex align-items-center justify-content-center'>
									<CiMail className='text-danger' /> Bank Details
								</h5>
								<p className='mb-1'>
									<strong>Name:</strong> Manikandan <br />
									<strong>A/C No.:</strong> 435100050301863 <br />
									<strong>Bank:</strong> TMB Bank <br />
									<strong>IFSC:</strong> TMBL0000435 <br />
									<strong>Branch:</strong> Sivakasi
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			<div className='container-fluid border'>
				<div className='row'>
					<div className='col-12 col-xl-12 col-xxl-12'>
						<iframe
							src=''
							title='Parasakthi Pyrotech, Sivakasi'
							aria-label='Parasakthi Pyrotech, Sivakasi'
							style={{ border: 0, width: '100%', height: '450px' }}
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
							allowFullScreen
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
