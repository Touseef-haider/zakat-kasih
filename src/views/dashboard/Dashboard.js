import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CContainer,
    CDataTable,
    CBadge,
    CCollapse,
    
} from '@coreui/react';
import { createCollection, createBill } from '../../apis/PostMethod';
import { getPayments } from '../../apis/GetMethod';
import { Table } from 'reactstrap';
import './style.css'

const Dashboard = () => {
    const[data,setData] = useState([])
    
    const [details, setDetails] = useState([])
    // const [items, setItems] = useState(usersData)

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
        newDetails.splice(position, 1)
        } else {
        newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const getBadge = (status)=>{
        switch (status) {
          case 'Active': return 'success'
          case 'due': return 'secondary'
          case 'Pending': return 'warning'
          case 'Banned': return 'danger'
          default: return 'primary'
        }
      }

    const CollectionCreate = () => {

        createCollection({title: "Ahsun Testing"}).then(doc => {
            console.log(doc);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(()=>{
        getPayments(localStorage.getItem('LOGIN_TOKEN')).then(res=>{
            
            let result =(res.results.map(i=>{
                return (JSON.parse(i.json_object).key)
            }))
            console.log(result)
            setData(result)
        }).catch(err=>{
            console.log(err)
        })
    },[])




    
    const fields = [
        { key: 'name' , _style: { width: '40%'} },
        'email',
        { key: 'amount', _style: { width: '20%'} },
        { key: 'state', _style: { width: '20%'} },
        { key: 'description', _style: { width: '20%'} },
    ]


    return (
        <CContainer className="pt-5">
            <CCard>
                <CCardHeader>
                    List of all Transactions
                </CCardHeader>
                <Table className="table-head">
                    <thead>
                        <tr>
                            <td>
                                <b>
                                Nama
                                </b>
                            </td>
                            <td>
                                <b>
                                e-mel
                                </b>
                            </td>
                            <td>
                                <b>
                                Jumlah Zakat
                                </b>   
                            </td>
                            <td>
                                <b>
                                Tarikh
                                </b>
                            </td>
                            <td>
                                <b>
                                Aktivity
                                </b>
                            </td>
                        </tr>
                    </thead>
                    <tbody style={{overflowX:'scroll'}}>
                        {
                            data ? data.map(i=>(
                                <tr>
                                    <td>{i.name}</td>
                                    <td>{i.email}</td>
                                    <td>{i.amount}</td>
                                    <td>{i.due_at}</td>
                                    <td>{i.state}</td>
                                </tr>
                            ))
                            :
                            null
                        }
                    </tbody>
                </Table>

            </CCard>
        </CContainer>
    )
}

export default Dashboard
