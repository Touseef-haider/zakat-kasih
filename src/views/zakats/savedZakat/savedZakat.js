import React,{useState,useEffect} from 'react'
import {
    getSavedZakats
} from '../../../apis/GetMethod'
import {
    deleteFromSavedZakatCollection
} from '../../../apis/DeleteMethod'


import {
    Card,
    Table
} from 'reactstrap'

import Delete from '@material-ui/icons/Delete';

const SavedZakat = () =>{
    const [zakats,setZakats] = useState([]);
    const [callAgain,setCallAgain] = useState(false)

    useEffect(()=>{
        getSavedZakats(JSON.parse(localStorage.getItem('LOGIN_TOKEN'))).then(res=>{
            console.log(res)
            setZakats(res.results)
        }).catch(err=>{
            console.log(err)
        })
    },[callAgain])

    const handleDelete = (id) =>{
        console.log(id)
        if(window.confirm("Are you sure !")){
            deleteFromSavedZakatCollection(id).then(res=>{
                console.log(res)
                if (res.results.code==1) {
                    setCallAgain(true)
                    // 
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }



    return(
        <Card className="container my-4">
        <Table>
            <thead>
                <tr>
                {/* <th>#</th> */}
                <th>Tajuk</th>
                <th>Nama Zakat</th>
                <th>Tahun</th>
                <th>Jumlah</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    zakats ? 
                    zakats.map(i=>(
                        <tr key={i.savedCalculationsId}>
                            {/* <td>{i.savedCalculationsId}</td> */}
                            <td>{i.title}</td>
                            <td>{JSON.parse(i.jsonObject).name.zakatName}</td>
                            <td>{JSON.parse(i.jsonObject).name.tahunHaul}</td>
                            <td>{JSON.parse(i.jsonObject).name.total}</td>
                            <td> <Delete fontSize="small" style={{color:'red',cursor:'pointer'}} onClick={()=>handleDelete(i.savedCalculationsId)} /> </td>
                        </tr>
                    ))
                    :
                    null
                }
            </tbody>
        </Table>
        </Card>
    )
}

export default SavedZakat