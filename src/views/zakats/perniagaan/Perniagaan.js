// This is the business zakat page
import React from 'react';
import {
    Card,CardHeader,CardBody,CardFooter
} from 'reactstrap';
import {
    makeStyles,Button
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import Calendar from '@material-ui/icons/CalendarToday'
import TheNavigation from '../../layout/TheNavigation';

const styles = makeStyles((theme)=>({
    cHeader:{
        backgroundColor:'purple',
        height:'3px',
        padding:'0px'
    },
    cHeader1:{
        backgroundColor:'orange',
        height:'3px',
        padding:'0px'
    },
    firstIcon:{
        color:'purple',
        fontSize:'60px'
    },
    secondIcon:{
        color:'orange',
        fontSize:'60px'
    },
    flexColumn:{
        [theme.breakpoints.down('md')]:{
            flexDirection:'column'
        }
    },
    fistBtn:{
        backgroundColor:'purple' ,color:'white',padding:'10px 20px',borderRadius:'0',fontSize:'20px',
        '&:hover':{
            backgroundColor:'#6f0a6f'
        }
    },
    secondBtn:{
        backgroundColor:'orange' ,color:'white',padding:'10px 10px',borderRadius:'0',fontSize:'20px',
        '&:hover':{
            backgroundColor:'darkorange'
        }
    }
    
}))

const Perniagaan = () => {
    const classes = styles()
    const history = useHistory();
    return (
        <>
            <TheNavigation/>
            <div className={`${classes.flexColumn} d-flex justify-content-center p-3 mt-4`} >
                <Card className="m-3">
                    <CardHeader className={classes.cHeader} >

                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-column">
                            <center>
                                <Calendar className ={classes.firstIcon}/>
                            </center>
                            <p className="mt-3">
                                Pasar tani, pasar malam, restoran, kedai makan dan lain-lain.
                            </p>
                        </div>
                    </CardBody>
                    <CardFooter className="float-center">
                        <Button onClick={()=>{history.push('/untung-rugi')}} className={`${classes.fistBtn} w-100`}>Kaedah Untung Rugi</Button>
                    </CardFooter>

                </Card>
                <Card className="m-3">
                    <CardHeader className={classes.cHeader1}>

                    </CardHeader>
                    <CardBody>
                        <div className="d-flex flex-column">
                            <center>
                                <Calendar className={classes.secondIcon}/>
                            </center>
                            <p className="mt-3">
                                Pasar tani, pasar malam, restoran, kedai makan dan lain-lain.
                            </p>
                        </div>
                    </CardBody>
                    <CardFooter className="float-center">
                        <Button  onClick={()=>{history.push('/modal-kerja')}}  className={`${classes.secondBtn} w-100`}>Kaedah Modal Kerja</Button>
                    </CardFooter>

                </Card>
            </div>
        </>
    )
}

export default Perniagaan;
