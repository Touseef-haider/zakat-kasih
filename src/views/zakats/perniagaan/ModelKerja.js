import { TextareaAutosize,makeStyles } from "@material-ui/core";
import React, { useEffect,useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
} from "reactstrap";
import TheNavigation from "../../layout/TheNavigation";
import '../style.css'
import { getValues } from '../../../apis/GetMethod'
import { useDispatch } from 'react-redux'
import { cartAction } from '../../../redux/action/cartAction'
import { useHistory } from "react-router";
import compare from "../compare";
import { saveCollection } from "../../../apis/PostMethod";

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

const ModalKerja = () => {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch();
  const [tahunHaul, setTahunHaul] = useState("0-0");
  const [hasil, setHasil] = useState(0);
  const [jumlahZakat, setJumlahZakat] = useState(0);
  const [aMinusB, setAMinusB] = useState(0);
  const [tolak, setTolak] = useState(0);
  const [aset, setAset] = useState(0);
  const [liabiliti, setLiabiliti] = useState(0);
  const [jumlahAset, setJumlahAser] = useState(0);
  const [stok, setStok] = useState(0);
  const [lain, setLain] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [hutang, setHutang] = useState(0);
  const [diterima, setDiterima] = useState(0);
  const [lain1, setLain1] = useState("");
  const [lain2, setLain2] = useState("");
  const [lain3, setLain3] = useState("");
  const [lain4, setLain4] = useState("");
  const [lainNum1, setLainNum1] = useState(0);
  const [lainNum2, setLainNum2] = useState(0);
  const [lainNum3, setLainNum3] = useState(0);
  const [lainNum4, setLainNum4] = useState(0);
  const [jumlahPelarasan, setJumlahPelarasan] = useState(0);
  //
  const [lainLain, setLainLain] = useState(0);
  const [pinjaman, setPinjaman] = useState(0);
  const [dividen, setDividen] = useState(0);
  const [hutangKepada, setHutangKepada] = useState(0);
  const [pemiutang, setPemiutang] = useState(0);
  const [peruntukan, setPeruntukan] = useState(0);
  const [lainLain1, setLainLain1] = useState("");
  const [lainLain2, setLainLain2] = useState("");
  const [lainLain3, setLainLain3] = useState("");
  const [lainLain4, setLainLain4] = useState("");
  const [lainLainNum1, setLainLainNum1] = useState(0);
  const [lainLainNum2, setLainLainNum2] = useState(0);
  const [lainLainNum3, setLainLainNum3] = useState(0);
  const [lainLainNum4, setLainLainNum4] = useState(0);
  const [jumlahPelarasan2, setJumlahPelarasan2] = useState(0);
  const [final,setFinal] = useState(0)
  //
  const [aMinusBPlusC, setAMinusBPlusC] = useState(0);
  const [peratus, setPeratus] = useState(0);
  const [jumlahLebihan, setJumlahLebihan] = useState(0);
  const [loading,setLoading] = useState(false)

  const [modal, setModal] = useState(false);
  const [anotherOpen, setAnotherOpen] = useState(false);
  const [count,setCount] = useState(0)
  const [data,setData] = useState([])

  useEffect(()=>{
    if(count==0){
      getValues().then(res=>{
          console.log(res.results)
          setData(res.results)
          setCount(1)
          setTahunHaul(res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].first_value+"-"+res.results.filter(i=>i.title=="tahun-amaunNisab").sort(compare)[0].key_value)
        }).catch(err=>console.log(err))
    }
  },[aMinusBPlusC])

  const handleSave = () =>{
    setLoading(true)

    const obj = {
        userId: JSON.parse(localStorage.getItem('LOGIN_TOKEN')),
        zakatListId : 2,
        jsonObject: JSON.stringify({name:{zakatName:'Model Kerja',tahunHaul:tahunHaul.split("-")[1],total:(Number(jumlahLebihan) / 40).toFixed(2)}})
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
        dispatch(cartAction({zakatName:'Model Kerja',tahunHaul:tahunHaul.split("-")[1],total:tbayar}))    
        setModal(false)
        setAnotherOpen(!anotherOpen)
      }else{
        dispatch(cartAction({zakatName:'Model Kerja',tahunHaul:tahunHaul.split("-")[1],total:(Number(jumlahLebihan) / 40).toFixed(2)}))    
        setModal(false)
        setAnotherOpen(!anotherOpen)
      }
  }

  const terusBayar = () =>{
    let tbayar = document.getElementById('terusbayar').value
    if(tbayar){
      history.push('/singleCartItem',[{zakatName:'Model Kerja',tahunHaul:tahunHaul.split('-')[1],total:tbayar}])
    }else{
      history.push('/singleCartItem',[{zakatName:'Model Kerja',tahunHaul:tahunHaul.split('-')[1],total:(Number(jumlahLebihan) / 40).toFixed(2)}])
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

  const handleStok = (e) => {
    setStok(Number(e.target.value));
    setJumlahPelarasan(
      Number(e.target.value) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(e.target.value) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    if(Number( Number(jumlahAset) - (
      Number(e.target.value) +
      Number(lain) +
      Number(deposit) +
      Number(hutang) +
      Number(diterima) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(e.target.value) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
      
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(e.target.value) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) )* (Number(peratus) / 100))
     
    }


  };

  const handleLain = (e) => {
    setLain(e.target.value);
      
    setJumlahPelarasan(
      Number(stok) +
        Number(e.target.value) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(e.target.value) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    
    if(Number( Number(jumlahAset) - (
      Number(stok) +
      Number(e.target.value) +
      Number(deposit) +
      Number(hutang) +
      Number(diterima) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(e.target.value) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))

      
    }
    else{
      setFinal(0)
    }
    if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(e.target.value) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2)) * (Number(peratus) / 100))
    } 
  }
  const handleDeposit = (e) => {
    setDeposit(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(e.target.value) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(e.target.value) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    if(Number(  Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(e.target.value) +
      Number(hutang) +
      Number(diterima) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(
        Number(jumlahAset) - (
          Number(stok) +
          Number(lain) +
          Number(e.target.value) +
          Number(hutang) +
          Number(diterima) +
          Number(lainNum1) +
          Number(lainNum2) +
          Number(lainNum3) +
          Number(lainNum4) )+
          jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
    }else{
      setFinal(0)
    }
    
    if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(e.target.value) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2)) * (Number(peratus) / 100))
    }
  };

  const handleHutang = (e) => {
    setHutang(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(e.target.value) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(e.target.value) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    if(Number(Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(deposit) +
      Number(e.target.value) +
      Number(diterima) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(e.target.value) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(e.target.value) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) )* (Number(peratus) / 100))
    }

  };

  const handleDiterima = (e) => {
    setDiterima(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(e.target.value) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(e.target.value) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)  )+
        jumlahPelarasan2
    );
    if(Number(Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(deposit) +
      Number(hutang) +
      Number(e.target.value) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(lainNum4)  )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(e.target.value) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)  )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }

     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(e.target.value) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2)) * (Number(peratus) / 100))
    }
  };

  const handleLain1 = (e) => {
    setLain1(e.target.value);
  };

  const handleLain2 = (e) => {
    setLain2(e.target.value);
  };

  const handleLain3 = (e) => {
    setLain3(e.target.value);
  };

  const handleLain4 = (e) => {
    setLain4(e.target.value);
  };

  const handleLainNum1 = (e) => {
    setLainNum1(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(e.target.value) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(e.target.value) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    if(Number( Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(deposit) +
      Number(hutang) +
      Number(diterima) +
      Number(e.target.value) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(e.target.value) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }

     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(e.target.value) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2)) * (Number(peratus) / 100))
    }
  };

  const handleLainNum2 = (e) => {
    setLainNum2(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(e.target.value) +
        Number(lainNum3) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(e.target.value) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    if(Number(Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(deposit) +
      Number(hutang) +
      Number(diterima) +
      Number(lainNum1) +
      Number(e.target.value) +
      Number(lainNum3) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(e.target.value) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(e.target.value) +
        Number(lainNum3) +
        Number(lainNum4) )+
        jumlahPelarasan2) )* (Number(peratus) / 100))
    }
  };

  const handleLainNum3 = (e) => {
    setLainNum3(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(e.target.value) +
        Number(lainNum4)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(e.target.value) +
        Number(lainNum4) )+
        jumlahPelarasan2
    );
    if(Number(Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(deposit) +
      Number(hutang) +
      Number(diterima) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(e.target.value) +
      Number(lainNum4) )+
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(e.target.value) +
        Number(lainNum4) )+
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
     
     }else{
      setFinal(0)
     }

     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(e.target.value) +
        Number(lainNum4) )+
        jumlahPelarasan2) )* (Number(peratus) / 100))
    }
  };

  const handleLainNum4 = (e) => {
    setLainNum4(e.target.value);
    setJumlahPelarasan(
      Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(e.target.value)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(e.target.value) ) +
        jumlahPelarasan2
    );
    if(Number(Number(jumlahAset) - (
      Number(stok) +
      Number(lain) +
      Number(deposit) +
      Number(hutang) +
      Number(diterima) +
      Number(lainNum1) +
      Number(lainNum2) +
      Number(lainNum3) +
      Number(e.target.value) ) +
      jumlahPelarasan2) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - (
        Number(stok) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(e.target.value) ) +
        jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }

     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - (
        Number(e.target.value) +
        Number(lain) +
        Number(deposit) +
        Number(hutang) +
        Number(diterima) +
        Number(lainNum1) +
        Number(lainNum2) +
        Number(lainNum3) +
        Number(e.target.value) )+
        jumlahPelarasan2) )* (Number(peratus) / 100))
    }
  };

  // second card is starting from here
  const handleLainLain = (e) => {
    setLainLain(Number(e.target.value));
    setJumlahPelarasan2(
      Number(e.target.value) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(e.target.value) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4)
    );
    if(Number(Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(e.target.value) +
    pinjaman +
    dividen +
    hutangKepada +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4)) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(e.target.value) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(e.target.value) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }
  };

  const hanldePinjaman = (e) => {
    setPinjaman(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        Number(e.target.value) +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        Number(e.target.value) +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4 )
    );
    if(Number( Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    Number(e.target.value) +
    dividen +
    hutangKepada +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4 )) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number( Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      Number(e.target.value) +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4 )) * (Number(peratus) / 100)/40).toFixed(2))
  
     }else{
      setFinal(0)
     }
     
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      Number(e.target.value) +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }

  };
  const handleDividen = (e) => {
    setDividen(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        Number(e.target.value) +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        Number(e.target.value) +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4)
    );
    if(Number( Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    Number(e.target.value) +
    hutangKepada +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4)) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number( Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      Number(e.target.value) +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)/40).toFixed(2))
  
      
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      Number(e.target.value) +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }

  };
  const handleHutangKepada = (e) => {
    setHutangKepada(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        Number(e.target.value) +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        Number(e.target.value) +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4)
    );
    if(Number(Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    Number(e.target.value) +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4)) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      Number(e.target.value) +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)/40).toFixed(2))

     }else{
      setFinal(0)
     }
       
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman+
      dividen +
      Number(e.target.value) +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }


  };
  const handlePemiutang = (e) => {
    setPemiutang(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        hutangKepada +
        Number(e.target.value) +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        hutangKepada +
        Number(e.target.value) +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4 )
    );
    if(Number( Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    hutangKepada +
    Number(e.target.value) +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4 )) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number( Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      hutangKepada +
      Number(e.target.value) +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4 )) * (Number(peratus) / 100)/40).toFixed(2))
  
     
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      dividen +
      hutangKepada +
      Number(e.target.value) +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }

  };
  const handlePeruntukan = (e) => {
    setPeruntukan(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        Number(e.target.value) +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        Number(e.target.value) +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4 )
    );
    if(Number( Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    hutangKepada +
    pemiutang +
    Number(e.target.value) +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4 )) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number( Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      Number(e.target.value) +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4 )) * (Number(peratus) / 100)/40).toFixed(2))
  
     
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      Number(e.target.value) +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }

  };
  const handleLainLain1 = (e) => {
    setLainLain1(e.target.value);
  };
  const handleLainLain2 = (e) => {
    setLainLain2(e.target.value);
  };
  const handleLainLain3 = (e) => {
    setLainLain3(e.target.value);
  };
  const handleLainLain4 = (e) => {
    setLainLain4(e.target.value);
  };
  const handleLainLainNum1 = (e) => {
    setLainLainNum1(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        Number(e.target.value) +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        Number(e.target.value) +
        lainLainNum2 +
        lainLainNum3 +
        lainLainNum4 )
    );
    if(Number(Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    hutangKepada +
    pemiutang +
    peruntukan +
    Number(e.target.value) +
    lainLainNum2 +
    lainLainNum3 +
    lainLainNum4 )) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      Number(e.target.value) +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4 )) * (Number(peratus) / 100)/40).toFixed(2))
  
     
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      Number(e.target.value) +
      lainLainNum2 +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }


  };
  const handleLainLainNum2 = (e) => {
    setLainLainNum2(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        Number(e.target.value) +
        lainLainNum3 +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        Number(e.target.value) +
        lainLainNum3 +
        lainLainNum4 )
    );
    if(Number(Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    hutangKepada +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    Number(e.target.value) +
    lainLainNum3 +
    lainLainNum4 )) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      Number(e.target.value) +
      lainLainNum3 +
      lainLainNum4 )) * (Number(peratus) / 100)/40).toFixed(2))
  
     
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      Number(e.target.value) +
      lainLainNum3 +
      lainLainNum4)) * (Number(peratus) / 100)))
    }


  };
  const handleLainLainNum3 = (e) => {
    setLainLainNum3(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        Number(e.target.value) +
        lainLainNum4
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        Number(e.target.value) +
        lainLainNum4 )
    );
    if(Number(Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    hutangKepada +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    Number(e.target.value) +
    lainLainNum4 )) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      Number(e.target.value) +
      lainLainNum4 )) * (Number(peratus) / 100)/40).toFixed(2))
  
     }else{
      setFinal(0)
     }

     
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      Number(e.target.value) +
      lainLainNum4)) * (Number(peratus) / 100)))
    }

  };
  const handleLainLainNum4 = (e) => {
    setLainLainNum4(Number(e.target.value));
    setJumlahPelarasan2(
      lainLain +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        Number(e.target.value)
    );
    setAMinusBPlusC(
      Number(jumlahAset) - 
        jumlahPelarasan + (
        Number(lainLain) +
        pinjaman +
        dividen +
        hutangKepada +
        pemiutang +
        peruntukan +
        lainLainNum1 +
        lainLainNum2 +
        lainLainNum3 +
        Number(e.target.value))
    );
    if(Number(Number(jumlahAset) - 
    jumlahPelarasan + (
    Number(lainLain) +
    pinjaman +
    dividen +
    hutangKepada +
    pemiutang +
    peruntukan +
    lainLainNum1 +
    lainLainNum2 +
    lainLainNum3 +
    Number(e.target.value))) * (Number(peratus) / 100) >= Number(tahunHaul.split('-')[0])){
      setFinal((Number(Number(jumlahAset) - 
      jumlahPelarasan + (
      Number(lainLain) +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      Number(e.target.value))) * (Number(peratus) / 100)/40).toFixed(2))
  
     
     }else{
      setFinal(0)
     }
     if(peratus>0){
      setJumlahLebihan(Number((Number(jumlahAset) - 
      jumlahPelarasan + (
      lainLain +
      pinjaman +
      dividen +
      hutangKepada +
      pemiutang +
      peruntukan +
      lainLainNum1 +
      lainLainNum2 +
      lainLainNum3 +
      Number(e.target.value))) * (Number(peratus) / 100)))
    }

  };

  const handleTahunHaul = (e) => {
    setTahunHaul(e.target.value);
    setJumlahLebihan(Number(aMinusBPlusC) * (Number(peratus) / 100));
   
    if(Number(Number(aMinusBPlusC) * (Number(peratus) / 100)) >= Number(e.target.value.split('-')[0])){
      console.log("greater",Number(Number(aMinusBPlusC) * (Number(peratus) / 100)) >= Number(e.target.value.split('-')[0]))

      console.log("final",(Number(aMinusBPlusC) * (Number(peratus) / 100)/40).toFixed(2))
      setFinal((Number(aMinusBPlusC) * (Number(peratus) / 100)/40).toFixed(2))
    }else{
     setFinal(0)
    }
  };
  const handleHasil = (e) => {
    setHasil(e.target.value);
    setAMinusB(e.target.value - tolak);
    if (e.target.value >= Number(tahunHaul.split('-')[0])) {
      setJumlahZakat((e.target.value - tolak) / 40);
    } else {
      setJumlahZakat(0);
    }
  };
  const handleTolak = (e) => {
    setTolak(e.target.value);
   
    setAMinusB(hasil - e.target.value);
    if (hasil >=  Number(tahunHaul.split('-')[0])) {
      setJumlahZakat((hasil - e.target.value) / 40);
    } else {
      setJumlahZakat(0);
    }
  };
  //
  const handleAset = (e) => {
    setAset(e.target.value);
    setAMinusBPlusC(
      Number(e.target.value - liabiliti) -
      jumlahPelarasan + jumlahPelarasan2
    );

    setJumlahLebihan((  Number((e.target.value) - liabiliti) -
    jumlahPelarasan + jumlahPelarasan2) * (Number(peratus) / 100));
    setFinal((Number(Number(e.target.value - liabiliti) -
    jumlahPelarasan + jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))
    setJumlahAser(e.target.value - liabiliti);
  };

  const handleLiabiliti = (e) => {
    setLiabiliti(e.target.value);
    setAMinusBPlusC(
      Number(aset - e.target.value) -
      jumlahPelarasan + jumlahPelarasan2
    );
    setJumlahLebihan( (Number(aset - e.target.value) -
    jumlahPelarasan + jumlahPelarasan2) *(Number(peratus) / 100));
    setFinal((Number( Number(aset - e.target.value) -
    jumlahPelarasan + jumlahPelarasan2) * (Number(peratus) / 100)/40).toFixed(2))

    setJumlahAser(aset - e.target.value);
  };

  //
  const handlePeratus = (e) => {
    setPeratus(e.target.value);
    setJumlahLebihan(Number(aMinusBPlusC) * (Number(e.target.value) / 100));
    
    if(Number(aMinusBPlusC) * (Number(e.target.value) / 100) >= Number(tahunHaul.split('-')[0])){
     setFinal((Number(aMinusBPlusC) * (Number(e.target.value) / 100)/40).toFixed(2))
    }else{
     setFinal(0)
    }

  };

  return (
    <>
      <TheNavigation />
      <Container>
        <Card className="my-4">
          <CardHeader>Kiraan Zakat Perniagaan (Kaedah Modal Kerja)</CardHeader>

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
          <CardHeader>Maklumat Perniagaan</CardHeader>

          <CardBody>
            <Row>
              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <FormText>Nama Perniagaan</FormText>
                  <Input type="text" />
                </FormGroup>
              </Col>

              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <FormText>No. Pendaftaran</FormText>
                  <Input type="number" value={0} />
                </FormGroup>
              </Col>

              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <FormText>Alamat</FormText>
                  <Input type="textarea" name="text" />
                </FormGroup>
              </Col>

              <Col xs="12" sm="12" md="6">
                <FormGroup>
                  <FormText>No. Telefon</FormText>
                  <Input type="number" />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* 1 */}
        <Card className="my-4">
          <CardHeader>A. Modal Kerja</CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" sm="12" md="4">
                <FormText>Aset Semasa</FormText>
                <Input type="text" value={Number(aset)} onChange={handleAset} />
              </Col>

              <Col xs="12" sm="12" md="4">
                <FormText>Tolak : Liabiliti Semasa</FormText>
                <Input
                  type="text"
                  value={Number(liabiliti)}
                  onChange={handleLiabiliti}
                />
              </Col>

              <Col xs="12" sm="12" md="4">
                <FormText>Jumlah Aset (Liabiliti) Semasa Bersih *</FormText>
                <Input type="number" value={Number(jumlahAset).toFixed(2)} disabled />
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* End of 1 */}
        {/* 2 */}
        <Card className="my-4">
          <CardHeader>B. Tolak : Pelarasan Aset Semasa</CardHeader>
          <CardBody>
            <Row className="border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Stok Bahan Mentah dan Barang Separuh Siap</p>
                  <small> ‐ Aset Bukan Niaga</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(stok)}
                  onChange={handleStok}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Lain-lain Penghutang Dan Pendahuluan</p>

                  <small> ‐ Tidak Sempurna Milik</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lain)}
                  onChange={handleLain}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Deposit Tetap Bercagar</p>
                  <small> ‐ Tidak Sempurna Milik</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(deposit)}
                  onChange={handleDeposit}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Hutang Daripada Syarikat Induk & Pengarah</p>

                  <small> ‐ Tidak Sempurna Milik</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(hutang)}
                  onChange={handleHutang}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Hasil Diterima (Simpanan Tetap)</p>

                  <small>‐ Hasil Tidak Syari'e</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(diterima)}
                  onChange={handleDiterima}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lain1}
                    onChange={handleLain1}
                    placeholder="Lain-lain Aset"
                    type="text"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainNum1)}
                  onChange={handleLainNum1}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lain2}
                    type="text"
                    onChange={handleLain2}
                    placeholder="Lain-lain Aset"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainNum2)}
                  onChange={handleLainNum2}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lain3}
                    onChange={handleLain3}
                    type="text"
                    placeholder="Lain-lain Aset "
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainNum3)}
                  onChange={handleLainNum3}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lain4}
                    type="text"
                    onChange={handleLain4}
                    placeholder="Lain-lain Aset"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainNum4)}
                  onChange={handleLainNum4}
                  type="text"
                />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <Col xs="12" sm="12" md="8">
                <b>Jumlah Pelarasan Aset Semasa</b>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(jumlahPelarasan).toFixed(2)}
                  disabled
                  type="text"
                />
              </Col>
            </Row>
          </CardFooter>
        </Card>
        {/* End of 2 */}

        {/* 3 */}
        <Card className="my-4">
          <CardHeader>C. Tambah : Pelarasan Liabiliti Semasa</CardHeader>
          <CardBody>
            <Row className="border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Lain-lain Pemiutang Dan Terakru</p>
                  <small> ‐ Sempurna Milik</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainLain)}
                  onChange={handleLainLain}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Pinjaman Jangka Pendek (Overdraf)</p>
                  <small> ‐ Sempurna Milik</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(pinjaman)}
                  onChange={hanldePinjaman}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Dividen Dicadangkan</p>
                  <small>‐ Bersih Zakat Dahulu</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(dividen)}
                  onChange={handleDividen}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Hutang Kepada Syarikat Induk & Pengarah</p>
                  <small> ‐ Sempurna Milik</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(hutangKepada)}
                  onChange={handleHutangKepada}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Pemiutang Sewa Beli</p>
                  <small>‐ Pelarasan Kewangan</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(pemiutang)}
                  onChange={handlePemiutang}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Peruntukan Zakat</p>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(peruntukan)}
                  onChange={handlePeruntukan}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lainLain1}
                    onChange={handleLainLain1}
                    placeholder="Lain-lain Aset"
                    type="text"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainLainNum1)}
                  onChange={handleLainLainNum1}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lainLain2}
                    onChange={handleLainLain2}
                    type="text"
                    placeholder="Lain-lain Aset"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainLainNum2)}
                  onChange={handleLainLainNum2}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lainLain3}
                    onChange={handleLainLain3}
                    type="text"
                    placeholder="Lain-lain Aset"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainLainNum3)}
                  onChange={handleLainLainNum3}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <Input
                    value={lainLain4}
                    onChange={handleLainLain4}
                    type="text"
                    placeholder="Lain-lain Aset"
                  />
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(lainLainNum4)}
                  onChange={handleLainLainNum4}
                  type="text"
                />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <Col xs="12" sm="12" md="8">
                <b>Jumlah Pelarasan Liabiliti Semasa</b>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(jumlahPelarasan2).toFixed(2)}
                  disabled
                  type="text"
                />
              </Col>
            </Row>
          </CardFooter>
        </Card>
        {/* End of 3 */}
        {/* 4 */}
        <Card className="my-4">
          <CardHeader>
            D. Jumlah Lebihan Aset (Liabiliti) Sele pas Pelarasan [A - B + C]
          </CardHeader>
          <CardBody>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Melebihi / Menyamai Paras Nisab</p>
                  <small>(Harga 85 gram emas)</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(aMinusBPlusC).toFixed(2)}
                  disabled
                  type="number"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* End of 4 */}
        {/* 5 */}
        <Card className="my-4">
          <CardHeader>E. Peratus Pemilikan Saham Muslim</CardHeader>
          <CardBody>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Peratus Saham Muslim</p>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
              <InputGroup>
                <Input
                  className="mb-4"
                  value={Number(peratus)}
                  onChange={handlePeratus}
                  type="number"
                />

                 <InputGroupAddon >
                  %
                </InputGroupAddon>
            </InputGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* End of 5 */}
        {/* 6 */}
        <Card className="my-4">
          <CardHeader>
            F. Jumlah Lebihan Aset Selepas Peratusan Saham Muslim [D x E%]
          </CardHeader>
          <CardBody>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Jumlah Lebihan</p>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={Number(jumlahLebihan).toFixed(2)}
                  disabled
                  type="number"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        {/* End of 6 */}
        {/* 7 */}
        <Card className="my-4">
          <CardHeader>Jumlah Zakat Wajib Ditunaikan</CardHeader>
          <CardBody>
            <Row className="mt-4 border-bottom">
              <Col xs="12" sm="12" md="8">
                <FormText>
                  <p>Jumlah Zakat</p>
                  <small>Hanya 2.5% setahun</small>
                </FormText>
              </Col>
              <Col xs="12" sm="12" md="4">
                <Input
                  className="mb-4"
                  value={
                    Number(final).toFixed(2)
                  }
                  disabled
                  type="number"
                />
              </Col>
            </Row>
          </CardBody>

          <Row>
                    <Col xs='12'>
                        <Label><b>Sila tekan butang reset sekiranya memasukkan nombor yang baru.</b></Label>
                    </Col>
                </Row>
        </Card>
        {/* End of 7 */}
        <Row className="mb-4">
            <Col> 
                {
                  Number(final).toFixed(2) >0? 
                  <Button color="primary" onClick={toggle} className="mr-3">Bayar Zakat</Button>
                  :
                  <Button disabled color="primary" onClick={toggle} className="mr-3">Bayar Zakat</Button>

                }
                {
                  Number(final).toFixed(2) == 0 ?
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
                                  <h3>
                                    {
                                      Number(final).toFixed(2)
                                    }
                                  </h3>
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
                                  <Input type="number" id="terusbayar"/>
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
  );
};

export default ModalKerja;