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
import { CheckLogin } from '../../apis/GetMethod'
import { forgotPassword } from '../../apis/PostMethod'
import { login } from '../../utils/LoginAuth'

const ChangePassword = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const handleChangePassword = (e) => {
    e.preventDefault();

    setLoading(true);


    forgotPassword({email:email}).then(doc => {
      console.log(doc);
      if (doc.results.code==1) {
        setLoading(false);
        console.log(doc)
        // login(doc.results.userId)
        localStorage.setItem('email-to-change',email)
        document.querySelector('#msg').textContent = 'Kami telah mengirimkan email kepada Anda, harap verifikasi untuk melanjutkan lebih lanjut';

      }else{
        // alert(doc.results.message)
        setLoading(false);
        document.querySelector('#msg').textContent = doc.results.message;
        setTimeout(() => {
          document.querySelector('#msg').textContent = "";
        }, 3000);
        
      }
    }).catch(error => {
      alert(error);
      setLoading(false);
    })

  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => handleChangePassword(e)}>
                    <h1>Tukar Pas</h1>
                    <p className="text-muted">Diminta menukar kata laluan</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        {/* <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText> */}
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="jondoe@ikasih.com" autoComplete="email" required onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <div id="msg" className="mb-1 text-success">

                    </div>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>{loading ? "Berubah..." : "Ubah"}</CButton>
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

export default ChangePassword
