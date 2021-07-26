// This is the gold zakat page
import React, { useEffect, useState } from 'react';
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
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label
} from 'reactstrap';
import Info from '@material-ui/icons/Info'
import { makeStyles,Collapse,Fade } from '@material-ui/core'
import { getValues } from '../../../apis/GetMethod'

import TheNavigation from '../../layout/TheNavigation';
import '../style.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartAction } from '../../../redux/action/cartAction';
import { useHistory } from 'react-router';
import compare from '../compare';
import { saveCollection } from '../../../apis/PostMethod';
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

const Kwsp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state=>state.cartReducer);
    const [message,setMessage] = useState('')
    const [msg,setMsg] = useState(false)
    const [tahunHaul,setTahunHaul] = useState("0-0")
    const [jenisPengeluaran,setJenisPengeluaran] = useState('')
    const [jumlahLayak,setJumlahLayak] = useState(0)
    const [diZakat,setDiZakat] = useState(0)
    const [modal, setModal] = useState(false);
    const [anotherOpen, setAnotherOpen] = useState(false);
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false)
    const [second,setSecond] = useState('')
    const [anotherSelect,setAnotherSelect] = useState(false)
    useEffect(()=>{
        getValues().then(res=>{
            console.log(res.results)
            setData(res.results)
            setTahunHaul(res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].first_value+"-"+res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].key_value)
          }).catch(err=>console.log(err))
    },[])

    const handleSecond = (e) =>{
        setSecond(e.target.value)
        console.log(e.target.value)
        if (e.target.value=='asas') {
            setDiZakat(0)
            console.log("This is the message")
            setMessage('Jenis pengeluaran ini tidak dikenakan zakat')
            setMsg(true)
        }else{
            setMessage('')
            setMsg(false)
            if (jumlahLayak >=Number(tahunHaul.split('-')[0])){
                setDiZakat(jumlahLayak)
            }else{
                setDiZakat(0)   
            }
        

        }


    }


    const handleSave = () =>{
        setLoading(true)

        const obj = {
            userId: JSON.parse(localStorage.getItem('LOGIN_TOKEN')),
            zakatListId : 4,
            jsonObject: JSON.stringify({name:{zakatName:'Zakat KWSP',tahunHaul:tahunHaul.split('-')[1],total:diZakat/40}})
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
            dispatch(cartAction({zakatName:'Zakat KWSP',tahunHaul:tahunHaul.split('-')[1],total:tbayar}))
            setAnotherOpen(!anotherOpen)
            setModal(false)

        }else{
            dispatch(cartAction({zakatName:'Zakat KWSP',tahunHaul:tahunHaul.split('-')[1],total:diZakat/40}))
            setAnotherOpen(!anotherOpen)
            setModal(false)
        }
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
    
    const handleJumlahLayak = (e) =>{
        
        setJumlahLayak(e.target.value)
        if (jenisPengeluaran=='pendidikan' || jenisPengeluaran=='kesihatan' || jenisPengeluaran=='haji' || second=='asas' ) {
            // console.log(e.target.value)
            setDiZakat(0)
        }else{

                if (e.target.value >= Number(tahunHaul.split('-')[0])) {
                    // console.log('greater',Number(tahunHaul.split('-')[0]))
                    setDiZakat((e.target.value))   
                }else{
                    setDiZakat(0)   

                }
        
    }
    }

    const handleJenisPengeluaran = (e) =>{
        
        setJenisPengeluaran(e.target.value)
        if (e.target.value=='pendidikan' || e.target.value=='kesihatan' || e.target.value=='haji' || e.target.value =='hilang_upaya' ) {
            setDiZakat(0)
            setMessage('Jenis pengeluaran ini tidak dikenakan zakat')
            setMsg(true)
            document.querySelector('#anotherSelect').classList.remove('d-block')

            // console.log(e.target.value)   
        }else{
            if(e.target.value=='perumahan'){
                document.querySelector('#anotherSelect').classList.add('d-block')
                setAnotherSelect(true)
                setMessage('')
                setMsg(false)

            }else{
                document.querySelector('#anotherSelect').classList.remove('d-block')
                setAnotherSelect(false)
                setMessage('')
                setMsg(false)
                if (jumlahLayak >=Number(tahunHaul.split('-')[0])){
                    setDiZakat(jumlahLayak)
                }else{
                    setDiZakat(0)   
                }
            }

        }


    }


    const handleTahunHaul=(e)=>{
      
        setTahunHaul(e.target.value)
        if (jenisPengeluaran=='pendidikan' || jenisPengeluaran=='kesihatan' || jenisPengeluaran=='haji' ) {
            setDiZakat(0)
            console.log(e.target.value)   
        }else{
            if (jumlahLayak >=Number(tahunHaul.split('-')[0])){
                setDiZakat(jumlahLayak)
            }else{
                setDiZakat(0)   
            }
        }


    }

    const terusBayar = () =>{
        let tbayar = document.getElementById('terusbayar').value
        if(tbayar){
            history.push('/singleCartItem',[{zakatName:'Zakat KWSP',tahunHaul:tahunHaul.split('-')[1],total:tbayar}])
        }else{
            history.push('/singleCartItem',[{zakatName:'Zakat KWSP',tahunHaul:tahunHaul.split('-')[1],total:diZakat/40}])
        }
    }


    return (
        <>
        <TheNavigation />
        
        <Container className="py-4">
            <Form>
                <Card className="my-4">
                    <CardHeader>
                        Kiraan Zakat KWSP
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col  xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Tahun / Haul</FormText>
                                    <Input value={tahunHaul} onChange={handleTahunHaul} type="select">
                                        <option selected disabled>Please Select</option>
                                        {
                                            data ? data.filter(i=>i.title=="tahun-amaunNisab").sort(compare).map(i=>(
                                            <option value={i.first_value+"-"+i.key_value}>
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
                    Maklumat KWSP
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>
                                        Jenis Pengeluaran
                                    </FormText>
                                    
                                    <Input value={jenisPengeluaran} onChange={handleJenisPengeluaran} type="select">
                                        <option value="1juta">Simpanan melebihi RM1 juta</option>
                                        <option value="umur50">Umur mencapai 50 tahun</option>
                                        <option value="umur55">Umur mencapai 55 tahun</option>
                                        <option value="umur60">Umur mencapai 60 tahun</option>
                                        <option value="tinggal_negara">Meninggalkan negara (hilang kerakyatan)</option>
                                        <option value="pencen">Pekerja pencen &amp; pesara pilihan</option>
                                        <option value="pendidikan">Pendidikan</option>
                                        <option value="kesihatan">Kesihatan</option>
                                        <option value="perumahan">Pembiayaan perumahan</option>
                                        <option value="hilang_upaya">Hilang upaya</option>
                                        <option value="haji">Menunaikan haji</option>
                                    </Input>

                                </FormGroup>

                            </Col>

                            <Col id="anotherSelect" className="d-none" xs="12" sm="12" md="4" >
                                    <Fade in={anotherSelect}>
                                        <FormGroup>
                                            <FormText>
                                            Sebab Pengeluaran
                                            </FormText>
                                            
                                            <Input value={second} onChange={handleSecond} type="select">
                                                <option value="pelaburan">Pelaburan</option>
                                                <option value="asas">Keperluan asas</option>
                                                
                                            </Input>

                                        </FormGroup>
                                    </Fade>
                            </Col>
                           
                            <Col xs="12" sm="12" md="4" >
                                <FormGroup>
                                    <FormText>Jumlah Layak Dikeluarkan</FormText>
                                    <Input type="number " id="jumlahLayak" value={Number(jumlahLayak).toFixed(2)} onChange={handleJumlahLayak}   />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Collapse in={msg} className="text-success" id="info" >
                          <div className="d-flex align-items-center p-2">
                            <Info fontSize="small" /> 
                            <span >
                                {message}
                            </span>
                          </div>
                        </Collapse>
                    </CardBody>

                </Card>
                
                <Card className="my-4">
                    <CardHeader>
                        Jumlah Zakat KWSP        
                    </CardHeader>
{/*  pushing */}
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Jumlah Layak Di Zakat</FormText>
                                    <Input type="number" value={ Number(diZakat).toFixed(2) } disabled />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Jumlah Zakat</FormText>
                                    <Input type="number" value={ Number(diZakat/40).toFixed(2)} disabled />
                                </FormGroup>
                            </Col>


                        
                        </Row>
                    </CardBody>

                    <Row>
                    <Col xs='12'>
                        <Label><b>Sila tekan butang reset sekiranya memasukkan nombor yang baru.</b></Label>
                    </Col>
                </Row>
                </Card>
                {
                    Number(diZakat/40).toFixed(2) == 0 ?
                    <Button color="primary" disabled onClick={toggle} className="mr-3">Bayar Zakat</Button>
                    :
                    <Button color="primary"  onClick={toggle} className="mr-3">Bayar Zakat</Button>

                }
                {
                    Number(diZakat/40).toFixed(2)  == 0 ?
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
            </Form>
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
                                        <h3>{(diZakat/40).toFixed(2)}</h3>
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
                        <Button color="primary" onClick={()=>setAnotherOpen(!anotherOpen)}>Ok</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
        </>
    )
}
export default Kwsp
