// This is the gold zakat page
import React , {useEffect,useState} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Button,
    Row,
    Form,
    FormGroup,
    FormText,
    CardFooter, 
    Label, 
    Checkbox
} from 'reactstrap';
import { getUserProfile } from '../../apis/GetMethod'
import { getUserToken } from '../../utils/LoginAuth'
import '../zakats/style.css'

const Profile = () => {
    const [data,setData] = useState(null)
    useEffect(()=>{
        getUserProfile(getUserToken()).then(res=>{
            setData(res.results)  
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <>
        <Container className="container-in-single-cart py-4">
            <Form>
                <Card className="my-4 card-in-cart mx-auto d-flex justify-content-center login-card" style = {{width: '70%'}}>
                    <CardBody >
                        <Row>
                            <Col xs="12">
                            <h1>Profile</h1>
                            <Row>
                                <Col xs = "12" sm="12" md="6">
                                    <FormGroup>
                                        <FormText>First Name</FormText>
                                        <Input type="text" defaultValue={data ? data[0].firstName : null} placeholder = "Enter First Name"></Input>
                                    </FormGroup>
                                </Col>

                                <Col sm= "12" xs="12" md="6">
                                    <FormGroup>
                                        <FormText>Last Name</FormText>
                                        <Input type="text" defaultValue={data ? data[0].lastName : null} placeholder = "Enter last Name"></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs = "12" md="12" sm="12">
                                    <FormGroup>
                                        <FormText>Tell us about yourself</FormText>
                                        <Input rows="4" cols="50" type="textarea" name="text" style = {{resize: 'none'}}/>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs = "12" md="6" sm="12">
                                    <FormGroup>
                                        <FormText>Country</FormText>
                                        <Input type="text" placeholder = "Enter country"></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <Col xs = "12" md="6" sm="12">
                                    <FormGroup>
                                        <FormText>Email Address</FormText>
                                        <Input type="text" defaultValue={data ? data[0].email : null} placeholder = "Enter Email Address"></Input>
                                    </FormGroup>
                                </Col>

                                <Col xs = "12" md="6" sm="12">
                                    <FormGroup>
                                        <FormText>Other Phone</FormText>
                                        <Input type="text" placeholder = "Enter email"></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                                <Button color="primary" className="mr-3 mt-3">Submit</Button>
                            </Col>

                            
                        </Row>
                    </CardBody>
                </Card>
            </Form>
        </Container>
        </>
    )
}

export default Profile
