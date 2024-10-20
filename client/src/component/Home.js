import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import logo from './UTM.jpg';

const Home = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center shadow-sm">
                        <div className="d-flex justify-content-center">
                            <Card.Img 
                                src={logo} 
                                alt="User Task Management" 
                                style={{ maxWidth: "80%", height: "auto", objectFit: "cover" }}
                            />
                        </div>
                        <Card.Body>
                            <Card.Title as="h5">User Task Management</Card.Title>
                            <Card.Text>
                                The management of users and their assigned tasks within a specific department is the focus of this website. We can add new users to this website and assign them new tasks as well. Additionally, we are able to view every aspect of the users and their assignments.
                            </Card.Text>
                            {/* <Button variant="primary">Learn More</Button> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
