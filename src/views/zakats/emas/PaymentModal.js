import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Container,
    Button,
    Input
} from 'reactstrap';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';



// Material UI styling
const useStyles = makeStyles(() => ({
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



const PaymentModal = (props) => {

    const { total } = props;

    // Calling material UI styling
    const classes = useStyles();

    // History navigation
    const history = useHistory();


    const handleTroli = (e)=>{
        document.querySelector(`.${classes.secondDiv}`).style.opacity = '0.5';
        document.querySelector(`.${classes.secondDiv}`).style.border = '2px solid grey';
        document.querySelector(`.${classes.firstDiv}`).style.opacity = '1';
        document.querySelector(`.${classes.firstDiv}`).style.border = '2px solid blue';
    }


    const terusBayar = () =>{
        history.push('/cart',{zakatName:'Zakat KWSP',tahunHaul,total})
    }


    const handleTerus = (e) => {
        document.querySelector(`.${classes.firstDiv}`).style.opacity = '0.5';
        document.querySelector(`.${classes.firstDiv}`).style.border = '2px solid grey';
        document.querySelector(`.${classes.secondDiv}`).style.opacity = '1';
        document.querySelector(`.${classes.secondDiv}`).style.border = '2px solid blue';
    }


    const handleAnother = () =>{
        dispatch(cartAction({zakatName:'Zakat Emas',tahunHaul,total}))
        setAnotherOpen(!anotherOpen)
        setModal(false);
    }

    return (
        <Container>
        <Modal {...props}>
                <ModalHeader {...props}>
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
                                        <h3>{total}</h3>
                                        <p>setahun</p>
                                        <small >Zakat yang wajib dibayar (setahun)</small>
                                    </div>
                                </div>
                                <Button style={{width:'80%'}}  onClick={handleAnother} color="primary" className="mt-4">Tambah di Troli</Button>
                           </div>
                           <div className="d-flex justif-content-center flex-column align-items-center">
                                <div onClick={handleTerus}  className={classes.secondDiv}>
                                    <div className="p-4 d-flex flex-column jutify-content-center align-items-center">
                                        <h3>Jumlah Lain</h3>
                                        <Input type="number" />
                                        <small >Zakat yang wajib dibayar (setahun)</small>
                                    </div>
                                </div>
                                <Button style={{width:'80%'}} onClick={terusBayar} color="primary" className="mt-4 ">Terus Bayar</Button>
                           </div>
                        </div>
                    </Container>
                </ModalBody>
            </Modal>
        
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
        </Container>
    )
}

export default PaymentModal;