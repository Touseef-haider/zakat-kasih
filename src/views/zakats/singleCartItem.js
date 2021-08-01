import React, { useEffect,useState } from  'react';
import { useSelector,useDispatch } from 'react-redux';
import {
    Card,CardBody,CardHeader,CardFooter,Container, Row, Col,FormText,Input,FormGroup
} from 'reactstrap'
import { makeStyles } from '@material-ui/core'
import TheNavigation from '../layout/TheNavigation';
import Close from '@material-ui/icons/Delete'
import { deleteFromCart } from '../../redux/action/cartAction'
// import FPX from '../../assets/fpx.png'
// import MIGS from '../../assets/migs.png'
import { Button } from 'reactstrap';
import { createCollection, createBill,postPayment } from '../../apis/PostMethod';
import './style.css'
import { getUserToken, isLogin } from '../../utils/LoginAuth';
import { getUserProfile } from '../../apis/GetMethod';

const useStyles = makeStyles((theme)=>({
    firstDiv:{
        margin:'10px',
        border:'2px solid blue'
    },
    secondDiv:{
        margin:'10px',   
        opacity:'0.5',
        border:'2px solid grey'

    }
}))
const SingleCartItem = (props) =>{
    const classes = useStyles()
    const [sum,setSum] = useState(0)
    const [kad,setKad] = useState(true);
    const [polis,setPolis] = useState(false);
    const [passport,setPassport] = useState(false)
    const [show,setShow] = useState(false)
    const [firstName,setFirstName] = useState('') 
    const [lastName,setLastName] = useState('') 
    const [tel,setTel] = useState(null);
    const [alamat,setAlamat] = useState(''); 
    const [troli,setTroli] = useState(true);
    const [terus,setTerus] = useState(false)
    const [loading,setLoading] = useState(false)

    const [data,setData] = useState(null)
    useEffect(()=>{
        getUserProfile(getUserToken()).then(res=>{
            setData(res.results)  
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const handleFirstName = (e) =>{
        setFirstName(e.target.value)
    }
   
    const handleLastName = (e) =>{
        setLastName(e.target.value)
    }
   
    const handleTelefone = (e) =>{
        setTel(e.target.value)
    }
   
    const handleAlamat = (e) =>{
        setAlamat(e.target.value)
    }

    const handleDelete = () =>{

    }

    const handleRadio = (e) =>{
        if(e.target.name=='kad'){
            setKad(!kad)
            setPolis(false)
            setPassport(false)
        }
        else if(e.target.name=='polis'){
            setPolis(!polis)
            setKad(false)
            setPassport(false)
        }
        else{
            setPolis(false)
            setKad(false)
            setPassport(!passport)
        }
    }

    const handleInput = (e) =>{
        if (e.target.value) {
            setShow(true)
        }
        else{
            setShow(false)
        }
    }

    const handleTerus = (e)=>{
        document.querySelector(`.${classes.firstDiv}`).style.opacity = '0.5';
        document.querySelector(`.${classes.firstDiv}`).style.border = '2px solid grey';
        document.querySelector(`.${classes.secondDiv}`).style.opacity = '1';
        document.querySelector(`.${classes.secondDiv}`).style.border = '2px solid blue';
        setTerus(!terus)
        setTroli(false)
    }

    const handleTroli = (e)=>{
        document.querySelector(`.${classes.secondDiv}`).style.opacity = '0.5';
        document.querySelector(`.${classes.secondDiv}`).style.border = '2px solid grey';
        document.querySelector(`.${classes.firstDiv}`).style.opacity = '1';
        document.querySelector(`.${classes.firstDiv}`).style.border = '2px solid blue';
        setTroli(!troli)
        setTerus(false)

    }
    const BillCreate = () => {
        console.log("clicked")
        setLoading(true)
        if(isLogin()==false){
    
            
            createCollection({title:props.location.state[0].zakatName}).then(res=>{
                createBill({
                    collection_id: res.results.id,
                    email: alamat,
                    name: firstName + " " + lastName,
                    amount: (Number(props.location.state[0].total)*100).toFixed(2),
                    callback_url: "https://zakatapi.herokuapp.com/callback",
                    description: "Dana Kasih"
                }).then(doc => {
                    console.log(doc)
                    if (doc.results.error)
                        alert(doc.results.error.message[0])
                    console.log(JSON.stringify(doc));
                    const obj = {
                        // user_id:localStorage.getItem('LOGIN_TOKEN'),
                        json_object: JSON.stringify({key:doc.results})
                    }
                    postPayment(obj).then(res=>{
                        console.log(res)
                        if(res.results.code==1){
                            setLoading(false)
                            window.open(doc.results.url,'_blank')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }).catch(error => {
                    console.log(error);
                })
            }).catch(err=>{
                console.log(err)
            })


            
        }else{

            console.log(Number(props.location.state[0].total).toFixed(2) * 100)
            const tempAmount = Number(props.location.state[0].total).toFixed(2)
            createCollection({title:props.location.state[0].zakatName}).then(res=>{
                createBill({
                    collection_id: res.results.id,
                    email: data[0].email,
                    name: data[0].firstName + " " + data[0].lastName,
                    amount: tempAmount*100,
                    callback_url: "https://zakatapi.herokuapp.com/callback",
                    description: "Dana Kasih"
                }).then(doc => {
                    const obj = {
                        // user_id:localStorage.getItem('LOGIN_TOKEN'),
                        json_object: JSON.stringify({key:doc.results})
                    }
                    postPayment(obj).then(res=>{
                        if(res.results.code==1){
                            setLoading(false)
                            window.open(doc.results.url,'_blank')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }).catch(error => {
                    console.log(error);
                })
            }).catch(err=>{
                console.log(err)
            })

           
        }
    }


    return(
        <>
        <TheNavigation />
        <Container className="container-in-cart mt-4">
            <Card className="card-in-cart m-5">
                <CardHeader>
                    <div className="d-flex justify-content-between" >
                        <td>
                            <b>Jenis Zakat</b> 
                        </td>
                        <td>
                            <b>
                                Tahun / Haul
                            </b>
                        </td>
                        <td>
                            <b>
                                Jumlah Zakat (RM)
                            </b>
                        </td>
                        
                    </div>
                </CardHeader>
                <CardBody>
                        {
                            props.location.state ? props.location.state.map(state=>{
                                return <div className="d-flex align-items-center justify-content-between">
                                    <td>
                                        {state.zakatName} 
                                    </td>
                                    <td>
                                        {(state.tahunHaul)} 
                                    </td>
                                    <td>
                                        <span >
                                            {Number(state.total).toFixed(2)} 
                                        </span>
                                    </td>

                                </div>
                            })
                            :
                            <p className="text-center">Nothing To Show</p>
                        }
                </CardBody>
                <CardFooter>
                        <div className="d-flex justify-content-between">
                            <td>
                                <b>JUMLAH ZAKAT</b>
                            </td>
                            <td>
                                {
                                    props.location.state.map(i=>(
                                        <span style={{marginRight:'20px'}}>
                                            <b>
                                            {
                                              (Number(sum + Number(i.total)).toFixed(2))
                                            }
                                            </b>
                                        </span>
                                    ))
                                } 
                            </td>
                        </div>
                </CardFooter>
            </Card>
            {
                !isLogin() ?
            <Card className="card-in-cart m-5">
                <CardBody>
                <Row className="mb-2">
                    <Col xs="12"  sm="12" md="4"  >
                        <p className="m-2">Jenis Pengenalan </p>
                    </Col>
                    
                    <Col xs="12"  sm="12" md="8" className="d-flex justify-content-between">
                        <FormGroup check inline>
                            <FormText check className="mr-3">
                            <Input
                                type="radio"
                                id="kad-radio"
                                name="kad"
                                checked={kad}
                                onChange={handleRadio}
                            />{" "}
                            No. Kad Pengenalan
                            </FormText>
                        </FormGroup>
                        <FormGroup check inline>
                            <FormText check className="mr-3">
                            <Input
                                type="radio"
                                id="polis-radio"
                                name="polis"
                                checked={polis}
                                onChange={handleRadio}
                            />{" "}
                            No. Polis/Tentera   
                            </FormText>
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <FormText check className="mr-3">
                            <Input
                                type="radio"
                                id="passport-radio"
                                name="passport"
                                checked={passport}
                                onChange={handleRadio}
                            />{" "}
                            No. Passport
                            </FormText>
                        </FormGroup>
                        
                    </Col>
                </Row>
                <Row>
                    {
                        kad == true && polis==false && passport==false ? 
                        <>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">No. KP (Baru) *</p>
                        </Col>
                        <Col xs="12"  sm="12" md="3">
                            <Input onChange={handleInput} aria-describedby="kad-text"  id="kad" type="number"  />
                        </Col>
                        <Col xs="12"  sm="12" md="5">
                        </Col>
                        <Col xs="12"  sm="12" md="4">
                        </Col>
                        <Col xs="12"  sm="12" md="8">
                            <small id="kad-text" class="form-text text-muted">Sila masukkan no. kad pengenalan baru. No. kad pengenalan ini akan digunakan sebagai Id Pengguna anda.</small>
                        </Col>
                        </>
                        :
                        kad == false && polis==true && passport==false ? 
                        <>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">No. Polis/Tentera *</p>
                        </Col>
                        <Col xs="12"  sm="12" md="3">
                            <Input onChange={handleInput} aria-describedby="polis-text"  id="polis" type="number"  />
                        </Col>
                        <Col xs="12"  sm="12" md="5">
                        </Col>
                        <Col xs="12"  sm="12" md="4">
                        </Col>
                        <Col xs="12"  sm="12" md="8">
                            <small id="polis-text" class="form-text text-muted">Sila masukkan no. polis/tentera. No. polis/tentera ini akan digunakan sebagai Id Pengguna anda.</small>
                        </Col>            
                        </>            
                        :
                        kad == false && polis==false && passport==true ? 
                        <>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">No. Passport *</p>
                        </Col>
                        <Col xs="12"  sm="12" md="3">
                            <Input onChange={handleInput} aria-describedby="passport-text"  id="passport" type="number"  />
                        </Col>
                        <Col xs="12"  sm="12" md="5">
                        </Col>
                        <Col xs="12"  sm="12" md="4">
                        </Col>
                        <Col xs="12"  sm="12" md="8">
                            <small id="passport-text" class="form-text text-muted">Sila masukkan no. passport. No. passport ini akan digunakan sebagai Id Pengguna anda.</small>
                        </Col>   
                        </>
                        :
                        null
                    }
                </Row>
                {
                    show ?
                    <> 
                    <Row>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">
                                Nama *
                            <br/>
                            <small>(First Name) </small>
                            </p>
                        </Col>
                        <Col xs="12"  sm="12" md="6" className="mt-3">
                            <Input onChange={handleFirstName} type="text" id="fname" aria-describedby="fname-text" />
                            <small id="fname-text" class="form-text text-muted">Sila masukkan nama anda.</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">
                                Nama Keluarga *
                            <br/>
                            <small>(Last Name) </small>
                            </p>
                        </Col>
                        <Col xs="12"  sm="12" md="6" className="mt-3">
                            <Input onChange={handleLastName} type="text" id="lname" aria-describedby="lname-text" />
                            <small id="lname-text" class="form-text text-muted">Sila masukkan Nama Keluarga anda.</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">
                                Alamat Emel *
                            </p>
                        </Col>
                        <Col xs="12"  sm="12" md="6" className="mt-3">
                            <Input onChange={handleAlamat} type="email" id="alamat" aria-describedby="alamat-text"  />
                            <small id="alamat-text" class="form-text text-muted">Sila masukkan alamat emel. Gunakan alamat emel yang aktif untuk penerimaan resit bayaran..</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12"  sm="12" md="4">
                            <p className="m-2">
                                No. Telefon Mudah Alih *
                            </p>
                        </Col>
                        <Col xs="12"  sm="12" md="3" className="mt-3">
                            <Input onChange={handleTelefone} type="number" aria-describedby="telefon"  />
                        </Col>
                        <Col xs="12"  sm="12" md="5">
                        </Col>
                        <Col xs="12"  sm="12" md="4">
                        </Col>
                        <Col xs="12"  sm="12" md="8">
                            <small id="telefon" class="form-text text-muted">Sila masukkan no telefon mudah alih anda.</small>
                        </Col>
                    </Row>    
                    </>   
                    :
                    null
                }
            </CardBody>
            </Card>
            :
            null
            }
            <Card className="card-in-cart m-5">
                <CardHeader>
                    <div className="d-flex ">
                        <h4>
                            Jenis Bayaran 
                        </h4>
                        {/* <img width="40" height="40" src="https://www.zakat2u.com.my/images/fpx-logo.gif" /> */}
                    </div>
                </CardHeader>
                {
                    !isLogin() ? 

                <CardBody>
                    {
                        firstName && lastName && alamat && tel ?
                        <div>
                            <div className="d-flex justify-content-center"> 
                                {/* <div onClick={handleTroli} className={classes.firstDiv}>
                                    <img height="100" src={FPX} />                                   
                                </div>
                                <div onClick={handleTerus}  className={classes.secondDiv}>
                                    <img height="100" src={MIGS } />
                                </div> */}
                            </div>
                            {
                                troli?
                                <>
                                <p className="text-center">
                                    Inilah wang  {" "}
                                    <b>
                                    RM
                                    {
                                    props.location.state.map(i=>(
                                        <span >
                                            {
                                                (Number(i.total).toFixed(2)) 
                                            }
                                        </span>
                                    ))
                                    }
                                    {" "}
                                    </b>
                                    sebagai menunaikan zakat yang wajib ke atas diri saya kerana Allah Ta'ala.
                                </p>
                                <p className="text-center text-muted">
                                    {/* Niat Bayar Zakat */}
                                </p>
                                <center>
                                    <Button onClick={BillCreate} style={{width:'70%'}} color="success" aria-describedby="sila">Sila Pilih Bank</Button>
                                    <br/>
                                    <small id="sila">
                                        Dengan menekan butang    Bayar Zakat Sekarang, anda bersetuju dengan <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp">Terma dan Syarat FPX.</a> 
                                    </small>
                                </center>
                                </>
                                :
                                null
                            }
                            {
                                terus?
                                <>
                                <p className="text-center">
                                    Inilah wang  {" "}
                                    <b>
                                    RM
                                    {
                                    props.location.state.map(i=>(
                                        <span >
                                            {
                                                Number(i.total).toFixed(2)
                                            }
                                        </span>
                                    ))
                                    }
                                    {" "}
                                    </b>
                                    sebagai menunaikan zakat yang wajib ke atas diri saya kerana Allah Ta'ala.
                                </p>
                                <p className="text-center text-muted">
                                    {/* Niat Bayar Zakat */}
                                </p>
                                <center>
                                    <Button onClick={BillCreate} style={{width:'70%'}} color="success" aria-describedby="sila">{ loading ? "mohon tunggu..." : "Lanjutkan ke pembayaran" } </Button>
                                    <br/>
                                    <small id="sila">
                                        Dengan menekan butang    Bayar Zakat Sekarang, anda bersetuju dengan <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp">Terma dan Syarat FPX.</a> 
                                    </small>
                                </center>
                                {/* <cente> */}
                                    {/* <small id="sila">
                                        Dengan menekan butang    Bayar Zakat Sekarang, anda bersetuju dengan <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp">Terma dan Syarat FPX.</a> 
                                    </small> */}
                                {/* </cente> */}

                                </>
                                :
                                null
                            }
                        </div>
                        
                        :
                        <p className="text-center color-red" >
                            Sila isi medan di atas
                        </p>
                    }
                </CardBody>
                :
                <CardBody>
                    <>
                    <p className="text-center">
                        Inilah wang  {" "}
                        <b>
                        RM
                        {
                        props.location.state.map(i=>(
                            <span >
                                {
                                    Number(i.total).toFixed(2)
                                }
                            </span>
                        ))
                        }
                        {" "}
                        </b>
                        sebagai menunaikan zakat yang wajib ke atas diri saya kerana Allah Ta'ala.
                    </p>
                    <p className="text-center text-muted">
                        {/* Niat Bayar Zakat */}
                    </p>
                    <center>
                        <Button onClick={BillCreate} style={{width:'70%'}} color="success" aria-describedby="sila">{ loading ? "mohon tunggu..." : "Lanjutkan ke pembayaran" } </Button>
                        <br/>
                        <small id="sila">
                            Dengan menekan butang    Bayar Zakat Sekarang, anda bersetuju dengan <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp">Terma dan Syarat FPX.</a> 
                        </small>
                    </center>
                    </>
                </CardBody>
                }
            </Card>
        </Container>
        </>
    )
}

export default SingleCartItem