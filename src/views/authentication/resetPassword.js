import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import { CheckLogin ,getChangePasswordRequest} from '../../apis/GetMethod'
import { changePasswordWithEmail } from '../../apis/PostMethod'
import { login } from '../../utils/LoginAuth'

const ResetPassword = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(()=>{

  },[])

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);

    let p = document.querySelector('#new-pass').value;
    let cp = document.querySelector('#new-c-pass').value;
    if(p==cp){
        console.log(window.location.href.split('-')[1].split('/')[1])
        getChangePasswordRequest(window.location.href.split('-')[1].split('/')[1]).then(doc => {
          console.log(doc);
          if (doc.results.code==1) {
            changePasswordWithEmail({
                email:localStorage.getItem('email-to-change'),
                password:p
            }).then(res=>{
                console.log(doc)
                if(doc.results.code==1){
                    localStorage.removeItem('email-to-change')
                    document.querySelector('#msg').innerHTML = `
                    <div>
                        your password has been changed 
                        you are being redirected to login page. please wait
                    </div>
                    `;
                    setTimeout(()=>{
                        history.push('/login')
                    },3000)
                    setLoading(false);
                }else{
                    document.querySelector('#msg').textContent = `
                        Something went wrong
                    `;
                }

            })
            .catch(err=>{
                console.log(err)
            })
            // login(doc.results.userId)
          }else{
            // alert(doc.results.message)
            setLoading(false);
    
          }
        }).catch(error => {
          alert(error);
          setLoading(false);
        })
    }else{
        setLoading(false)
        document.querySelector('#msg').textContent = 'password did not match';
        setTimeout(()=>{
        document.querySelector('#msg').textContent = '';
        },3000)
    }

  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6" sm="12" xs="12">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => handleReset(e)}>
                    <h1>Tukar Pas</h1>
                    <p className="text-muted">Diminta menukar kata laluan</p>
                      
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        {/* <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText> */}
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="new password" id="new-pass" autoComplete="password" required />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        {/* <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText> */}
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="confirm new password" id="new-c-pass" autoComplete="confirm-password" required />
                    </CInputGroup>
                    <div id="msg" className="mb-1 text-success">
                        
                    </div>
                    <CRow>
                      <CCol xs="12" sm="12" md="6" >
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>{loading ? "mohon tunggu...  " : "Ganti kata sandi"}</CButton>
                      </CCol>

                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
           
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword;
