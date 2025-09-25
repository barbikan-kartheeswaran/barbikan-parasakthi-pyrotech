import React, { useState, useEffect, useRef } from 'react';
import logo from '../assests/image/productLogo.png';
import { FaWhatsapp } from 'react-icons/fa';
import Fireworks from '@fireworks-js/react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../Components/Footer/footer.css';
import axios from 'axios';

const Product = () => {
	const [groupBy, setGroupBy] = useState([]);
	const [loading, setLoading] = useState(true);
	const [contactData, setContactData] = useState({});
	const [showFireworks, setShowFireworks] = useState(false);
	const toggleRef = useRef(null);
	const organizationId = import.meta.env.VITE_ORGANIZATION;

	// Fetch categories
	const fetchGroupBy = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/categories/${organizationId}/lists`
			);
			const { data } = response.data;
			setGroupBy(data);
		} catch (error) {
			console.error('Error fetching categories:', error.message);
		}
	};

	useEffect(() => {
		fetchGroupBy();
	}, []);

	// Fetch contact info
	const fetchContact = async () => {
		try {
			const response = await fetch(
				'https://api.sreehayagreevacrackers.com/company/company-1726732650022-0885/getcompanybyid'
			);
			if (!response.ok) throw new Error('Failed to fetch contact data');

			const responseData = await response.json();
			if (responseData.status === 200) {
				setContactData(responseData.company || {});
			}
			setLoading(false);
		} catch (error) {
			console.error('Error fetching contact:', error.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContact();
	}, []);

	return (
		<>
			{/* WhatsApp Icon */}
			{contactData.mobile_number_1 && (
				<div className='whatsapp-icon'>
					<a
						href={`https://api.whatsapp.com/send?phone=919080129766`}
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaWhatsapp style={{ fontSize: '40px', color: '#FFFFFF' }} />
					</a>
				</div>
			)}

			{/* Navbar */}
			<Navbar expand='xl' bg='white' variant='light' className='px-3 navbars'>
				<div className='d-flex align-items-center'>
					<div className='site-logo'>
						<NavLink to='/' className='wd-logo wd-main-logo'>
							<img src={logo} style={{ width: '100px', marginRight: '1rem' }} />
						</NavLink>
					</div>
					<div className='wd-header-text set-cont-mb-s reset-last-child'>
						<h5>
							<span style={{ color: '#d12b1e' }} className='navbar-name'>
								PARASAKTHI PYROTECH
							</span>
						</h5>
					</div>
				</div>

				<Navbar.Toggle aria-controls='basic-navbar-nav' ref={toggleRef} />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mx-auto d-md-flex gap-3 flex-column flex-xl-row align-items-center navslink-button'>
						{groupBy.length > 0 ? (
							groupBy.map((category, index) => (
								<Nav.Link
									key={index}
									as={NavLink}
									to={category.group_by.toLowerCase().replace(/\s+/g, '-')}
									className='btn btn-pink mx-2 nav-button-width'
									style={{ width: '130px' }}
									title={category.description} // optional: show description on hover
								>
									{category.group_by === 'Retail'
										? 'Retail Price'
										: category.group_by === 'Wholesale'
										? 'Wholesale Price'
										: category.group_by}
								</Nav.Link>
							))
						) : (
							<div></div>
						)}

						<Nav.Link
							as={NavLink}
							to='/about'
							className='btn btn-pink mx-2 nav-button-width'
							style={{ width: '130px' }}
						>
							About Us
						</Nav.Link>

						<Nav.Link
							as={NavLink}
							to='/contact'
							className='btn btn-pink mx-2 nav-button-width'
							style={{ width: '130px' }}
						>
							Contact Us
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			{/* Fireworks */}
			{showFireworks && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: 9999,
					}}
				>
					<Fireworks />
				</div>
			)}
		</>
	);
};

export default Product;
