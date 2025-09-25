import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Row, Container, Button, Card, Image } from 'react-bootstrap'
import boy from '../assests/boy1.jpg';
import boyt from '../assests/boy2.jpg';
import boyth from '../assests/boy3.jpg';
import boyf from '../assests/boy4.jpg';
import boyfi from '../assests/boy5.jpg';

const SlickFooter = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div className=''>
                    <Row className="align-items-center">
                        <Col xs={2} lg={2} md={2} sm={2}>
                            <Image
                                src={boy}
                                roundedCircle
                                fluid
                            />
                        </Col>
                        <Col xs={10} lg={10} md={10} sm={10} className='mt-5'>
                            <blockquote className="blockquote">
                                <p className="mb-2">
                                    Our Diwali celebration was made more memorable by the fireworks from Hayagreeva Crackers. The performance was stunning, and the colors were vivid.
                                </p>
                                <footer className="blockquote-footer mt-3">
                                    Prakash <cite title="Source Title">customer</cite>
                                </footer>
                            </blockquote>
                        </Col>
                    </Row>
                </div>
                <div className=''>
                    <Row className="align-items-center">
                        <Col xs={2} lg={2} md={2} sm={2}>
                            <Image
                                src={boyt}
                                roundedCircle
                                fluid
                            />
                        </Col>
                        <Col xs={10} lg={10} md={10} sm={10} className='mt-5'>
                            <blockquote className="blockquote">
                                <p className="mb-2">
                                    I have purchased my fireworks from Hayagreeva Crackers for years, and they have never let me down. Their goods are of exceptional quality and reasonable price..</p>
                                <footer className="blockquote-footer mt-3">
                                    Vijay <cite title="Source Title">customer</cite>
                                </footer>
                            </blockquote>
                        </Col>
                    </Row>
                </div>
                <div className=''>
                    <Row className="align-items-center">
                        <Col xs={2} lg={2} md={2} sm={2}>
                            <Image
                                src={boy}
                                roundedCircle
                                fluid
                            />
                        </Col>
                        <Col xs={10} lg={10} md={10} sm={10} className='mt-5'>
                            <blockquote className="blockquote">
                                <p className="mb-2">
                                    The fireworks I purchased from Hayagreeva Crackers for my daughter's wedding were well-liked by the visitors. The team was simple, and the items arrived on schedule..					 </p>
                                <footer className="blockquote-footer mt-3">
                                    Vijay <cite title="Source Title">customer</cite>
                                </footer>
                            </blockquote>
                        </Col>
                    </Row>
                </div>
                <div className=''>
                    <Row className="align-items-center">
                        <Col xs={2} lg={2} md={2} sm={2}>
                            <Image
                                src={boyf}
                                roundedCircle
                                fluid
                            />
                        </Col>
                        <Col xs={10} lg={10} md={10} sm={10} className='mt-5'>
                            <blockquote className="blockquote">
                                <p className="mb-2">
                                    The fireworks I purchased from Hayagreeva Crackers for my daughter's wedding were well-liked by the visitors. The team was simple, and the items arrived on schedule..					 </p>
                                <footer className="blockquote-footer mt-3">
                                    Vijay <cite title="Source Title">customer</cite>
                                </footer>
                            </blockquote>
                        </Col>
                    </Row>
                </div>
                {/* <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
                <div>
                    <h3>7</h3>
                </div>
                <div>
                    <h3>8</h3>
                </div> */}
            </Slider>
        </div>
    );
}


export default SlickFooter