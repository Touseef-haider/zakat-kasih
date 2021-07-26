import React, { useState } from 'react'
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
import { login } from '../../utils/LoginAuth'

const Login = () => {
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    const param = `email=${email}&password=${pwd}`;

    CheckLogin(param).then(doc => {
      console.log(doc);
      if (doc.results.code==1) {
        setLoading(false);
        login(doc.results.userId)
      }else{
        alert(doc.results.message)
        setLoading(false);

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
          <CCol xs="12" sm="12" md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => handleLogin(e)}>
                    <h1>Log Masuk</h1>
                    <p className="text-muted">Log masuk ke akaun anda</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        {/* <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText> */}
                      </CInputGroupPrepend>
                      <CInput type="email" placeholder="jondoe@ikasih.com" autoComplete="email" required onChange={(e) => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        {/* <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText> */}
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="*********" autoComplete="current-password" required onChange={(e) => setPwd(e.target.value)} />
                    
                    </CInputGroup>
                    <CRow>
                      <CCol md="6" sm="12" xs="12">
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>{loading ? "Menunggu..." : "Log Masuk"}</CButton>
                      </CCol>
                      <CCol md="6" sm="12" xs="12" className="text-right">
                        <CButton onClick={()=>history.push('/changePassword')} color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" >
                <CCardBody className="text-center">
                  <div>
                    <h2>Daftar Akaun</h2>
                    <p>
                        Daftar akaun sekarang untuk kira, bayar dan semak zakat anda
                    </p>
                    <Link to="/daftar">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Daftar Sekarang!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
