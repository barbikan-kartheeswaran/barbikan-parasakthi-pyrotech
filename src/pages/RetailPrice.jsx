import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Aos from 'aos';
import 'aos/dist/aos.css';
import logo from '../assests/srisrilogo.png';
import homevideo from '../assests/Diwali.mp4';
import discount from '../assests/discount.png';
import gift from '../assests/gift.png';
import saravedi from '../assests/homesaravedi.png';
import RetailPriceProduct from './RetailPriceProduct';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './producttable.css';

const RetailPrice = () => {
	useEffect(() => {
		Aos.init();
	}, []);
	const fireworksRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [pdfUrl, setPdfUrl] = useState(null);

	const [retailDescription, setRetailDescription] = useState('');
	const organizationId = import.meta.env.VITE_ORGANIZATION;

	// Fetch categories
	const fetchGroupBy = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/categories/${organizationId}/lists`
			);
			const { data } = response.data;
			// Filter only Retail category
			const retailCategory = data.find(
				(cat) => cat.group_by.toLowerCase() === 'retail'
			);

			if (retailCategory) {
				setRetailDescription(retailCategory.description);
			} else {
				setRetailDescription('');
				return;
			}
		} catch (error) {
			console.error('Error fetching categories:', error.message);
		}
	};

	useEffect(() => {
		fetchGroupBy();
	}, []);

	const retailPdfUrl = '/parasakthi_pyrotech.pdf';

	const handleOpenInNewTab = () => {
		setLoading(true);
		window.open(retailPdfUrl, '_blank'); // Open PDF in new tab
		setLoading(false);
	};

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
				setPdfUrl(
					`https://api.sreehayagreevacrackers.com/uploads/pdfs/${encodedUrl}`
				); // Construct the full URL
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
		headData.find((item) => item.category_name === 'Retail Price') || {};

	// Create a ref for RetailPriceProduct section
	const retailRef = useRef(null);

	// Function to scroll down
	const handleScroll = () => {
		retailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
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
				<div ref={retailRef}>
					<RetailPriceProduct />
				</div>
			</div>

			{/* price list table end*/}
		</div>
	);
};

export default RetailPrice;
