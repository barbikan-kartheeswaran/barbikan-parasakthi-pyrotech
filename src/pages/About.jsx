import React from 'react';
import './about.css';
import CountUp from 'react-countup';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';
import SlickFooter from './SlickFooter';
import Footer from '../Components/Footer/Footer';
import { FaWhatsapp } from 'react-icons/fa';
const About = () => {
	return (
		<div>
			<div>
				<div className='about-img py-md-5 py-5'>
					<div className='about-img-banner-content py-md-5 py-0'>
						<h1>About Us</h1>
					</div>
				</div>
			</div>
			<div className='pt-5'>
				<Container className='about-back-color'>
					<Row>
						<Col lg={6} md={6} sm={12}>
							<div className='aboutback-comparse'>
								<div className='aboutback'>
									<div className=' text-white about-img-index'>
										<h5 className=''>WelCome To</h5>
										<h5 className=''>Parasakthi Pyrotech</h5>
									</div>
								</div>
							</div>
						</Col>
						<Col lg={6} md={6} sm={12}>
							<div className='aboutback-comparse-two'>
								<div className='about-tops-content'>
									<h2 className='about-company'>Parasakthi Pyrotech</h2>
									<h2 className='mt-3 about-quality'>
										Quality you can trust, safety you can rely on
									</h2>
									<p className='mt-3' style={{ fontWeight: '400' }}></p>
									<div className='d-flex mt-5'>
										<div>
											<CountUp
												start={0}
												end={new Date().getFullYear() - 2009}
												duration={5}
												className='countupplus'
											></CountUp>
											<span>
												<FaPlus className='FaPlus' />
											</span>
											<div>
												<h4>Experience</h4>
											</div>
										</div>
										<div className='counts-about '>
											<CountUp
												start={0}
												end={25000}
												duration={5}
												className='countupplus'
											></CountUp>
											<span>
												<FaPlus className='FaPlus' />
											</span>
											<div>
												<h4>Happy customers</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default About;
