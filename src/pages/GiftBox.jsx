import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import GiftBoxProduct from './GiftBoxProduct';
import 'aos/dist/aos.css';
import './producttable.css';
import axios from 'axios';

const GiftBox = () => {
	const [loading, setLoading] = useState(true);
	const [pdfUrl, setPdfUrl] = useState(null);

	const [giftDescription, setGiftDescription] = useState('');
	const organizationId = import.meta.env.VITE_ORGANIZATION;

	// Fetch categories
	const fetchGroupBy = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/categories/${organizationId}/lists`
			);
			const { data } = response.data;
			// Filter only Retail category
			const gift = data.find((cat) => cat.group_by.toLowerCase() === 'gift box');

			if (gift) {
				setGiftDescription(gift.description);
			} else {
				setGiftDescription('');
				return;
			}
		} catch (error) {
			console.error('Error fetching categories:', error.message);
		}
	};

	useEffect(() => {
		fetchGroupBy();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
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
					const encodedUrl = encodeURIComponent(responseData.data.pdf_url);
					setPdfUrl(``);
				} else {
					throw new Error(responseData.msg);
				}
			} catch (error) {
				setLoading(false);
				console.error('Error fetching data:', error.message);
			}
		};

		fetchData();
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
		headData.find((item) => item.category_name === 'Gift Box') || {};
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
					<GiftBoxProduct />
				</div>
			</div>
			{/* price list table end*/}
		</div>
	);
};

export default GiftBox;
