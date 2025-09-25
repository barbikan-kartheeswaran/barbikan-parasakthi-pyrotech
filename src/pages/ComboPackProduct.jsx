import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fireworks from '@fireworks-js/react';
import defaultProductLogo from '../assests/image/productLogo.png';
import axios from 'axios';

const ComboPackProduct = () => {
	const [retailData, setRetailData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [quantities, setQuantities] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
	const [showFireworks, setShowFireworks] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		email: '',
		address: '',
		state: '',
		deliveryCity: '',
		postalCode: '',
	});
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);

	const organizationId = import.meta.env.VITE_ORGANIZATION;

	// --- Form Validation ---
	const isFormValid = () => {
		return (
			formData.name.trim() &&
			formData.phoneNumber.trim() &&
			formData.address.trim() &&
			formData.state.trim() &&
			formData.deliveryCity.trim()
		);
	};

	useEffect(() => {
		setIsCheckoutDisabled(!isFormValid());
	}, [formData]);

	// --- Fetch Products ---
	const fetchRetailData = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/products/${organizationId}/lists`,
				{ params: { groupBy: 'Combo Pack', page: 1, limit: 100 } }
			);
			setRetailData(response.data.data || []);
		} catch (err) {
			console.error('Error fetching retail data:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRetailData();
	}, []);

	// --- Handle Quantity Change ---
	const handleQuantityChange = (key, value) => {
		setQuantities((prev) => ({
			...prev,
			[key]: isNaN(value) ? 0 : Number(value),
		}));
	};

	const handleDeleteProduct = (key) => {
		setQuantities((prev) => {
			const newQ = { ...prev };
			delete newQ[key];
			return newQ;
		});
	};

	// --- Calculate Product Total ---
	const calculateProductTotal = (key) => {
		const quantity = quantities[key] || 0;
		const [categoryIndex, productIndex] = key.split('-');
		const product = retailData[categoryIndex]?.products?.[productIndex];
		if (!product) return '0.00';
		const subDiscount = retailData[categoryIndex]?.discount || 0;
		const discountPrice =
			parseFloat(product.price) - (parseFloat(product.price) * subDiscount) / 100;
		const total = discountPrice * quantity;
		return isNaN(total) ? '0.00' : total.toFixed(2);
	};

	// --- Calculate Totals ---
	const calculateTotalActualPrice = () => {
		let total = 0;
		Object.entries(quantities).forEach(([key, qty]) => {
			const [categoryIndex, productIndex] = key.split('-');
			const product = retailData[categoryIndex]?.products?.[productIndex];
			if (product) {
				total += parseFloat(product.price) * qty;
			}
		});
		return total.toFixed(2);
	};

	const calculateTotalDiscountValue = () => {
		let total = 0;
		Object.entries(quantities).forEach(([key, qty]) => {
			const [categoryIndex, productIndex] = key.split('-');
			const product = retailData[categoryIndex]?.products?.[productIndex];
			if (product) {
				const price = parseFloat(product.price); // original price
				const discountPercent = parseFloat(product.discount || 0); // discount percentage
				const discountValue = price * (discountPercent / 100); // actual discount amount
				total += discountValue * qty;
			}
		});
		return total.toFixed(2);
	};
	const totalActualPrice = calculateTotalActualPrice();
	const totalDiscountValue = calculateTotalDiscountValue();
	const totalOfferPrice =
		parseFloat(totalActualPrice) - parseFloat(totalDiscountValue);
	const totalFinalPrice = totalOfferPrice;

	// --- Filter Products in Cart ---
	const filteredProducts = Object.entries(quantities)
		.filter(([_, quantity]) => quantity > 0)
		.map(([key, quantity]) => {
			const [categoryIndex, productIndex] = key.split('-');
			const product = retailData[categoryIndex]?.products?.[productIndex];
			return { key, product, quantity };
		})
		.filter(({ product }) => product);

	// --- Form Change Handler ---
	const handleFormDataChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// --- Modal & Product Details Handlers ---
	const handleCartClick = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
	const handleProductClick = (product) => {
		setSelectedProduct(product);
		setShowProductDetailsModal(true);
	};
	const handleCloseProductDetailsModal = () => {
		setSelectedProduct(null);
		setShowProductDetailsModal(false);
	};

	// --- Submit Estimate ---
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isFormValid()) return;

		try {
			const productItems = filteredProducts.map(({ key, product, quantity }) => ({
				product_id: product.product_id,
				name: product.product_name,
				quantity,
				price: parseFloat(product.price),
			}));

			const requestBody = {
				name: formData.name,
				phone: formData.phoneNumber,
				email: formData.email,
				address: formData.address,
				state: formData.state,
				city: formData.deliveryCity,
				postalCode: formData.postalCode,
				message: 'Please prepare estimate for order',
				totalPrice: parseFloat(totalActualPrice),
				discount: parseFloat(totalDiscountValue),
				totalAmount: parseFloat(totalFinalPrice),
				productItems,
			};

			const response = await axios.post(
				`${import.meta.env.VITE_CRACKERS}/estimates/${organizationId}/add`,
				requestBody,
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (response.data.status === 201 || response.status === 201) {
				toast.success('Estimate added successfully!', { theme: 'colored' });
				setShowModal(false);
				setQuantities({});
				setFormData({
					name: '',
					phoneNumber: '',
					email: '',
					address: '',
					state: '',
					deliveryCity: '',
					postalCode: '',
				});
				setShowFireworks(true);
				setTimeout(() => setShowFireworks(false), 8000);
			} else {
				throw new Error(response.data.msg || 'Failed to add estimate');
			}
		} catch (err) {
			console.error(err);
			toast.error('Error adding estimate. Please try again.');
		}
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			{/* Header */}
			<div
				className='row text-white text-center justify-content-around align-items-center'
				style={{ backgroundColor: '#002147', borderRadius: '6px', padding: '1rem' }}
			>
				{/* Products Count */}
				<div className='col d-flex flex-column align-items-center'>
					<label className='form-label mb-1'>Products Count</label>
					<input
						type='text'
						value={filteredProducts.length}
						readOnly
						className='form-control form-control-sm text-center'
						style={{ width: '100px' }}
					/>
				</div>

				{/* Actual Price */}
				<div className='col d-flex flex-column align-items-center'>
					<label className='form-label mb-1'>Actual Price</label>
					<input
						type='text'
						value={`₹${totalActualPrice}`}
						readOnly
						className='form-control form-control-sm text-center'
						style={{ width: '100px' }}
					/>
				</div>

				{/* Discount Price */}
				<div className='col d-flex flex-column align-items-center'>
					<label className='form-label mb-1'>Discount Price</label>
					<input
						type='text'
						value={`₹${totalDiscountValue}`}
						readOnly
						className='form-control form-control-sm text-center'
						style={{ width: '100px' }}
					/>
				</div>

				{/* Offer Price */}
				<div className='col d-flex flex-column align-items-center'>
					<label className='form-label mb-1'>Offer Price</label>
					<input
						type='text'
						value={`₹${totalOfferPrice.toFixed(2)}`}
						readOnly
						className='form-control form-control-sm text-center'
						style={{ width: '100px' }}
					/>
				</div>

				{/* Final Price */}
				<div className='col d-flex flex-column align-items-center'>
					<label className='form-label mb-1'>Final Price</label>
					<input
						type='text'
						value={`₹${totalFinalPrice.toFixed(2)}`}
						readOnly
						className='form-control form-control-sm text-center'
						style={{ width: '100px' }}
					/>
				</div>

				{/* Cart Icon */}
				<div className='col d-flex justify-content-center align-items-center'>
					<div className='d-flex align-items-center'>
						<FaShoppingCart
							className='cart-icon'
							style={{ fontSize: '1.8rem', cursor: 'pointer', color: '#ffcc00' }}
							onClick={handleCartClick}
						/>
						<Badge pill bg='danger' className='ms-2'>
							{filteredProducts.length}
						</Badge>
					</div>
				</div>
			</div>

			{/* Products Table */}
			<div className='table-container'>
				<table className='custom-table'>
					<thead>
						<tr>
							<th>Photo</th>
							<th>Code</th>
							<th>Name</th>
							<th>Content</th>
							<th>Actual Price</th>
							<th>Discount Price</th>
							<th>Fill Quantity</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{retailData.map((category, categoryIndex) => (
							<React.Fragment key={categoryIndex}>
								<tr
									style={{
										backgroundColor: '#7b2450',
										color: 'white',
										textAlign: 'center',
									}}
								>
									<td colSpan='8'>{category.category_name}</td>
								</tr>
								{category.products.map((product, productIndex) => {
									const key = `${categoryIndex}-${productIndex}`;
									const price = Number(product.price) || 0;
									const discountPercent = Number(product.discount) || 0; // discount %
									const discountedUnitPrice = price * (1 - discountPercent / 100); // discounted price per unit
									const quantity = Number(quantities[key]) || 0;
									const total = (discountedUnitPrice * quantity).toFixed(2);

									return (
										<tr key={product.product_id}>
											<td>
												<img
													src={
														product.images?.[0]
															? `${import.meta.env.VITE_CRACKERS}/uploads/${product.images[0]}`
															: defaultProductLogo
													}
													alt={product.product_name}
													style={{ width: '50px', height: '50px', cursor: 'pointer' }}
													onClick={() => handleProductClick(product)}
												/>
											</td>
											<td>{product.product_code}</td>
											<td>{product.product_name}</td>
											<td>
												{[
													product.pack_content?.toUpperCase(),
													product.unit_type?.toUpperCase(),
												]
													.filter(Boolean)
													.join(' / ')}
											</td>

											{/* Actual price (struck-through) */}
											<td>
												<del
													style={{
														color: 'black',
														textDecoration: 'line-through',
														textDecorationColor: 'red',
													}}
												>
													₹{price.toFixed(2)}
												</del>
											</td>

											{/* Per-unit discounted price = price - discount_amt */}
											<td>₹{discountedUnitPrice.toFixed(2)}</td>

											{/* Quantity */}
											<td>
												<TextField
													type='number'
													value={quantities[key] || ''}
													onChange={(e) =>
														handleQuantityChange(key, parseInt(e.target.value, 10))
													}
													InputProps={{ inputProps: { min: 0 } }}
													size='small'
													style={{ width: '80px' }}
												/>
											</td>

											{/* Total for this row (discountedUnitPrice * qty) */}
											<td>₹{total}</td>
										</tr>
									);
								})}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>

			{/* Cart Modal */}
			<Modal show={showModal} onHide={handleCloseModal} size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>Your Cart</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Products Count: {filteredProducts.length}</p>
					<p>Total Actual Price: ₹{totalActualPrice}</p>
					<p>Total Discount Price: ₹{totalOfferPrice.toFixed(2)}</p>
					<p>Total Final Price: ₹{totalFinalPrice.toFixed(2)}</p>

					<table className='table-responsive w-100'>
						<thead>
							<tr>
								<th>Photo</th>
								<th>Name</th>
								<th>Discount Price</th>
								<th>Fill Quantity</th>
								<th>Total</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map(({ key, product, quantity }) => {
								const categoryIndex = key.split('-')[0];

								// Fix: Use product.discount (flat Rs) instead of subcategory % discount
								const price = parseFloat(product.price) || 0;
								const discountPercent = parseFloat(product.discount) || 0; // discount %
								const discountPrice = price * (1 - discountPercent / 100); // discounted unit price

								const productTotal = (discountPrice * quantity).toFixed(2);

								return (
									<tr key={key}>
										<td>
											<img
												src={
													product.images?.[0]
														? `${import.meta.env.VITE_CRACKERS}/uploads/${product.images[0]}`
														: defaultProductLogo
												}
												alt={product.product_name}
												style={{ width: '50px', height: '50px' }}
											/>
										</td>

										{/* Product name */}
										<td>{product.product_name}</td>

										{/* Discounted unit price */}
										<td>₹{discountPrice.toFixed(2)}</td>

										{/* Quantity input */}
										<td>
											<TextField
												type='number'
												value={quantity}
												onChange={(e) =>
													handleQuantityChange(key, parseInt(e.target.value, 10))
												}
												InputProps={{ inputProps: { min: 0 } }}
												size='small'
												style={{ width: '80px' }}
											/>
										</td>

										{/* Total for that product */}
										<td>₹{productTotal}</td>

										{/* Delete button */}
										<td>
											<FaTrash
												style={{ cursor: 'pointer', color: 'red' }}
												onClick={() => handleDeleteProduct(key)}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					{/* Form */}
					<form>
						<TextField
							label='Name'
							name='name'
							value={formData.name}
							onChange={handleFormDataChange}
							fullWidth
							required
							margin='normal'
						/>
						<TextField
							label='Phone Number'
							name='phoneNumber'
							value={formData.phoneNumber}
							onChange={handleFormDataChange}
							fullWidth
							required
							margin='normal'
						/>
						<TextField
							label='Email'
							name='email'
							value={formData.email}
							onChange={handleFormDataChange}
							fullWidth
							margin='normal'
						/>
						<TextField
							label='Address'
							name='address'
							value={formData.address}
							onChange={handleFormDataChange}
							fullWidth
							required
							margin='normal'
						/>
						<TextField
							label='State'
							name='state'
							value={formData.state}
							onChange={handleFormDataChange}
							fullWidth
							required
							margin='normal'
						/>
						<TextField
							label='Delivery City'
							name='deliveryCity'
							value={formData.deliveryCity}
							onChange={handleFormDataChange}
							fullWidth
							required
							margin='normal'
						/>
						<TextField
							label='Postal Code'
							name='postalCode'
							value={formData.postalCode}
							onChange={handleFormDataChange}
							fullWidth
							margin='normal'
						/>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseModal}>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={handleSubmit}
						disabled={isCheckoutDisabled}
					>
						Checkout
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Product Details Modal */}
			<Modal
				show={showProductDetailsModal}
				onHide={handleCloseProductDetailsModal}
				size='lg'
			>
				<Modal.Header closeButton>
					<Modal.Title>Product Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedProduct && (
						<div className='d-flex flex-column align-items-center'>
							<img
								src={`${import.meta.env.VITE_CRACKERS}/uploads/${
									selectedProduct.image_url
								}`}
								alt={selectedProduct.product_name}
								style={{ width: '50%', height: 'auto' }}
							/>
							<h4>{selectedProduct.product_name}</h4>
							<p>{selectedProduct.description}</p>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleCloseProductDetailsModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			<ToastContainer position='top-center' autoClose={5000} theme='colored' />
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
		</div>
	);
};

export default ComboPackProduct;
