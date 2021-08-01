// This is the income zakat page
import React, { useEffect, useState } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  FormText,
  CardFooter,
} from "reactstrap";
import { Collapse,makeStyles } from "@material-ui/core";
import '../style.css'
import { getValues } from '../../../apis/GetMethod'
import { cartAction } from '../../../redux/action/cartAction'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import compare from '../compare'

import TheNavigation from '../../layout/TheNavigation';
import { saveCollection } from "../../../apis/PostMethod";
import { login } from "../../../utils/LoginAuth";
import { CLabel } from "@coreui/react";
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


const Pendapatan = () => {
  const history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch();
  const [show,setShow] = useState(true)
  const [data,setData] = useState(null)
  const [pandapatan, setPandapatan] = useState(0);
  const [lain, setLain] = useState(0);
  const [tahunanRadio, setTahunanRadio] = useState(false);
  const [bulananRadio, setBulananRadio] = useState(false);
  const [pendapatanBulanan, setPendapatanBulanan] = useState(0);
  const [pandapatanTahunan, setPandapatanTahunan] = useState(0);
  const [
    ownValueOfPandapatanTahunan,
    setOwnValueOfPandapatanTahunan,
  ] = useState(0);
  
  const [
    ownValueOfPandapatanBulanan,
    setOwnValueOfPandapatanBulanan,
  ] = useState(0);

  const [tahun,setTahun] = useState("0-0")
  const [caruman, setCaruman] = useState(0);
  const [tolakanRadio, setTolakanRadio] = useState(false);
  const [isteri, setIsteri] = useState(0);
  const [anak, setAnak] = useState(0);
  const [anakBelajar, setAnakBelajar] = useState(0);
  const [ibuBapa, setIbuBapa] = useState(0);
  const [isteriMultiplyWith,setIsteriMultiplyWith] = useState(0)
  const [anakMultiplyWith,setAnakMultiplyWith] = useState(0)
  const [anakBelajarMultiplyWith,setAnakBelajarMultiplyWith] = useState(0)
  const [sendri,setSendri] = useState(0);
  const [kwsp,setKwsp] = useState('%');
  const [kwspNum,setKwspNum] = useState(0);
  const [jumlahKeseluruhan,setJumlahKeseluruhan]  = useState(0);
  const [diZakat,setDiZakat]  = useState(0);
  const [jumlahZakatSetahun,setJumlahZakatSetahun]  = useState(0);
  // 
  const [kiraan,setKiraan] = useState(0)
  const [modal, setModal] = useState(false);
  const [anotherOpen, setAnotherOpen] = useState(false);
  const [loading,setLoading] = useState(false)

  const [perb,setPerb] = useState(0)


  const handleAnotherModal = () =>{
      let tbayar = document.getElementById('terusbayar').value
      let year = (data.filter(i=>i.title=="tahun-amaunNisab" && i.first_value == Number(tahun.split('-')[0])).sort()[0].key_value)
      if(tbayar){
        dispatch(cartAction({zakatName:'Zakat Pendapatan',tahunHaul:year,total:tbayar}))
        setModal(false)
        setAnotherOpen(!anotherOpen)
      }else{
        dispatch(cartAction({zakatName:'Zakat Pendapatan',tahunHaul:year,total:(jumlahZakatSetahun).toFixed(2)}))
        setModal(false)
        setAnotherOpen(!anotherOpen)
// 
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


  const handleTolakan = (e) => {
    console.log(e.target)
    if((jumlahKeseluruhan - perb) >= Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan - perb)      
      setJumlahZakatSetahun(((jumlahKeseluruhan - perb)/40) - caruman)
    }else{
      setDiZakat(0)      
      setJumlahZakatSetahun(0)
    }
    setTolakanRadio(true);
  };

  const handleTanpaTolakan = (e) => {
    console.log(e.target)
    if((jumlahKeseluruhan) >= Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan)      
      setJumlahZakatSetahun(((jumlahKeseluruhan/40 ) - caruman))
    }else{
      setDiZakat(0)      
      setJumlahZakatSetahun(0)
    }
    setTolakanRadio(false);
  };

  async function handlePendapatan(e) {
    
    setOwnValueOfPandapatanBulanan(Number(e.target.value))
    await setPandapatan(Number(e.target.value) * 12);
    setJumlahKeseluruhan(Number(e.target.value)*12 + lain)
    setKiraan((Number(e.target.value)*12 ) * (Number(kwspNum) /100))
    let p= Number(Number(data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value) + isteriMultiplyWith + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? ((Number(e.target.value)*12 ) * (kwspNum /100)): kwspNum) )
    setPerb(p)


    if(tolakanRadio){
      console.log(tolakanRadio)
      if(((Number(e.target.value)*12 + lain) - p) >= Number(tahun.split('-')[0])){
        setDiZakat((Number(e.target.value)*12 + lain) - p)      
        setJumlahZakatSetahun((((Number(e.target.value)*12 + lain) - p)/40) - caruman)
      }else{
        setDiZakat(0)      
        setJumlahZakatSetahun(0)
      }
    }
    else if(bulananRadio){
            if ( (Number(e.target.value)*12 + lain) >= Number(tahun.split('-')[0])) {
              console.log('greater')
              setDiZakat(Number(e.target.value)*12 + lain)
              setJumlahZakatSetahun((Number(e.target.value)*12 + lain)/40 - caruman)
            }else{
              console.log('lesser')
              setDiZakat(0)
              setJumlahZakatSetahun(0)
            }
          // else{
          //   setDiZakat(Number(e.target.value)*12 + lain)
          //   setJumlahZakatSetahun((Number(e.target.value)*12 + lain)/40 - caruman)
          // }
      }
    }
  async function handleLain(e) {
    await setLain(Number(e.target.value));
    // setKiraan((pandapatan - Number(e.target.value)) * (Number(kwspNum) /100))
    // let p = Number(Number(data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value) + isteriMultiplyWith + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-e.target.value) * (kwspNum /100)): kwspNum) )
    // setPerb(p)
    if(tolakanRadio){
      console.log(tolakanRadio)
        if (bulananRadio) {
            setJumlahKeseluruhan(ownValueOfPandapatanBulanan*12+ Number(e.target.value))

            if((pandapatan + Number(e.target.value)) >=Number(tahun.split('-')[0])){
              setDiZakat(pandapatan + Number(e.target.value))
              setJumlahZakatSetahun((Number(pandapatan) + Number(e.target.value))/40 - caruman)
              console.log (((Number(pandapatan) + Number(e.target.value)) - caruman)/40)
            }
            else{
              setDiZakat(0)
              setJumlahZakatSetahun(0)
            }
          }
        else{
          setJumlahKeseluruhan((ownValueOfPandapatanTahunan/12) + Number(e.target.value))
          setJumlahKeseluruhan( ownValueOfPandapatanTahunan + Number(e.target.value));
          if((ownValueOfPandapatanTahunan + Number(e.target.value)) >=Number(tahun.split('-')[0])) {
            setDiZakat(ownValueOfPandapatanTahunan + Number(e.target.value)) 
            setJumlahZakatSetahun((((ownValueOfPandapatanTahunan + Number(e.target.value))/40) - caruman) )
          }else{
            setDiZakat(0)
            setJumlahZakatSetahun(0)
          }
        }
        }else{
          if (bulananRadio) {
            setJumlahKeseluruhan(ownValueOfPandapatanBulanan*12+ Number(e.target.value))

            if((pandapatan + Number(e.target.value)) >=Number(tahun.split('-')[0])){
              setDiZakat(pandapatan + Number(e.target.value))
              setJumlahZakatSetahun((Number(pandapatan) + Number(e.target.value))/40 - caruman)
              console.log (((Number(pandapatan) + Number(e.target.value)) - caruman)/40)
            }
            else{
              setDiZakat(0)
              setJumlahZakatSetahun(0)
            }
          }
          else{
            setJumlahKeseluruhan((ownValueOfPandapatanTahunan/12) + Number(e.target.value))
            if((ownValueOfPandapatanTahunan + Number(e.target.value)) >=Number(tahun.split('-')[0])) {
              setDiZakat(ownValueOfPandapatanTahunan + Number(e.target.value)) 
              setJumlahZakatSetahun(((((ownValueOfPandapatanTahunan/12) + Number(e.target.value))/40) - caruman) )
            }else{
              setDiZakat(0)
              setJumlahZakatSetahun(0)
            }
          }
          
    }
    setDiZakat(pandapatan + Number(e.target.value))
    setJumlahZakatSetahun((Number(pandapatan) + Number(e.target.value))/40 - caruman)
   

  }

  const handleCarumanBerzakat = (e) => {
    console.log(diZakat )
    setCaruman(Number(e.target.value) / 40);
      setJumlahZakatSetahun(((diZakat)/40) - (Number(e.target.value) / 40  ))
      console.log((diZakat/40) - (Number(e.target.value) / 40))
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setTahunanRadio(true);
      setBulananRadio(false);
      document.querySelector("#tahunan").disabled = false;
      document.querySelector("#bulanan").disabled = true;
    } else {
      document.querySelector("#tahunan").disabled = true;
      document.querySelector("#bulanan").disabled = false;
    }
  };

  const handlePendapatanTahunan = async (e) => {
   
    setOwnValueOfPandapatanTahunan(Number(e.target.value))
    await setPendapatanBulanan(Number(e.target.value) / 12);
    setJumlahKeseluruhan(Number(e.target.value) + lain);
    setKiraan((Number(e.target.value) ) * (Number(kwspNum) /100))
    let p =Number(Number(data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value) + isteriMultiplyWith + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (((e.target.value) * (Number(kwspNum) /100)) ): kwspNum) )
    setPerb(p)
    console.log(p)
    if(!tolakanRadio){
      if(tahunanRadio){
          if (Number(e.target.value) + lain >= Number(tahun.split('-')[0])) {
            
            setDiZakat((Number(e.target.value)+ lain)) 
            setJumlahZakatSetahun((Number(e.target.value) + lain)/40 - caruman/40)
          }else{
            setDiZakat(0) 
            setJumlahZakatSetahun(0)
  
          }
        }else{
          if(e.target.value >= 100000){
            setDiZakat((Number(e.target.value) + lain)-p)
            setJumlahZakatSetahun((((Number(e.target.value) + lain)-p)/40)-caruman)
          }
          setDiZakat(0)
          setJumlahZakatSetahun(0)
        }
    }
    setDiZakat((Number(e.target.value) + lain))
    setJumlahZakatSetahun((((Number(e.target.value) + lain))/40)-caruman)
  
  };

  useEffect(() => {
    document.querySelector("#tahunan").disabled = true;
    document.querySelector("#bulanan-radio").checked = true;
    document.querySelector("#tahunan-radio").checked = false;
    document.querySelector("#tanpa-radio").checked = true;
    setBulananRadio(true);
    
    setTahunanRadio(false);
    getValues().then( res=>{
      console.log(res.results)
      setData(res.results)
      setTahun(res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].first_value + "-" + res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].key_value)
      // setKiraan(jumlahKeseluruhan * (Number(kwspNum) /100))
      setKwspNum(11)
      setPerb(Number(Number(res.results.filter(i=>i.title=='diriSendiri' && i.key_value==res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].key_value).sort(compare)[0].first_value) + isteriMultiplyWith + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
      // console.log(Number(Number(res.results.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1]).sort(compare)[0].first_value) + isteriMultiplyWith + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))
      // console.log(Number(res.results.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1]))
    }).catch(err=>console.log(err))


  }, []);

  const handleSave = () =>{
    setLoading(true)

    const obj = {
        userId: JSON.parse(localStorage.getItem('LOGIN_TOKEN')),
        zakatListId : 1,
        jsonObject: JSON.stringify({name:{zakatName:'Zakat Pendapatan',tahunHaul:Number(tahun.split('-')[1]),total:(jumlahZakatSetahun/12).toFixed(2)}})
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

  const handleAnother = (e) => {
    if (e.target.checked) {
      setBulananRadio(true);
      setTahunanRadio(false);
      document.querySelector("#tahunan").disabled = true;
      document.querySelector("#bulanan").disabled = false;
    } else {
      document.querySelector("#tahunan").disabled = false;
      document.querySelector("#bulanan").disabled = true;
    }
  };

  // This is the event of the select element
  const handleTahun = (e) =>{
      let year = e.target.value.split('-')[1];
      year <= Number('2016')  ? setShow(false): setShow(true)
      setTahun(e.target.value)
      console.log(e.target.value.split('-')[1]=='2016')
      let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==e.target.value.split('-')[1])[0].first_value:0)
      setPerb(Number(d + isteriMultiplyWith + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
     
      if(tahunanRadio){
        if(Number(ownValueOfPandapatanTahunan) >= Number(e.target.value.split('-')[0]) || lain >= Number(e.target.value.split('-')[0])) {
          setDiZakat(Number(ownValueOfPandapatanTahunan)+ lain) 
          setJumlahZakatSetahun((Number(ownValueOfPandapatanTahunan) + lain)/40 - caruman/40)
        }else{
          setDiZakat(0)
          setJumlahZakatSetahun(0)
        }
      }
      else{
          if (Number( ownValueOfPandapatanBulanan ) >= Number(e.target.value.split('-')[0]) || lain >=Number(e.target.value.split('-')[0])  ) {
                setDiZakat(Number(ownValueOfPandapatanBulanan)*12 + lain)
                setJumlahZakatSetahun((Number(ownValueOfPandapatanBulanan)*12 + lain)/40 - caruman)
          }else{
                setDiZakat(0)
                setJumlahZakatSetahun(0)
          }
      }
  }
  //   *
  const handleIsteri = (e) =>{
    let fIsteriValue = data?data.filter(i=>i.title=='isteri' && i.key_value==(tahun.split('-')[1])):0;
    
    console.log(Number(fIsteriValue[0].first_value))
    setIsteri(Number(e.target.value))
    setIsteriMultiplyWith(Number(e.target.value)*Number(fIsteriValue[0].first_value));
    console.log(Number(e.target.value)*Number(fIsteriValue[0]));
    let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value:0)
    setPerb(Number(d + Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
    if((jumlahKeseluruhan - Number(d + Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))>=Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan - Number(d + Number(e.target.value)*Number(fIsteriValue[0].first_value)+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))      
      setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + Number(e.target.value)*Number(fIsteriValue[0].first_value)+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))/40) - caruman)
    }else{
      setDiZakat(0)
      setJumlahZakatSetahun(0)
    }
    console.log( (d +  Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + sendri  ))
    console.log(Number(e.target.value)*Number(fIsteriValue[0].first_value))
  }

  //   *
  const handleAnak = (e) =>{
    let fIsteriValue = data?data.filter(i=>i.title=='anak-tahun' && i.key_value==(tahun.split('-')[1])):0;

    setAnak(Number(e.target.value))
    setAnakMultiplyWith(Number(e.target.value)*Number(fIsteriValue[0].first_value))
    let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value:0)
    setPerb( ( d + isteriMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
    if((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))>=Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan - Number(d + isteriMultiplyWith+ Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))      
      setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))/40) - caruman)
    }else{
      setDiZakat(0)
      setJumlahZakatSetahun(0)
    }
    
    console.log( (data ? Number(data.filter(i=>i.title=='diriSendiri')[0].first_value):0 + isteriMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + anakBelajarMultiplyWith + ibuBapa + sendri + Number(kwsp=='%' ? (kwspNum * (12/10)): kwspNum) ))


  }

  //   *
  const handleAnakBelajar = (e) =>{
    
    let fIsteriValue = data?data.filter(i=>i.title=='anak-belajar' && i.key_value==(tahun.split('-')[1])):0;
    console.log("FFFF",fIsteriValue)
    setAnakBelajar(Number(e.target.value))
    setAnakBelajarMultiplyWith(Number(e.target.value)*Number(fIsteriValue[0].first_value))
    
    let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value:0)
    setPerb( (d + isteriMultiplyWith + anakMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + ibuBapa + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
    if((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))>=Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))      
      setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))/40) - caruman)
    }else{
      setDiZakat(0)
      setJumlahZakatSetahun(0)
    }
    
    console.log( (data ? Number(data.filter(i=>i.title=='diriSendiri')[0].first_value):0 + isteriMultiplyWith + anakMultiplyWith + Number(e.target.value)*Number(fIsteriValue[0].first_value) + ibuBapa + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))

  }

  //   *
  const handleIbuBapa = (e) =>{
    setIbuBapa(Number(e.target.value))
    let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value:0)
    setPerb( (d + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ Number(e.target.value) + sendri + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
    if((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + Number(e.target.value) + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))>=Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + Number(e.target.value) + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))      
      setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + Number(e.target.value) + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))/40) - caruman)
    }else{
      setDiZakat(0)
      setJumlahZakatSetahun(0)
    }
    
    
    console.log( (data ? Number(data.filter(i=>i.title=='diriSendiri')[0].first_value):0 + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ Number(e.target.value) + sendri + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))
    
  }

  //   *
  const handleSendri = (e) =>{
    if (e.target.value<=2000) {
      setSendri(Number(e.target.value))
      let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1] )[0].first_value:0)
      setPerb( (d + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ ibuBapa + Number(e.target.value) + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (kwspNum /100)): kwspNum) ))
      if((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + Number(e.target.value) + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))>=Number(tahun.split('-')[0])){
        setDiZakat(jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + Number(e.target.value) + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))      
        setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + Number(e.target.value) + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))/40) - caruman)
      }else{
        setDiZakat(0)
        setJumlahZakatSetahun(0)
      }
      
      
    
      console.log( (data ? Number(data.filter(i=>i.title=='diriSendiri')[0].first_value):0 + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ ibuBapa + Number(e.target.value) + Number(kwsp=='%' ? (jumlahKeseluruhan * (kwspNum /100)): kwspNum) ))

    }
  }
  
  //   *
  const handleKwsp = (e) =>{
    setKwsp(e.target.value)
    let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value:0)

    if (e.target.value==='%') {
      if(ownValueOfPandapatanBulanan >=0 ){
        setKiraan((jumlahKeseluruhan) * (Number(kwspNum) /100))
        setPerb( (d + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ ibuBapa + Number(e.target.value=='%' ? ((jumlahKeseluruhan-lain) * (Number(kwspNum) /100)): Number(kwspNum)) ))
      }else{
        setKiraan(0)
      }
    } else {
      setPerb( (d + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ ibuBapa + Number(e.target.value=='%' ? ((jumlahKeseluruhan-lain) * (Number(kwspNum) /100)): Number(kwspNum)) ))
      setKiraan(kwspNum)
      setDiZakat(jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa  + Number(e.target.value=='%' ?  (jumlahKeseluruhan * (Number(kwspNum) /100)): Number(kwspNum)) ))      
      setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + Number(e.target.value=='%' ? (jumlahKeseluruhan * (Number(kwspNum) /100)): Number(kwspNum)) ))/40) - caruman)
    
    }

  }

  //   *
  const handleKwspNum = (e) =>{
    setKwspNum(e.target.value)
    
    let d = Number(data ? data.filter(i=>i.title=='diriSendiri' && i.key_value==tahun.split('-')[1])[0].first_value:0)
    setPerb( (d + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ ibuBapa + Number(kwsp=='%' ? ((jumlahKeseluruhan-lain) * (Number(e.target.value) /100)): Number(e.target.value)) ))
    if((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa  + Number(kwsp=='%' ?  (jumlahKeseluruhan * (Number(e.target.value) /100)): Number(e.target.value)) ))>=Number(tahun.split('-')[0])){
      setDiZakat(jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa  + Number(kwsp=='%' ?  (jumlahKeseluruhan * (Number(e.target.value) /100)): Number(e.target.value)) ))      
      setJumlahZakatSetahun(((jumlahKeseluruhan - Number(d + isteriMultiplyWith+ anakMultiplyWith + anakBelajarMultiplyWith + ibuBapa + Number(kwsp=='%' ? (jumlahKeseluruhan * (Number(e.target.value) /100)): Number(e.target.value)) ))/40) - caruman)
    }else{
      setDiZakat(0)
      setJumlahZakatSetahun(0)
    }
    
    
    console.log( (data ? Number(data.filter(i=>i.title=='diriSendiri')[0].first_value):0 + isteriMultiplyWith + anakMultiplyWith +anakBelajarMultiplyWith+ ibuBapa + Number(e.target.value) + Number(kwsp=='%' ? (Number(e.target.value) * (12/10)): Number(e.target.value)) ))
    if (kwsp==='%') {
      if(ownValueOfPandapatanBulanan >=0 ){
        console.log(ownValueOfPandapatanBulanan)
        setKiraan((jumlahKeseluruhan) * (Number(e.target.value) /100))
      }else{
        setKiraan(0)
      }
    } else {
      setKiraan(e.target.value)
    }
  }

  const terusBayar = () =>{
    let year = (data.filter(i=>i.title=="tahun-amaunNisab" && i.first_value == Number(tahun.split('-')[0])).sort()[0].key_value)
    let tbayar = document.getElementById('terusbayar').value
    if(tbayar){
      history.push('/singleCartItem',[{zakatName:'Zakat Pendapatan',tahunHaul:year,total:(tbayar)}])
    }else{
      history.push('/singleCartItem',[{zakatName:'Zakat Pendapatan',tahunHaul:year,total:(jumlahZakatSetahun).toFixed(2)}])
    }

  }



  return (
    <>
      <TheNavigation />
      <Container className="py-4">
        <Form>
          <Card className="my-4">
            <CardHeader>Kiraan Zakat Pendapatan</CardHeader>

            <CardBody>
              <Row>
                <Col xs="12" sm="12" md="4">
                  <FormGroup>
                    <FormText>Tahun / Haul</FormText>
                    <Input value={tahun} onChange={handleTahun} type="select">
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
                {/*   */}

                <Col  xs="12" sm="12" md="4">
                  <FormGroup>
                    <FormText>Amaun Nisab</FormText>
                    <Input type="number" value={Number(tahun.split('-')[0]).toFixed(2)} disabled />
                  </FormGroup>
                </Col>

                <Col  xs="12" sm="12" md="4">
                  <Row>
                    <Col sm="12" md="12" xs="12">
                      <FormText>Jenis kiraan</FormText>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="12" xs="12">
                      <FormGroup check inline>
                        <FormText check className="mr-3">
                          <Input
                            type="radio"
                            onChange={handleTanpaTolakan} 
                            id="tanpa-radio"
                            name="jeni-kiraan"
                          />{" "}
                          Tanpa Tolakan
                        </FormText>

                        <FormText check>
                          <Input
                            onChange={handleTolakan}
                            type="radio"
                            name="jeni-kiraan"
                          />{" "}
                          Dengan Tolakan
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card className="my-4">
            <CardHeader>Maklumat Pendapatan</CardHeader>

            <CardBody>
              <Row>
                <Col xs="12" md="3" sm="12">
                  <Row>
                    <Col sm="12" md="12" xs="12">
                      <FormText>Jenis Pendapatan</FormText>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" md="12" xs="12">
                      <FormGroup check inline>
                        <FormText check className="mr-3">
                          <Input
                            type="radio"
                            id="bulanan-radio"
                            onChange={handleAnother}
                            name="jenis-pendapatan"
                          />{" "}
                          Bulanan
                        </FormText>

                        <FormText check>
                          <Input
                            type="radio"
                            id="tahunan-radio"
                            onChange={handleChange}
                            name="jenis-pendapatan"
                          />{" "}
                          Tahunan
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>

                <Col xs="12" md="3" sm="12">
                  <FormGroup>
                    <FormText>Pendapatan Bulanan</FormText>
                    {bulananRadio ? (
                      <Input
                        type="text"
                        onChange={handlePendapatan}
                        id="bulanan"
                        value={ownValueOfPandapatanBulanan}
                      />
                    ) : (
                      <Input
                        type="text"
                        id="bulanan"
                        disabled
                        value={pendapatanBulanan}
                      />
                    )}
                  </FormGroup>
                </Col>

                <Col xs="12" md="3" sm="12">
                  <FormGroup>
                    <FormText>Pendapatan Tahunan</FormText>
                    {tahunanRadio ? (
                      <Input
                        type="text"
                        onChange={handlePendapatanTahunan}
                        id="tahunan"
                        value={ownValueOfPandapatanTahunan}
                      />
                    ) : (
                      <Input type="text" id="tahunan" value={pandapatan} />
                    )}
                  </FormGroup>
                </Col>

                <Col xs="12" md="3" sm="12">
                  <FormGroup>
                    <FormText>Pendapatan Lain</FormText>
                    <Input type="text" onChange={handleLain} value={lain} />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>

            <CardFooter>
              <Row className="float-right">
                <Col sm="12" md="12" xs="12">
                  <FormGroup>
                    <FormText>Jumlah Keseluruhan</FormText>
                    {tahunanRadio ? (
                      <Input
                        type="number"
                        value={jumlahKeseluruhan.toFixed(2)}
                        disabled
                      />
                    ) : (
                      <>
                        <Input
                          type="number"
                          value={jumlahKeseluruhan.toFixed(2)}
                          disabled
                        />
                      </>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </CardFooter>
          </Card>

          <Collapse in={tolakanRadio}>
            <Card className="my-4">
              <CardHeader>Maklumat Perbelanjaan Tahunan</CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" md="12" xs="12">
                      <Row>
                          <Col xs="12" md="6" sm="12">
                             <p>Diri Sendiri</p>
                          </Col>
                          <Col xs="12" md="6" sm="12">
                            <FormGroup>
                            {
                            data ? data.filter(i=>i.title=="diriSendiri" && i.key_value==tahun.split('-')[1]).map(i=>(
                              <Input
                                  type="number"
                                  className="float-right"
                                  value={Number(i.first_value).toFixed(2)}
                                  disabled
                              />
                              ))
                              :
                              null

                            }
                            </FormGroup>
                          </Col>
                      </Row>
                  </Col>

                  <Col sm="12" md="12"  xs="12" className="mt-4 mb-1">
                    <Row>
                      <Col xs="6">
                        <Row>
                          <Col sm="12" md="12" xs="12">Isteri</Col>
                          <Col sm="12" md="12" xs="12">
                            <i>
                              Tolakan{" "}
                              <span style={{ color: "red" }}> RM5000.00</span>{" "}
                              untuk setiap isteri
                            </i>{" "}
                          </Col>
                        </Row>
                      </Col>

                      <Col  xs="12" md="3" sm="12">
                        <FormGroup>
                          <Input value={isteri} onChange={handleIsteri} type="select">
                            <option > 0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>                           
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="3" sm="12">
                        <FormGroup>
                          <Input type="number" disabled value={isteriMultiplyWith.toFixed(2)} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="12" xs="12" className="mt-4 mb-1">
                        <Row>
                          <Col xs="6">
                            <Row>
                              <Col sm="12" md="12"  xs="12">Anak berumur bawah 18 tahun </Col>
                              <Col sm="12" md="12"  xs="12">
                                <i>
                                  Tolakan{" "}
                                  <span style={{ color: "red" }}>
                                    {" "}
                                    RM2000.00
                                  </span>{" "}
                                  untuk setiap anak
                                </i>{" "}
                              </Col>
                            </Row>
                          </Col>
                              <Col  xs="12" md="3" sm="12">
                                <FormGroup>
                                  <Input value={anak} onChange={handleAnak} type="select">
                                  <option > 0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>

                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col  xs="12" md="3" sm="12">
                                <FormGroup>
                                  <Input
                                    type="number"
                                    disabled
                                    value={anakMultiplyWith.toFixed(2)}
                                  />
                                </FormGroup>
                              </Col>
                              
                        </Row>
                      </Col>
                    </Row>

                    <Collapse in={show} >
                    <Row >
                      <Col sm="12" md="12"  xs="12" className="mt-4 mb-1">
                        <Row>
                          <Col xs="6">
                            <Row>
                              <Col sm="12" md="12"  xs="12">
                              Anak berumur lebih 18 tahun (belajar)
                              </Col>
                              <Col sm="12" md="12"  xs="12">
                                <i>
                                  Tolakan{" "}
                                  <span style={{ color: "red" }}>
                                    {" "}
                                    RM5000.00
                                  </span>{" "}
                                  untuk setiap anak
                                </i>{" "}
                              </Col>
                            </Row>
                          </Col>
                          <Col  xs="12" md="3" sm="12">
                              <FormGroup>
                                <Input value={anakBelajar} onChange={handleAnakBelajar} type="select">
                              <option > 0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                              <option>13</option>
                              <option>14</option>
                              <option>15</option>
                              <option>16</option>
                              <option>17</option>
                              <option>18</option>
                              <option>19</option>
                              <option>20</option>
                              <option>21</option>
                              <option>22</option>
                              <option>23</option>
                              <option>24</option>
                              <option>25</option>

                              </Input>
                            </FormGroup>
                          </Col>
                          
                          <Col xs="12" md="3" sm="12">
                            <FormGroup>
                              <Input
                                type="number"
                                disabled
                                value={anakBelajarMultiplyWith.toFixed(2)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    </Collapse>
                    
                    <Row>
                      <Col sm="12" md="12"  xs="12">
                        <Row>
                            <Col xs="12" md="6" sm="12">
                                <p>Ibu Bapa</p>
                            </Col>
                            <Col xs="12" md="6" sm="12">
                                <FormGroup>
                                <Input
                                    type="text"
                                    value={ibuBapa}
                                    onChange = {handleIbuBapa}
                                    
                                />
                                </FormGroup>
                            </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="12" md="12" xs="12" className="mt-4 mb-1">
                        <Row>
                          <Col xs="6">
                            <Row>
                              <Col sm="12" md="12"  xs="12">Potongan KWSP { kwsp == '%' ? '' : 'Tahunan' } </Col>
                            </Row>
                          </Col>

                          <Col  xs="12" md="3" sm="12">
                            <FormGroup>
                              <Input value={kwsp} onChange={handleKwsp} type="select">
                                <option value="%">%</option>
                                <option value="RM">RM</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col xs="12" md="3" sm="12">
                            <FormGroup>
                              <Input
                                type="text"
                                value={kwspNum}
                                onChange={handleKwspNum}
                              />
                            </FormGroup>
                          </Col>
                          <Col  sm="12" md="12"  xs="12">
                              <Row>
                                  <Col  xs="12" md="9" sm="12">
                                  </Col>
                                  <Col xs="12" md="3" sm="12">
                                    <Row>
                                        <Col sm="12" md="12" xs="12">
                                            <FormText>Kiraan Setahun</FormText>
                                        </Col>
                                        <Col sm="12" md="12" xs="12">
                                            <FormGroup>
                                                <Input type="text" value={kiraan} disabled />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                  </Col>
                              </Row>
                          </Col>
                        </Row>
                      </Col>

                    </Row>
                  <Row>
                      <Col sm="12" md="12" xs="12" className="mt-4 mb-1">
                        <Row>
                          <Col xs="12" sm="12" md="9">
                            <Row>
                              <Col sm="12" md="12"  xs="12">Pendidikan Sendiri</Col>
                              <Col sm="12" md="12"  xs="12">
                                <i>
                                  Maksimum {" "}
                                  <span style={{ color: "red" }}>
                                    {" "}
                                    RM2000.00
                                  </span>{" "}
                                  untuk setahun
                                </i>{" "}
                              </Col>
                            </Row>
                          </Col>

                          
                          <Col xs="12" sm="12" md="3">
                            <FormGroup>
                              <Input
                                type="text"
                                onChange={handleSendri}
                                value={sendri}
                              />
                            </FormGroup>
                          </Col>
                          
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                    <Col sm="12" md="12"  xs="12">
                        <Row>
                            <Col  xs="12" sm="12" md="6">
                                <p>Jumlah Perbelanjaan</p>
                            </Col>
                            
                            <Col  xs="12" sm="12" md="6">
                            <FormGroup>
                                <Input type="number" value={perb.toFixed(2)} disabled />
                            </FormGroup>
                            </Col>

                        </Row>
                    </Col>
                </Row>
              </CardFooter>
            </Card>
          </Collapse>

          <Card className="my-4">
            <CardHeader>Jumlah Zakat Pendapatan</CardHeader>

            <CardBody>
              <Row>
                <Col  xs="12" sm="12" md="4">
                  <FormGroup>
                    <FormText>Jumlah Pendapatan Layak Di Zakat</FormText>
                    <Input type="text" value={Number(diZakat).toFixed(2)} disabled />
                  </FormGroup>
                </Col>

                <Col  xs="12" sm="12" md="4">
                  <FormGroup>
                    <FormText>Caruman Berzakat</FormText>
                    <Input
                      type="text"
                      onChange={handleCarumanBerzakat}
                      defaultValue={0.00}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" sm="12" md="4">
                  <FormGroup>
                    <FormText>Jumlah Ditolak Dari Caruman Berzakat</FormText>
                    <Input type="number" value={caruman.toFixed(2)} disabled />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>

            <CardFooter>
              <Row className="float-right">
                <Col  xs="12" sm="12" md="6">
                  <FormGroup>
                    <FormText>Jumlah Zakat Setahun</FormText>
                    <Input type="text" value={jumlahZakatSetahun.toFixed(2)} disabled />
                  </FormGroup>
                </Col>

                <Col  xs="12" sm="12" md="6">
                  <FormGroup>
                    <FormText>Jumlah Zakat Bulanan</FormText>
                    <Input type="text" value={(jumlahZakatSetahun/12).toFixed(2)} disabled />
                  </FormGroup>
                </Col>
              </Row>
            </CardFooter>
            <Row>
              <Col xs='12'>
                <CLabel><b>Sila tekan butang reset sekiranya memasukkan nombor yang baru.</b></CLabel>
              </Col>
            </Row>
          </Card>
          {
            (jumlahZakatSetahun/12).toFixed(2) == 0 ?
            <Button disabled color="primary" onClick={toggle} className="mr-3">
              Bayar Zakat
            </Button>
            :
            <Button  color="primary" onClick={toggle} className="mr-3">
              Bayar Zakat
            </Button>

          }
          {
            (jumlahZakatSetahun/12).toFixed(2) == 0 ?
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
          
          
          <Button outline className="ml-3" onClick={()=>history.push('/info',{
            tahun:tahun.split('-')[1],
            amaun:tahun.split('-')[0],
            penda : ownValueOfPandapatanBulanan,
            tahunan : ownValueOfPandapatanTahunan,
            tolakanRadio,
            kwspNum,
            kwsp,
            diriSendiri:data.filter(i=>i.title=="diriSendiri" && i.key_value==tahun.split('-')[1])[0],
            pendapatanLain : lain,
            jumlahPendapatan : diZakat,
            sendri,
            isteri,
            anak,
            anakBelajar,
            ibuBapa,
            kiraan,
            perb,
            caruman,
            jumlahZakatSetahun,
            jumlahZakatBulanan : (jumlahZakatSetahun/40) 
          })} >
            Cetak
          </Button>
          <Button color="link" onClick={() => window.location.reload()}>Reset</Button>
        </Form>
        <Modal isOpen={modal} toggle={toggle}>
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
                                  <h3>{(jumlahZakatSetahun).toFixed(2)}</h3>
                                  <p>setahun</p>
                                  <small >Zakat yang wajib dibayar (setahun)</small>
                              </div>
                          </div>
                          <Button style={{width:'80%'}} onClick={handleAnotherModal} color="primary" className="mt-4">Tambah di Troli</Button>
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
  );
};

export default Pendapatan;
