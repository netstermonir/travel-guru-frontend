import React from 'react';
import { useEffect } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './AddPackage.css';

const AddPackage = () => {
    useEffect(() => {
        document.title = 'AddPackages : Your Trusted Travel Partner'
    }, []);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        fetch('https://fast-anchorage-60876.herokuapp.com/allPackages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res) {
                    Swal.fire("WoW!",
                        "Package Added SuccessFull!",
                        "success"
                    )
                    reset();
                }
            })
            .catch((error) => {
                Swal.fire(
                    "Something went wrong!",
                    `${error.message}`,
                    "error"
                )
            })
    };
    return (
        <section>
            <div className="container mt-5 mb-5">
                <h2 className="text-center">Add Package</h2>
                <form className="shadow-lg px-2 px-md-5 py-3 mt-5 text-cyan" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Package Title</Form.Label>
                            <Form.Control
                                className="text-secondary fw-semi-bold"

                                {...register("title", { required: true })}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                className="text-secondary fw-semi-bold"

                                {...register("location", { required: true })}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                className="text-secondary fw-semi-bold"

                                {...register("duration", { required: true })}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                className="text-secondary fw-semi-bold"

                                {...register("price", { required: true })}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Photo Url</Form.Label>
                            <Form.Control
                                type="text"
                                className="text-secondary fw-semi-bold"

                                {...register("img", { required: true })}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Decription</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                {...register("description", { required: true })}
                            />
                        </Form.Group>
                    </Row>
                    <div className="mt-3 text-center">
                        <Button
                            type="submit"
                            className="px-3 py-2 fw-bold btn-light-green"
                        >
                            Add Package
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddPackage;