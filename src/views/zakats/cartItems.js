import React, { useEffect,useState } from  'react';
import { useSelector,useDispatch } from 'react-redux';
import {
    Card,CardBody,CardHeader,CardFooter,Container, Row, Col,FormText,Input,FormGroup,Table
} from 'reactstrap'
import { makeStyles } from '@material-ui/core'
import TheNavigation from '../layout/TheNavigation';
import Close from '@material-ui/icons/Delete'
import { deleteFromCart } from '../../redux/action/cartAction'
import { Button } from 'reactstrap';
import { createCollection, createBill ,postPayment} from '../../apis/PostMethod';
import './style.css'
import { getUserToken, isLogin } from '../../utils/LoginAuth';
import { getUserProfile } from '../../apis/GetMethod';
// fafa

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
const CartItems = () =>{
    const classes = useStyles()
    const dispatch = useDispatch();
    let [sum,setSum] = useState(0)
    const [kad,setKad] = useState(true);
    const [polis,setPolis] = useState(false);
    const [passport,setPassport] = useState(false)
    const [show,setShow] = useState(false)
    const state = useSelector(state=>state.cartReducer);
    console.log(state.length)
    const [firstName,setFirstName] = useState('') 
    const [lastName,setLastName] = useState('') 
    const [tel,setTel] = useState(null);
    const [alamat,setAlamat] = useState('');
    const [loading,setLoading] = useState(false) 
    const [troli,setTroli] = useState(true);
    const [terus,setTerus] = useState(false)
    const [data,setData] = useState(null)
    
    useEffect(()=>{
        let s = 0;
        state.forEach(element => {
            s = s + Number(element.total)
        });
        setSum((s))
        getUserProfile(getUserToken()).then(res=>{
            setData(res.results)  
            console.log(res.results)
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

    const handleDelete = (id) =>{
        dispatch(deleteFromCart(id))
        setSum(sum - state.filter(i=>i.id == id)[0].total )
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
        setLoading(true)
        if(isLogin()==false){

            
            createCollection({title:"Zakat Kasih"}).then(res=>{
                createBill({
                    collection_id: res.results.id,
                    email: alamat,
                    name: firstName + " " + lastName,
                    amount: (Number(sum)*100).toFixed(2),
                    callback_url: "https://zakatapi.herokuapp.com/callback",
                    description: "Dana Kasih"
                }).then(doc => {
                const obj = {
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
            
            
        }else{
            
            createCollection({title:"zakat kasih"}).then(res=>{
                createBill({
                    collection_id: res.results.id,
                    email: data[0].email,
                    name: data[0].firstName + " " + data[0].lastName,
                    amount: (Number(sum)*100).toFixed(2),
                    callback_url: "https://zakatapi.herokuapp.com/callback",
                    description: "Dana Kasih"
                }).then(doc => {
                    console.log(doc);
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
                    console.log(error.message);
                })
            }).catch(err=>{
                console.log(err)
            })
        }
    }



    return(
        <>
        <TheNavigation />
        <Container className="container-in-cart my-4">
            <Card className="m-5 card-in-cart">
            <Table style={{overflow:'scroll'}}>
                <thead>
                    <tr>
                    <th>                            
                        Jenis Zakat 
                    </th>
                    <th>
                        Tahun / Haul
                    </th>
                    <th>
                        Jumlah Zakat (RM)
                    </th>
                    <th>Action</th>
                    </tr>
                </thead>
                {
                    state.length>0 ? 
                    <tbody>
                        {
                            state.map(state=>(
                                <tr >
                                    <td>
                                        {state.zakatName} 
                                    </td>
                                    <td>{(state.tahunHaul)} </td>
                                    <td>    
                                        <span >
                                        {(Number(state.total).toFixed(2))} 
                                        </span>
                                    </td>
                                    <td>
                                        <Close fontSize="small" onClick={()=>handleDelete(state.id)} style={{cursor:'pointer',margin:'0px 5px',color:'red'}}></Close>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    :
                    <>
                        {/* <p className="ml-5 mr-5 mt-3">Kira Zakat terlebih dahulu</p> */}
                    </>

                }
            </Table>
            <CardFooter>
                <div className="d-flex justify-content-between">
                    <td>
                        <b>JUMLAH ZAKAT</b>
                    </td>
                    <td>
                        <b>
                            {Number(sum).toFixed(2)}
                        </b>
                    </td>
                </div>
            </CardFooter>
            </Card>
        </Container>
    
        <Container className="container-in-cart my-4">
            
            {
            !isLogin() ? 
            
            <Card className="card-in-cart m-5">
                <CardBody>
                <Row className="mb-2">
                    <Col xs="12" sm="12" md="4"  >
                        <p className="m-2">Jenis Pengenalan </p>
                    </Col>
                    
                    <Col xs="12" sm="12" md="8" className="d-flex justify-content-between">
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
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">No. KP (Baru) *</p>
                        </Col>
                        <Col xs="12" sm="12" md="3">
                            <Input onChange={handleInput} aria-describedby="kad-text"  id="kad" type="number"  />
                        </Col>
                        <Col xs="12" sm="12" md="5">
                        </Col>
                        <Col xs="12" sm="12" md="4">
                        </Col>
                        <Col xs="12" sm="12" md="8">
                            <small id="kad-text" class="form-text text-muted">Sila masukkan no. kad pengenalan baru. No. kad pengenalan ini akan digunakan sebagai Id Pengguna anda.</small>
                        </Col>
                        </>
                        :
                        kad == false && polis==true && passport==false ? 
                        <>
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">No. Polis/Tentera *</p>
                        </Col>
                        <Col xs="12" sm="12" md="3">
                            <Input onChange={handleInput} aria-describedby="polis-text"  id="polis" type="number"  />
                        </Col>
                        <Col xs="12" sm="12" md="5">
                        </Col>
                        <Col xs="12" sm="12" md="4">
                        </Col>
                        <Col xs="12" sm="12" md="8">
                            <small id="polis-text" class="form-text text-muted">Sila masukkan no. polis/tentera. No. polis/tentera ini akan digunakan sebagai Id Pengguna anda.</small>
                        </Col>            
                        </>            
                        :
                        kad == false && polis==false && passport==true ? 
                        <>
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">No. Passport *</p>
                        </Col>
                        <Col xs="12" sm="12" md="3">
                            <Input onChange={handleInput} aria-describedby="passport-text"  id="passport" type="number"  />
                        </Col>
                        <Col xs="12" sm="12" md="5">
                        </Col>
                        <Col xs="12" sm="12" md="4">
                        </Col>
                        <Col xs="12" sm="12" md="8">
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
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">
                                Nama *
                            <br/>
                            <small>(First Name) </small>
                            </p>
                        </Col>
                        <Col xs="12" sm="12" md="6" className="mt-3">
                            <Input onChange={handleFirstName} type="text" id="fname" aria-describedby="fname-text" />
                            <small id="fname-text" class="form-text text-muted">Sila masukkan nama anda.</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">
                                Nama Keluarga *
                            <br/>
                            <small>(Last Name) </small>
                            </p>
                        </Col>
                        <Col xs="12" sm="12" md="6" className="mt-3">
                            <Input onChange={handleLastName} type="text" id="lname" aria-describedby="lname-text" />
                            <small id="lname-text" class="form-text text-muted">Sila masukkan Nama Keluarga anda.</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">
                                Alamat Emel *
                            </p>
                        </Col>
                        <Col xs="12" sm="12" md="6" className="mt-3">
                            <Input onChange={handleAlamat} type="email" id="alamat" aria-describedby="alamat-text"  />
                            <small id="alamat-text" class="form-text text-muted">Sila masukkan alamat emel. Gunakan alamat emel yang aktif untuk penerimaan resit bayaran..</small>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" sm="12" md="4">
                            <p className="m-2">
                                No. Telefon Mudah Alih *
                            </p>
                        </Col>
                        <Col xs="12" sm="12" md="3" className="mt-3">
                            <Input onChange={handleTelefone} type="number" aria-describedby="telefon"  />
                        </Col>
                        <Col xs="12" sm="12" md="5">
                        </Col>
                        <Col xs="12" sm="12" md="4">
                        </Col>
                        <Col xs="12" sm="12" md="8">
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
            {
            state.length >0?
            
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
                                {/* <div className="d-flex justify-content-center"> 
                                    <div onClick={handleTroli} className={classes.firstDiv}>
                                        <img height="100" src={FPX} />                                   
                                    </div>
                                    <div onClick={handleTerus}  className={classes.secondDiv}>
                                        <img height="100" src={MIGS } />
                                    </div>
                                </div> */}
                                {
                                    troli?
                                    <>
                                    <p className="text-center">
                                        Inilah wang  {" "}
                                        <b>
                                        RM
                                        {
                                            Number(sum).toFixed(2)
                                        }
                                        {" "}
                                        </b>
                                        sebagai menunaikan zakat yang wajib ke atas diri saya kerana Allah Ta'ala.
                                    </p>
                                    <center>
                                        <Button onClick={BillCreate}  style={{width:'70%'}} color="success" aria-describedby="sila">{ loading ? "mohon tunggu..." : "Lanjutkan ke pembayaran" } </Button>
                                        <br/>
                                        <small id="sila">
                                            Dengan menekan butang    Bayar Zakat Sekarang, anda bersetuju dengan <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp">Terma dan Syarat FPX.</a> 
                                        </small>
                                    </center>
                                    </>
                                    :
                                    null
                                }
                                {/* {
                                    terus?
                                    <>
                                    <p className="text-center">
                                        Inilah wang  {" "}
                                        <b>
                                        RM
                                        {
                                        sum
                                        }
                                        {" "}
                                        </b>
                                        sebagai menunaikan zakat yang wajib ke atas diri saya kerana Allah Ta'ala.
                                    </p>
                                    <center>
                                    <Button onClick={BillCreate}  style={{width:'70%'}} color="success" aria-describedby="sila">{ loading ? "mohon tunggu..." : "Lanjutkan ke pembayaran" } </Button>
                                     <br/>
                                    </center>
                                    </>
                                    :
                                    null
                                } */}
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
                                Number(sum).toFixed(2)
                            }
                            {" "}
                            </b>
                            sebagai menunaikan zakat yang wajib ke atas diri saya kerana Allah Ta'ala.
                        </p>
                        <center>
                            <Button onClick={BillCreate}  style={{width:'70%'}} color="success" aria-describedby="sila">{ loading ? "mohon tunggu..." : "Lanjutkan ke pembayaran" } </Button>
                            <br/>
                            <small id="sila">
                                Dengan menekan butang    Bayar Zakat Sekarang, anda bersetuju dengan <a href="https://www.mepsfpx.com.my/FPXMain/termsAndConditions.jsp">Terma dan Syarat FPX.</a> 
                            </small>
                        </center>
                    </>
                    </CardBody>
                }
                </Card>
            :
            null
            }
        </Container>
        </>
    )
}

export default CartItems