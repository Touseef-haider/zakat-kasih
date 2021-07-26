import { makeStyles } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import {
    Card,CardBody,CardHeader,Button,FormGroup,Input,Row,Col,FormText, Container,
    Modal,ModalHeader,ModalBody, Label
} from 'reactstrap'
import TheNavigation from '../../layout/TheNavigation';
import '../style.css'

import { getValues } from '../../../apis/GetMethod'
import { saveCollection } from '../../../apis/PostMethod'
import {  useDispatch } from 'react-redux'
import { cartAction } from '../../../redux/action/cartAction' 
import { useHistory } from 'react-router';
import compare from '../compare';

const useStyles = makeStyles((theme)=>({
    firstDiv:{
        margin:'10px',
        border:'2px solid blue'
    },
    secondDiv:{
        margin:'13px',   
        opacity:'0.5',
        border:'2px solid grey'

    }
}))

const UntungRugi = () =>{
    const classes = useStyles();
    const history = useHistory()
    const [tahunHaul,setTahunHaul] = useState("0-0");
    const [hasil,setHasil] = useState(0);
    const [tolak,setTolak] = useState(0);
    const [aMinusB,setAMinusB] = useState(0);
    const [jumlahZakat,setJumlahZakat] = useState(0);
    const [modal, setModal] = useState(false);
    const [anotherOpen, setAnotherOpen] = useState(false);
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        getValues().then(res=>{
            console.log(res.results)
            setData(res.results)
            setTahunHaul(res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].first_value+"-"+res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].key_value)
          }).catch(err=>console.log(err))
    },[])

    const handleSave = () =>{
        setLoading(true)
        const obj = {
            userId: JSON.parse(localStorage.getItem('LOGIN_TOKEN')),
            zakatListId : 2,
            jsonObject: JSON.stringify({name:{zakatName:'Untung Rugi',tahunHaul:tahunHaul.split("-")[1],total:jumlahZakat}})
        }
        console.log(obj)
        saveCollection(obj).then(res=>{
            console.log(res)
            if (res.results.code == 1) {
                setLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleAnother = () =>{
        let tbayar = document.getElementById('terusbayar').value
        if(tbayar){
            dispatch(cartAction({zakatName:'Untung Rugi',tahunHaul:tahunHaul.split("-")[1],total:tbayar}))
            setModal(false)
            setAnotherOpen(!anotherOpen)

        }else{

            dispatch(cartAction({zakatName:'Untung Rugi',tahunHaul:tahunHaul.split("-")[1],total:jumlahZakat}))
            setModal(false)
            setAnotherOpen(!anotherOpen)
        }
        console.log(tahunHaul)
    }
    const toggle = () => {
        setModal(!modal);  
    }
    const handleTerus = (e)=>{
        document.querySelector(`.${classes.firstDiv}`).style.opacity = '0.5';
        document.querySelector(`.${classes.firstDiv}`).style.border = '2px solid grey';
        document.querySelector(`.${classes.secondDiv}`).style.opacity = '1';
        document.querySelector(`.${classes.secondDiv}`).style.border = '2px solid blue';
    }

    const handleTroli = (e)=>{
        document.querySelector(`.${classes.secondDiv}`).style.opacity = '0.5';
        document.querySelector(`.${classes.secondDiv}`).style.border = '2px solid grey';
        document.querySelector(`.${classes.firstDiv}`).style.opacity = '1';
        document.querySelector(`.${classes.firstDiv}`).style.border = '2px solid blue';

    }
 

    const handleTahunHaul = (e) =>{
        console.log(e.target.value)
        setTahunHaul(e.target.value)
    }
    const handleHasil = (e) =>{
        setHasil(e.target.value)
        setAMinusB(e.target.value - tolak)
        if (e.target.value >= Number(tahunHaul.split('-')[0])) {
            setJumlahZakat((e.target.value - tolak)/40)
        }else{
            setJumlahZakat(0)
        }
    }
    const handleTolak = (e) =>{
        setTolak(e.target.value)
        setAMinusB(hasil - e.target.value)
        if (hasil >= Number(tahunHaul.split('-')[0])) {
            setJumlahZakat((hasil - e.target.value)/40)
        }else{
            setJumlahZakat(0)
        }
    }
    const terusBayar = () =>{
        let tbayar = document.getElementById('terusbayar').value
        if(tbayar){
            history.push('/singleCartItem',[{zakatName:'Untung Rugi',tahunHaul:tahunHaul.split('-')[1],total:tbayar}])
        }else{
            history.push('/singleCartItem',[{zakatName:'Untung Rugi',tahunHaul:tahunHaul.split('-')[1],total:jumlahZakat}])
        }
      }
    
    return(
        <>
            <TheNavigation/>
            <Container>
            <Card className="my-4">
                    <CardHeader>
                        Kiraan Zakat Perniagaan (Kaedah Untung Rugi)
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Tahun / Haul</FormText>
                                    <Input value={tahunHaul} onChange={handleTahunHaul} type="select">
                                        <option selected disabled>Please Select</option>
                                        {
                                            data ? data.filter(i=>i.title=="tahun-amaunNisab").sort(compare).map(i=>(
                                            <option value={i.first_value + "-" + i.key_value}>
                                                {
                                                    i.key_value
                                                }
                                            </option>
                                            ))
                                            :
                                            null
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Amaun Nisab</FormText>
                                    <Input type="number" value={Number(tahunHaul.split("-")[0]).toFixed(2)} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            <Card className="my-4">
                    <CardHeader>
                        Maklumat Perniagaan
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="6">
                                <FormGroup>
                                    <FormText>Nama Perniagaan</FormText>
                                    <Input  type="text"/>
                                      
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="6">
                                <FormGroup>
                                    <FormText>No. Pendaftaran</FormText>
                                    <Input type="number"   />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="6">
                                <FormGroup>
                                    <FormText>Alamat</FormText>
                                    <Input type="textarea" name="text"  />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="6">
                                <FormGroup>
                                    <FormText>No. Telefon</FormText>
                                    <Input type="number"   />
                                </FormGroup>
                            </Col>
                            
                            
                            
                        </Row>
                    </CardBody>
                </Card>
                <Row>
                    <Col xs="12" sm="12" md="6">
                        <Card className="my-4">
                            <CardHeader>
                                A. Hasil / Jualan / Perolehan
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" md="12">
                                        <FormGroup>
                                            <FormText>Hasil / Jualan / Perolehan untuk Setahun</FormText>
                                            <Input type="text" value={Number(hasil)} onChange={handleHasil}  />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" md="6">
                        <Card className="my-4">
                            <CardHeader>
                                B. Belanja / Kos
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12"  sm="12" md="12">
                                        <FormGroup>
                                            <FormText>Tolak: Belanja / Kos untuk Setahun</FormText>
                                            <Input type="text" value={Number(tolak)} onChange={handleTolak}  />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
               
                <Row>
                    <Col xs="12" sm="12" md="6">
                        <Card className="my-4">
                            <CardHeader>
                                C. Keuntungan Bersih Setahun [A - B]
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" md="12">
                                        <FormGroup>
                                            <FormText>Jumlah Keuntungan Bersih Setahun</FormText>
                                            <Input type="number" value={Number(aMinusB).toFixed(2)}  disabled  />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" md="6">
                        <Card className="my-4">
                            <CardHeader>
                                Jumlah Zakat Wajib Ditunaikan
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" sm="12" md="12">
                                        <FormGroup>
                                            <FormText>Jumlah Zakat</FormText>
                                            <Input type="number" value={Number(aMinusB).toFixed(2) >=Number(tahunHaul.split('-')[0])? Number(jumlahZakat).toFixed(2) : 0 } disabled  />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs='12'>
                        <Label><b>Sila tekan butang reset sekiranya memasukkan nombor yang baru.</b></Label>
                    </Col>
                </Row>
            <Row className="mb-4">
                <Col>
                    {
                      Number(jumlahZakat).toFixed(2) >0  ? 
                      <Button color="primary" onClick={toggle} className="mr-3">Bayar Zakat</Button>
                      :
                      <Button disabled color="primary" onClick={toggle} className="mr-3">Bayar Zakat</Button>

                    } 
                    {
                        Number(jumlahZakat).toFixed(2) <=0?
                        <Button disabled color="primary"   >
                            simpan
                        </Button>
                        :
                        localStorage.getItem('LOGIN_TOKEN') ?
                        <Button onClick={handleSave}  color="primary" >
                             {
                                loading ? 'simpan...' : 
                                'simpan'
                             }
                        </Button>
                        :
                        null
                    }
                    <Button color="link" onClick={()=>{window.location.reload()}}>Reset</Button>

                </Col>
            </Row>
                
            <Modal isOpen={modal}   toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Bayaran Zakat
                </ModalHeader>
                <ModalBody>
                    <Container className="p-3" >
                        <center>
                            <h4>Pilih amaun bayaran</h4><br/>
                        </center>
                        <div  className="d-flex  justify-content-center">
                           <div className="d-flex justif-content-center flex-column align-items-center">
                                <div onClick={handleTroli} className={classes.firstDiv}>
                                    <div className="p-4 d-flex flex-column jutify-content-center align-items-center">
                                        <h3>{jumlahZakat.toFixed(2)}</h3>
                                        <p>setahun</p>
                                        <small >Zakat yang wajib dibayar (setahun)</small>
                                    </div>
                                </div>
                                <Button style={{width:'80%'}} onClick={handleAnother} color="primary" className="mt-4">Tambah di Troli</Button>
                           </div>
                           <div className="d-flex justif-content-center flex-column align-items-center">
                                <div onClick={handleTerus}  className={classes.secondDiv}>
                                    <div className="p-4 d-flex flex-column jutify-content-center align-items-center">
                                        <h4>Jumlah Lain</h4>
                                        <Input type="number" id="terusbayar" />
                                        <small >Zakat yang wajib dibayar (setahun)</small>
                                    </div>
                                </div>
                                <Button style={{width:'80%'}} onClick={terusBayar} color="primary" className="mt-4 ">Terus Bayar</Button>
                           </div>
                        </div>
                    </Container>
                </ModalBody>
            </Modal>
               
        </Container>
        <Modal isOpen={anotherOpen} centered>
            <ModalBody>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <div className="swal2-success-ring">
                            <div class="w4rAnimated_checkmark">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                                </svg>

                                {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                                <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                                </svg> */}
                            </div>
                            <p className="mt-5 text-center">

                                Kiraan zakat perniagaan telah dimasukkan di dalam Troli. Klik butang Bayar untuk membuat bayaran zakat anda.
                            </p>
                        </div>
                    </div>
                    <div>
                        <Button color="primary" onClick={()=>setAnotherOpen(false)}>Ok</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
        </>
    )
}

export default UntungRugi;