import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import './Manageallorder.css';

const Manageallorder = () => {

    const [allOrders, setAllOrders] = useState([]);
    const [status, setStatus] = useState(null)
    useEffect(() => {
        document.title = "Manage All Orders | TravelGuru";
    }, []);
    useEffect(() => {
        fetch('https://fast-anchorage-60876.herokuapp.com/placeorders/')
            .then((res) => res.json())
            .then((data) => setAllOrders(data));
    }, [status]);
    const handleDelete = (id) => {
        const proced = window.confirm('Are you Sure, You Want to Delete Your Data?');
        if (proced) {
            const url = `https://fast-anchorage-60876.herokuapp.com/deleteallorder/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire("Dhukkho Jonok!",
                            "Data Delete SuccessFull!",
                            "success"
                        )
                        const remainingPacks = allOrders.filter((pack) => pack._id !== id);
                        setAllOrders(remainingPacks);
                    }
                })
        }
    }
    const handleUpdate = (id) => {
        const url = `https://fast-anchorage-60876.herokuapp.com/placeorders/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(allOrders)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setStatus(!status)
                    Swal.fire("WoW!",
                        "Status Update SuccessFull!",
                        "success"
                    )
                } else {
                    setStatus(false)
                }
            })
    }
    const clock = <FontAwesomeIcon icon={faClock} />
    const map = <FontAwesomeIcon icon={faMapMarkerAlt} />
    return (
        <Container className="mb-5 mt-5" style={{ minHeight: '100vh' }}>
            <div className="col-12 col-md-8 mx-auto">
                <h3 className="text-light-green text-center mt-5 mb-3 text-decoration-underline">Manage All Orders List</h3>
            </div>
            <Row xs={1} md={2} lg={3} className="g-4">
                {
                    allOrders.map(orders => {
                        return (< Col key={orders._id}>
                            <Card className="h-100 card-border shadow-lg">
                                <Card.Img className="overflow-hidden" variant="top" src={orders?.order?.img} id='cardimg' />
                                <Card.Body className="overflow-hidden text-center">
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">{clock}{" "}{orders?.order?.duration}{" "}Days / Night</span>
                                        <span className="fw-bold"><span className="price">${orders?.order?.price}</span> / Per Person</span>
                                    </div>
                                    <div className="justify-content-center mt-2">
                                        <span className="fw-bold">{map}{" "}{orders?.order?.location}</span>

                                    </div>
                                    <div className="justify-content-center mt-2">
                                        <span className="fw-bold"><span className="price fs-6 fw-bolder"><span className="fs-5 fw-bolder">Order-Status:</span> {orders?.status}</span></span>

                                    </div>
                                    <Card.Title className="pt-3 fw-bolder">{orders?.order?.title}</Card.Title>
                                    <Card.Text>
                                        {orders?.order?.description?.slice(0, 126)}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="bg-white">
                                    <div className="d-flex justify-content-between">
                                        <Button onClick={() => handleDelete(orders._id)}
                                            className="btn-light-card fw-bold border-0"
                                        >
                                            Delete Package
                                        </Button>
                                        <Button onClick={() => handleUpdate(orders._id)}
                                            className="btn-status-card fw-bold border-0"
                                        >
                                            Update Status
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                        )
                    })}
            </Row>
        </Container >
    );
};

export default Manageallorder;