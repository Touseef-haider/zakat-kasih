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
    Label,
} from 'reactstrap';
import { useDispatch } from 'react-redux'
import { Collapse,makeStyles } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import '../style.css'
import { cartAction } from '../../../redux/action/cartAction'
import { getValues } from '../../../apis/GetMethod'


import TheNavigation from '../../layout/TheNavigation';
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

const Emas = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory();
    const [arrayReducer,setArrayReducer] = useState([])
    const [hargaEmas,setHargaEmas] = useState(0)
    const [jenis,setJenis] = useState('Pakai');
    const [berat,setBerat] = useState(0);
    const [jumlahZakat,setJumlahZakat] = useState(0);
    const [nilai,setNilai] = useState(0)
    let  [open,setOpen] = useState(false)
    let  [tahunHaul,setTahunHaul] = useState("0-0-0")
    let [clickCounts,setClickCounts] = useState(-1);
    let [total,setTotal] = useState(0);
    let [emasDisimpan,setEmasDisimpan] = useState(0);
    let [emasDipakai,setEmasDipakai] = useState(0);
    const [modal, setModal] = useState(false);
    const [anotherOpen, setAnotherOpen] = useState(false);
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        getValues().then(res=>{
            console.log(res)
            setData(res.results)
            setTahunHaul(res.results.filter(i=>i.title=="tahun-nilaiUruf-hargaEmas").sort(compare)[0].first_value+"-"+res.results.filter(i=>i.title=="tahun-nilaiUruf-hargaEmas").sort(compare)[0].second_value+"-"+res.results.filter(i=>i.title=="tahun-nilaiUruf-hargaEmas").sort(compare)[0].key_value)
            setHargaEmas(res.results.filter(i=>i.title=="tahun-nilaiUruf-hargaEmas").sort(compare)[0].second_value)
        }).catch(err=>console.log(err))
        
    },[])
    const handleSave = () =>{
        setLoading(true)

        const obj = {
            userId: JSON.parse(localStorage.getItem('LOGIN_TOKEN')),
            zakatListId : 3,
            jsonObject: JSON.stringify({name:{zakatName:'Zakat Emas',tahunHaul:Number(tahunHaul.split('-')[2]),total}})
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
            dispatch(cartAction({zakatName:'Zakat Emas',tahunHaul:Number(tahunHaul.split('-')[2]),total:tbayar}))
            setAnotherOpen(!anotherOpen)
            setModal(false);
        }else{
            dispatch(cartAction({zakatName:'Zakat Emas',tahunHaul:Number(tahunHaul.split('-')[2]),total}))
            setAnotherOpen(!anotherOpen)
            setModal(false);

        }
        console.log((tahunHaul.split("-")[2]))
    }
    const toggle = () => {
          setModal(!modal);  
      }
    const handleJenis = (e) =>{
        setJenis(e.target.value)
        console.log(berat)
        console.log(tahunHaul.split('-')[0])
        console.log(hargaEmas)
        setNilai((hargaEmas * berat));
        setJumlahZakat(e.target.value== 'Simpan' ? berat >= 85 ? (hargaEmas * berat/40) : 0 :   berat >= Number(tahunHaul.split('-')[0]) ? (hargaEmas * berat/40) : 0)
      
    }
    const handleTahunHaul = (e) =>{
        console.log(e.target.value  )
        setHargaEmas(e.target.value.split('-')[1])
        setTahunHaul(e.target.value)
        setBerat(Number(berat))
        setNilai((Number(e.target.value.split('-')[1]) * Number(berat)).toFixed(2));
        setJumlahZakat(jenis== 'Simpan' ? Number(berat) >= 85 ? (Number(e.target.value.split('-')[1]) * (Number(berat).toFixed(2))/40) : 0 :   Number(berat) >= Number(tahunHaul.split('-')[0]) ? (Number(e.target.value.split('-')[1]) * (Number(berat).toFixed(2))/40) : 0)

    }
    

    const handleBerat = (e) =>{
        setBerat(Number(e.target.value))
        setNilai((Number(hargaEmas) * Number(e.target.value)).toFixed(2));
        setJumlahZakat(jenis== 'Simpan' ? Number(e.target.value) >= 85 ? (Number(hargaEmas) * (Number(e.target.value).toFixed(2))/40) : 0 :   Number(e.target.value) >= Number(tahunHaul.split('-')[0]) ? (Number(hargaEmas) * (Number(e.target.value).toFixed(2))/40) : 0)
    }

    const handleRemoveTambahBasesOnId = async (id) =>{
        let arr = [...arrayReducer];
        let elementToDelete = arr.filter(i=>i.count==id);
        if (arr.filter(i=>i.count!=id).length==0) {
            setTotal(0)
            setEmasDisimpan(0)
            setEmasDipakai(0)
            setOpen(false)
        }
        setTotal((total - elementToDelete[0].ui.jumlahZakat).toFixed(2))
        if (elementToDelete[0].ui.jenis == 'Simpan') {
            setEmasDisimpan((emasDisimpan - elementToDelete[0].ui.jumlahZakat))
        }else{
            setEmasDipakai((emasDipakai -  elementToDelete[0].ui.jumlahZakat))
        }
        setArrayReducer(arr.filter(i=>i.count!=id))
        
    }

    const handleTambah = () => {
        setOpen(true);
        let c = clickCounts + 1;
        setClickCounts(c);
        if (jenis == 'Simpan') {
            setEmasDisimpan(((emasDisimpan + jumlahZakat)) )
        }else{
            setEmasDipakai(((emasDipakai + jumlahZakat)))
        }
      
        let arr = [...arrayReducer]
        arr.push({
            count:c,
            ui:{
                tahunHaul:tahunHaul.split('-')[2],
                jenis,
                hargaEmas,
                berat,
                nilai,
                jumlahZakat,
            }
        })
        setArrayReducer(arr)
        console.log(Number(total ))
        console.log(jumlahZakat )
        console.log(Number(total) + jumlahZakat)
        setTotal(Number(total) + jumlahZakat)
        setNilai(0);
        setBerat(0);
        setJumlahZakat(0)
        setJenis('Pakai');
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

    const terusBayar = () =>{
        let tbayar = document.getElementById('terusbayar').value
        if(tbayar){
            history.push('/singleCartItem',[{zakatName:'Zakat Emas',tahunHaul:Number(tahunHaul.split('-')[2]),total:tbayar}])
        }else{
            history.push('/singleCartItem',[{zakatName:'Zakat Emas',tahunHaul:Number(tahunHaul.split('-')[2]),total}])
        }
    }

    return (
        <>
        <TheNavigation />
        
        <Container className="py-4">
            <Form>
                <Card className="my-4">
                    <CardHeader>
                        Kiraan Zakat Emas
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Tahun / Haul</FormText>
                                    <Input value={tahunHaul} onChange={handleTahunHaul} type="select">
                                        <option selected disabled>Please Select</option>
                                        {
                                            data ? data.filter(i=>i.title=="tahun-nilaiUruf-hargaEmas").sort(compare).map(i=>(
                                            <option value={i.first_value+"-"+i.second_value+"-"+i.key_value}>
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
                                    <FormText>Nilai Uruf <strong>{new Date().getFullYear()}</strong></FormText>
                                    <Input type="text" value={ jenis=='Pakai' ?  `${Number(tahunHaul.split('-')[0])} gram` : `85 gram` } disabled />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Harga Emas (RM)</FormText>
                                    <Input type="text" value={Number(hargaEmas).toFixed(2)} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Card className="my-4">
                    <CardHeader>
                        Tambah Kiraan Zakat Emas
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="3">
                                <FormGroup>
                                    <FormText>Berat (gram)</FormText>
                                    <Input type="text" onChange={handleBerat} value={Number(berat)} />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="3">
                                <FormGroup>
                                    <FormText>Jenis</FormText>
                                    <Input onChange={handleJenis} value={jenis} type="select">
                                        <option value="Pakai" > Pakai</option>
                                        <option value="Simpan"> Simpan</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="3">
                                <FormGroup>
                                    <FormText>Nilai (RM)</FormText>
                                    <Input type="number" value={Number(nilai).toFixed(2)} disabled />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="3">
                                <FormGroup>
                                    <FormText>Jumlah Zakat (RM)</FormText>
                                    <Input type="number " id="jumlahZakat" value={Number(jumlahZakat).toFixed(2)}  disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>

                    <CardFooter>
                        {
                            jenis== 'Simpan' ? berat >= 85 ? <Button onClick={handleTambah} color="success" className="float-right">Tambah</Button>  : <Button color="success" disabled className="float-right">Tambah</Button> :  berat >= Number(tahunHaul.split('-')[0]) ? <Button onClick={handleTambah} color="success" className="float-right">Tambah</Button> : <Button disabled color="success" className="float-right">Tambah</Button>
                        }
                    </CardFooter>
                </Card>

                    <Collapse in={open}>
                        <Card>
                            <CardHeader>
                                Senarai Kiraan Zakat Emas
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <td>
                                                Tahun / Haul
                                            </td>
                                            <td>
                                                Jenis
                                            </td>
                                            <td>
                                                Harga (RM)
                                            </td>
                                            <td>
                                                Berat (gram)
                                            </td>
                                            <td>
                                                Nilai Emas (RM)
                                            </td>
                                            <td>
                                                Jumlah Zakat (RM)
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        arrayReducer.length>0 ? arrayReducer.map(item=>(
                                                <tr>
                                                    <td>{String(item.ui.tahunHaul).split('-')[0]}</td>
                                                    <td>{item.ui.jenis}</td>
                                                    <td>{item.ui.hargaEmas}</td>
                                                    <td>{item.ui.berat}</td>
                                                    <td>{item.ui.nilai}</td>
                                                    <td>{Number(item.ui.jumlahZakat.toFixed(2))}</td>
                                                    <td><Close style={{color:'red'}} onClick={()=>handleRemoveTambahBasesOnId(item.count)}></Close></td>
                                                </tr>
                                            ))
                                            :
                                            
                                            null
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Collapse>
                 
                <Card className="my-4">
                    <CardHeader>
                        Jumlah Zakat Emas        
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Emas Dipakai (RM)</FormText>
                                    <Input type="number" value={emasDipakai >=0 ? Number(emasDipakai).toFixed(2) :0 } disabled />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Emas Disimpan (RM)</FormText>
                                    <Input type="number" value={emasDisimpan>=0 ? Number(emasDisimpan).toFixed(2) : 0 } disabled />
                                </FormGroup>
                            </Col>


                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Jumlah Zakat (RM)</FormText>
                                    <Input type="number" value={Number(total).toFixed(2)} disabled />
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
                    total == 0 ?
                    <Button color="primary" disabled className="mr-3">Bayar Zakat</Button>
                    :
                    <Button color="primary" onClick={toggle} className="mr-3">Bayar Zakat</Button>
                }

                {
                    total == 0 ?
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
                                        <h3>{Number(total).toFixed(2)}</h3>
                                        <p>setahun</p>
                                        <small >Zakat yang wajib dibayar (setahun)</small>
                                    </div>
                                </div>
                                <Button style={{width:'80%'}}  onClick={handleAnother} color="primary" className="mt-4">Tambah di Troli</Button>
                           </div>
                           <div className="d-flex justif-content-center flex-column align-items-center">
                                <div onClick={handleTerus}  className={classes.secondDiv}>
                                    <div className="p-4 d-flex flex-column jutify-content-center align-items-center">
                                        <h4>Jumlah Lain</h4>
                                        <Input type="number" id="terusbayar"/>
                                        <small >Zakat yang wajib dibayar (setahun)</small>
                                    </div>
                                </div>
                                <Button style={{width:'80%'}} onClick={terusBayar} color="primary" className="mt-4">Terus Bayar</Button>
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

export default Emas;
