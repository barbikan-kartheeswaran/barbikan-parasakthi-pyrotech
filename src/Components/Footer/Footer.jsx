import { useEffect, useState } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiFacebook, FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assests/image/productLogo.png';
import './footer.css';

const Footer = () => {
	/* Feature - Dynamically Change detail in Footer details
	const [orgData, setOrgData] = useState([]);
	const organizationId = import.meta.env.VITE_ORGANIZATION;
	const [loading, setLoading] = useState(true);

	const fetchOrganization = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_CRACKERS}/stores/${organizationId}/list`
			);
			const { data } = response.data;
			setOrgData([data]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchOrganization();
	}, []);

	return (
		<>
			<footer>
				<div className='footer-container'>
					<div className='store-info'>
						{orgData.map((item, index) => (
							<div key={index}>
								<h1>{item.name}</h1>
								<p>{item.description}</p>
								<img
									src={`${import.meta.env.VITE_CRACKERS}/uploads/${item.store_logo}`}
								/>
							</div>
						))}
					</div>
					<div className='contact-info'>
						<h1>Contact us</h1>
						{orgData.map((item, index) => (
							<div key={index}>
								<p>
									Address: {item.address_line1}, {item.address_line2}, {item.city},{' '}
									{item.state} - {item.postal_code}, {item.country},
								</p>
								<p>Phone No: {item.phone}</p>
								<p>Gmail: {item.email}</p>
							</div>
						))}
					</div>
					<div className='social-info'>
						<h1>Social</h1>
						<div className='social-links'>
							<Link
								target='_blank'
								to='https://www.facebook.com/share/F5Dx6rfrh712aqiQ/?mibextid=LQQJ4d'
							>
								<button type='button'>
									<FiFacebook />
								</button>
							</Link>
							<Link
								target='_blank'
								to='https://api.whatsapp.com/send?phone=918778005079'
							>
								<button type='button'>
									<FaWhatsapp />
								</button>
							</Link>
							<Link
								target='_blank'
								to='https://www.instagram.com/sreehayagreeva_crackers?igsh=Z3kyYThoNTNmYTYw&utm_source=qr'
							>
								<button type='button'>
									<FaInstagram />
								</button>
							</Link>
							{<Link target='_blank' to=''>
								<button type='button'>
									<FiYoutube />
								</button>
							</Link> }
						</div>
					</div>
				</div>
				<div className='copyright'>
					<p>
						© {new Date().getFullYear()} Sree Hayagreeva Crackers. All rights
						reserved. Developed by Barbikan Technologies.
					</p>
				</div>
			</footer>
		</>
	);
};
*/
	return (
		<>
			<footer>
				<div className='footer-container'>
					<div className='store-info'>
						<div>
							<h1>Parasakthi Pyrotech</h1>
							<p>
								Parasakthi Pyrotech is a top-tier Manufacturer , Wholesale and Retail
								supplier of exceptional quality fireworks, providing its products to
								customers across various regions.
							</p>
							<img src={logo} />
						</div>
					</div>
					<div className='contact-info'>
						<h1>Contact us</h1>

						<div>
							<p>
								Address: 25E, Arumugam Road,
								<br />
								Sivakasi <br />
							</p>
							<Link
								target='_blank'
								to='https://api.whatsapp.com/send?phone=919080129766'
							>
								<span>
									Phone No:{' '}
									<span style={{ color: '#ffeb3b', textDecoration: 'underline' }}>
										9080129766
									</span>
								</span>
							</Link>

							<Link
								target='_blank'
								to='https://api.whatsapp.com/send?phone=918098490678'
							>
								<span>
									Phone No:{' '}
									<span style={{ color: '#ffeb3b', textDecoration: 'underline' }}>
										8098490678
									</span>
								</span>
							</Link>
							{/* <p>
								Gmail:{' '}
								<a
									href='mailto:'
									target='_blank'
									style={{ color: '#ffeb3b', textDecoration: 'underline' }}
								></a>
							</p> */}
						</div>
					</div>
					<div className='social-info'>
						<h1>Social</h1>
						<div className='social-links'>
							{/* <Link
								target='_blank'
								to=''
							>
								<button type='button'>
									<FiFacebook />
								</button>
							</Link>
					
								<Link
									target='_blank'
									to=''
								>
									<button type='button'>
										<FiYoutube />
									</button>
								</Link> */}

							<Link
								target='_blank'
								to='https://api.whatsapp.com/send?phone=919080129766'
							>
								<button type='button'>
									<FaWhatsapp />
								</button>
							</Link>
							{/* <Link
								target='_blank'
								to='https://instagram.com/sri_srinivasa_crackers?igshid=MmIzYWVlNDQ5Yg=='
							>
								<button type='button'>
									<FaInstagram />
								</button>
							</Link> */}
						</div>
					</div>
				</div>
				<div className='copyright'>
					<p>
						© {new Date().getFullYear()} Parasakthi Pyrotech. All rights reserved.
						Developed by Barbikan Technologies.
					</p>
				</div>
			</footer>
		</>
	);
};
export default Footer;
