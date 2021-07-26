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
    Table,
    CardFooter,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Label
} from 'reactstrap';
import { Collapse,makeStyles } from '@material-ui/core'
import '../style.css';
import TheNavigation from '../../layout/TheNavigation';
import { Close } from '@material-ui/icons';
import { getValues } from '../../../apis/GetMethod'
import { useDispatch } from 'react-redux'
import { cartAction } from '../../../redux/action/cartAction'
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

const WangSimpanan = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory()
    const [tahunHaul,setTahunHaul] = useState("0-0")
    const [namaBank,setNamaBank] = useState('')
    const [bakiAkaun,setBakiAkaun] = useState(0);
    const [jumlahLayak,setJumlahLayak] = useState(0)
    const [diZakat,setDiZakat] = useState(0)
    const [open,setOpen] = useState(false)
    const [array,setArray] = useState([]);
    const [id,setId] = useState(-1);
    const [totalBakiAkaun,setTotalBakiAkaun] = useState(0)    
    const [modal, setModal] = useState(false);
    const [anotherOpen, setAnotherOpen] = useState(false);
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        getValues().then(res=>{
            console.log(res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare))
            setData(res.results)
            setTahunHaul(res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].first_value+"-"+res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].key_value)
          }).catch(err=>console.log(err))
    },[])

    const handleSave = () =>{
        setLoading(true)
        const obj = {
            userId:JSON.parse(localStorage.getItem('LOGIN_TOKEN')),
            zakatListId : 5,
            jsonObject: JSON.stringify({name:{zakatName:'Zakat Wang Simpanan',tahunHaul:tahunHaul.split('-')[1],total:(diZakat/40).toFixed(2)}})
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
            dispatch(cartAction({zakatName:'Zakat Wang Simpanan',tahunHaul:tahunHaul.split('-')[1],total:tbayar}))
            setModal(false)
            setAnotherOpen(!anotherOpen)

        }else{
            dispatch(cartAction({zakatName:'Zakat Wang Simpanan',tahunHaul:tahunHaul.split('-')[1],total:(diZakat/40).toFixed(2)}))
            setModal(false)
            setAnotherOpen(!anotherOpen)
            
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



    const handleNamaBank = (e)=>{
        setNamaBank(e.target.value)
    }

    const handleBakiAkaun = (e)=>{
        
        setBakiAkaun(e.target.value);
    }
    const handleTambah = ()=>{
        let s='1';
        let n = (tahunHaul.split("-")[0].split('.')[0].length-1);
        console.log(typeof n)
        for (let i = 0; i < n ; i++) {
            s = s + '0';
        }

        let a = [...array];
        setOpen(true)
        let newId = id;
        newId = newId + 1;
        setId(newId)
        a.push({
            id:newId,
            namaBank,
            bakiAkaun
        })
        let newT = totalBakiAkaun;
        newT = newT + Number(bakiAkaun);
        setTotalBakiAkaun(newT)
        if (newT>=Number(tahunHaul.split('-')[0]) ) {
            setDiZakat(newT)
        }
        setArray(a);
        setNamaBank('');
        setBakiAkaun(0)
    }

    const handleRemove = (id) =>{
        let a = [...array];
        let filterArray = a.filter(i=>i.id!=id);
        if (filterArray.length==0) {
            setDiZakat(0)
            setOpen(false)
        } else {
            let dt = totalBakiAkaun - Number(a.filter(i=>i.id==id)[0].bakiAkaun)
            setTotalBakiAkaun(dt)
            setDiZakat(dt)
            setArray(filterArray)
        }
    }
    const handleTahunHaul=(e)=>{
        setTahunHaul(e.target.value)
    }

    const terusBayar = () =>{
        let tbayar = document.getElementById('terusbayar').value
        if(tbayar){
            history.push('/singleCartItem',[{zakatName:'Zakat Wang Sampanan',tahunHaul:tahunHaul.split('-')[1],total:(tbayar)}])
        }else{
            history.push('/singleCartItem',[{zakatName:'Zakat Wang Sampanan',tahunHaul:tahunHaul.split('-')[1],total:(diZakat/40).toFixed(2)}])
        }
    }


    return (
        <>
        <TheNavigation />
        
        <Container className="py-4">
            <Form>
                <Card className="my-4">
                    <CardHeader>
                        Kiraan Zakat Wang Simpanan
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

                            <Col  xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Amaun Nisab</FormText>
                                    <Input type="number" value={Number(tahunHaul.split('-')[0]).toFixed(2)} disabled />
                                </FormGroup>
                            </Col>

                            
                        </Row>
                    </CardBody>
                </Card>

                <Card className="my-4">
                    <CardHeader>
                    Tambah Kiraan Zakat Wang Simpanan
                    </CardHeader>

                    <CardBody>
                        
                                <Row>
                                    <Col xs="12" sm="12" md="6">
                                        <b>Tempat Simpanan (nama Bank , peti besi , asb  etc ...) </b>
                                    </Col>
                                    <Col xs="12" sm="12" md="6">
                                        <b>Baki Akaun</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="12" md="6">
                                        <FormGroup>
                                            <Input type="text" value={namaBank} onChange={handleNamaBank}  />
                                        </FormGroup>
                                    </Col>
                                
                                
                                    <Col xs="12" sm="12" md="3">
                                        <FormGroup>
                                            <Input type="text" value={Number(bakiAkaun)} onChange={handleBakiAkaun} />
                                        </FormGroup>
                                    </Col>
                                
                                
                                    <Col xs="12" sm="12" md="3">
                                        {
                                            bakiAkaun>0 && namaBank!=''?
                                            <Button color="success" onClick={handleTambah}>
                                                Tambah
                                            </Button>
                                            :
                                            <Button disabled color="success" onClick={handleTambah}>
                                                Tambah
                                            </Button>

                                        }
                                    </Col>
                                </Row>
                    </CardBody>

                </Card>
                
                <Collapse in={open}>
                   <Card>
                       <CardHeader>
                            Senarai Wang Simpanan
                       </CardHeader>
                       <CardBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <td>
                                            <b>
                                            Tempat Simpanan (nama Bank , peti besi , asb  etc ...)
                                            </b>
                                        </td>
                                        <td>
                                            <b>
                                                Baki Akaun
                                            </b>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        array ? array.map(i=>(
                                            <tr key={i}>
                                                <td>{i.namaBank}</td>
                                                <td>{Number(i.bakiAkaun).toFixed(2)}</td>
                                                <td><Close style={{color:'red'}} onClick={()=>handleRemove(i.id)} ></Close></td>
                                            </tr>
                                        ))
                                        :
                                        null
                                    }
                                </tbody>
                            </Table>
                       </CardBody>
                       <CardFooter>
                            <Row >
                                <Col xs="12" sm="12" md="8">
                                    <b>JUMLAH</b>
                                </Col>
                                <Col  xs="12" sm="12" md="4">
                                    <FormGroup>
                                        <Input type="number" value={Number(totalBakiAkaun).toFixed(2)} disabled />
                                    </FormGroup>
                            
                                </Col>
                            </Row>
                       </CardFooter>
                   </Card>
                </Collapse>

                <Card className="my-4">
                    <CardHeader>
                    Jumlah Zakat Wang Simpanan     
                    </CardHeader>

                    <CardBody>
                        <Row>
                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Jumlah Layak Di Zakat</FormText>
                                    <Input type="number" value={totalBakiAkaun>=Number(tahunHaul.split('-')[0]).toFixed(2) ?  Number(diZakat).toFixed(2) : 0} disabled />
                                </FormGroup>
                            </Col>

                            <Col xs="12" sm="12" md="4">
                                <FormGroup>
                                    <FormText>Jumlah Zakat</FormText>
                                    <Input type="number" value={Number(diZakat).toFixed(2)>=Number(tahunHaul.split('-')[0]) ? Number(diZakat/40).toFixed(2) : 0 } disabled />
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
                    Number(diZakat/40).toFixed(2) ==0 ? 
                    <Button color="primary" disabled onClick={toggle} className="mr-3">Bayar Zakat</Button>
                    :
                    <Button color="primary"  onClick={toggle} className="mr-3">Bayar Zakat</Button>

                }
                 
                {
                    Number(diZakat/40).toFixed(2) == 0 ?
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
                                <Button style={{width:'80%'}} color="primary" onClick={terusBayar} className="mt-4 ">Terus Bayar</Button>
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

export default WangSimpanan;
