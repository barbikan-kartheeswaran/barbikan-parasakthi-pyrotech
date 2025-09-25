import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import Fireworks from '@fireworks-js/react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import logo from '../assests/srisrilogo.png';
import homevideo from '../assests/Diwali.mp4';
import discount from '../assests/discount.png';
import Carousel from 'react-bootstrap/Carousel';
import gift from '../assests/gift.png';
import saravedi from '../assests/homesaravedi.png';
import Footer from '../Components/Footer/Footer';
import './producttable.css';
import image1 from '../assests/1.jpg';
import Bankfooter from '../Components/Bank Footer/Bankfooter';
import WholesaleProduct from './WholeSaleProduct';
import axios from 'axios';

const WholeSale = () => {
	const [loading, setLoading] = useState(true);
	const [pdfUrl, setPdfUrl] = useState(null);

	const [wholesaleDescription, setWholesaleDescription] = useState('');
	const organizationId = import.meta.env.VITE_ORGANIZATION;

	// Fetch categories
	const fetchGroupBy = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/categories/${organizationId}/lists`
			);
			const { data } = response.data;
			// Filter only Retail category
			const wholesale = data.find(
				(cat) => cat.group_by.toLowerCase() === 'wholesale'
			);

			if (wholesale) {
				setWholesaleDescription(wholesale.description);
			} else {
				setWholesaleDescription('');
				return;
			}
		} catch (error) {
			console.error('Error fetching categories:', error.message);
		}
	};

	useEffect(() => {
		fetchGroupBy();
	}, []);

	const fetchDataRetailPdf = async () => {
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
				const encodedUrl = encodeURIComponent(responseData.data.pdf_url); // Encode URL
				setPdfUrl(``); // Construct the full URL
			} else {
				throw new Error(responseData.msg);
			}
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error.message);
		}
	};

	useEffect(() => {
		fetchDataRetailPdf();
	}, []);

	const handleOpenInNewTab = () => {
		if (pdfUrl) {
			window.open(pdfUrl, '_blank');
		}
	};
	const [headData, setHeadData] = useState([]);

	const fetchHead = async () => {
		try {
			const response = await fetch(
				'https://api.sreehayagreevacrackers.com/content/getallcontents',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}

			const responseData = await response.json();

			setLoading(false);
			if (responseData.status === 200) {
				setHeadData(responseData.contents);
			} else {
				throw new Error(responseData.msg);
			}
		} catch (error) {
			setLoading(false);
			console.error('Error fetching data:', error.message);
		}
	};

	useEffect(() => {
		fetchHead();
	}, []);
	const retailPriceCategory =
		headData.find((item) => item.category_name === 'Wholesale Case') || {};
	return (
		<div>
			{/* price list table start*/}
			<div className='container-fluid mt-3'>
				<div className='d-flex justify-content-end mb-2'>
					<Button
						onClick={handleOpenInNewTab}
						disabled={loading}
						className='download-button fs-6'
					>
						{loading ? 'Loading...' : 'Download Pdf'}
					</Button>
				</div>
				<div>
					<WholesaleProduct />
				</div>
			</div>
			{/* price list table end*/}
		</div>
	);
};

export default WholeSale;
