import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row, Table } from 'reactstrap'
import TheNavigation from '../layout/TheNavigation'
import './style.css'

const ExtraInfo = (props) =>{
    console.log(props.location.state)
    return (
        <>
            {/* <TheNavigation/> */}
            <Container className="my-4">
                <Card>
                    <CardHeader>
                        <b>Kiraan Zakat Pendapatan</b>
                    </CardHeader>
                    <CardBody>
                        <div className="main"> 
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                    Tahun / Haul
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                    {props.location.state.tahun}
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                    Amaun Nisab
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.amaun}

                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                    Jenis Kiraan
                                </Col>
                                <Col md="4"  className="d-flex justify-content-end">
                                {props.location.state.tolakanRadio==false ? "Tanpa Tolakan" : "Denga Tolakan"}

                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
                <Card >
                    <CardHeader>
                        <b>Maklumat Pendapatan</b>
                    </CardHeader>
                    <CardBody>
                        <div className="main"> 
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                Pendapatan Bulanan
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.penda}

                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                Pendapatan Tahunan
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.penda * 12}

                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                Pendapatan Lain
                                </Col>
                                <Col md="4"  className="d-flex justify-content-end">
                                {props.location.state.pendapatanLain}

                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                Jumlah Pendapatan
                                </Col>
                                <Col md="4"  className="d-flex justify-content-end">
                                {props.location.state.jumlahPendapatan}

                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
                {/* if there is second radio */}
                {
                    props.location.state.tolakanRadio? 
                <Card >
                    <CardHeader>
                        <b>Maklumat Perbelanjaan Tahunan</b>
                    </CardHeader>
                    <CardBody>
                        <div className="main"> 
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                Diri Sendiri
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.diriSendiri.first_value}
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                <h6>
                                Isteri
                                </h6> 
                                <small>
                                    Tolakan RM5,000.00 untuk setiap isteri.
                                </small>
                                </Col>
                                <Col md="4" className="d-flex justify-content-between">
                                <div className="padding-right" >
                                {props.location.state.isteri}
                                </div>
                                <div >
                                {props.location.state.isteri * 5000.00}
                                </div>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                <h6>
                                    Anak berumur bawah 18 tahun 
                                </h6>
                                <small>
                                    Tolakan RM2,000.00 untuk setiap anak.
                                </small>
                                </Col>
                                <Col md="4" className="d-flex justify-content-between">
                                <div className="padding-right">
                                {props.location.state.anak}
                                </div>
                                <div>
                                {props.location.state.anak * 2000.00}
                                </div>
                                </Col>
                            </Row>
                          
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                    <h6>
                                        Anak berumur lebih 18 tahun (belajar) 
                                    </h6>
                                    <small>
                                        Tolakan RM5,000.00 untuk setiap anak.
                                    </small>
                                    </Col>
                                    <Col md="4" className="d-flex justify-content-between">
                                    <div className="padding-right">
                                    {props.location.state.anakBelajar}
                                    </div>
                                    <div >
                                    {props.location.state.anakBelajar * 5000.00}

                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                Ibu Bapa
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.ibuBapa}
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                Potongan KWSP
                                </Col>
                                <Col md="4" className="d-flex justify-content-between">
                                <div >
                                {props.location.state.kwspNum}{ " "}{props.location.state.kwsp}
                                </div>
                                <div >
                                {props.location.state.kiraan}
                                </div>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                <h6>
                                    Pendidikan Sendiri 
                                </h6>
                                <small>
                                    Maksimum RM2000.00 untuk setahun
                                </small>
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.sendri}
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                Jumlah Perbelanjaan
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.perb}

                                </Col>
                            </Row>
                            
                        </div>
                    </CardBody>
                </Card>
                :
                null
                }
                {/* End of second radio */}
                <Card >
                    <CardHeader>    
                        <b>Jumlah Zakat Pendapatan</b>
                    </CardHeader>
                    <CardBody>
                        <div className="main"> 
                            <Row className="mt-4 mb-4">
                                <Col md="8" >
                                Jumlah Pendapatan Layak Di Zakat
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                <b>{props.location.state.jumlahPendapatan}</b>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                Caruman Berzakat
                                Caruman ke agensi membayar zakat    
                                </Col>
                                <Col md="4" className="d-flex justify-content-end">
                                {props.location.state.caruman}
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                Jumlah Zakat Setahun
                                Hanya 2.5% setahun
                                </Col>
                                <Col md="4"  className="d-flex justify-content-end">
                                <b>{props.location.state.jumlahZakatSetahun}</b>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col md="8">
                                Jumlah Zakat Bulanan
                                </Col>
                                <Col md="4"  className="d-flex justify-content-end">
                                <b>{props.location.state.jumlahZakatBulanan}</b>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </>

    )
}

export default ExtraInfo;