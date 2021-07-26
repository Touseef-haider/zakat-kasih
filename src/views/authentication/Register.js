import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { login } from '../../utils/LoginAuth'
import { register } from '../../apis/PostMethod'
import { useHistory } from 'react-router'

const Register = () => {
  const [loading,setLoading] = useState(false)
  const history = useHistory();
  const handleSubmit = (e) =>{
    e.preventDefault()
    setLoading(true)
    let firstName = document.querySelector('#fName').value
    let lastName = document.querySelector('#lName').value
    let email = document.querySelector('#email').value
    let phNum = document.querySelector('#num').value
    let password = document.querySelector('#password').value
    let cpassword = document.querySelector('#cpassword').value
    let p;
    if (password == cpassword) {
        p = password
    }
    const obj = {
      firstName,
      lastName,
      phNum,
      email,
      password:p,
      userTypeId : 2
    }

    register(obj).then(res=>{
      console.log(res)
      if (res.results.code==1) {
        history.push('/login')
        setLoading(false)
      }
    }).catch(err=>{
      console.log(err)
    })
  

  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      {/* <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText> */}
                    </CInputGroupPrepend>
                    <CInput type="text" id="fName" placeholder="firstName" autoComplete="firstName" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      {/* <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText> */}
                    </CInputGroupPrepend>
                    <CInput type="text" id="lName" placeholder="lastName" autoComplete="lastName" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      {/* <CInputGroupText>@</CInputGroupText> */}
                    </CInputGroupPrepend>
                    <CInput type="text" id="email" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      {/* <CInputGroupText>@</CInputGroupText> */}
                    </CInputGroupPrepend>
                    <CInput type="number" id="num" placeholder="Number" autoComplete="number" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      {/* <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText> */}
                    </CInputGroupPrepend>
                    <CInput type="password" id="password" placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      {/* <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText> */}
                    </CInputGroupPrepend>
                    <CInput type="password" id="cpassword" placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton type="submit" color="success" block>
                    {
                      loading ? 
                      "please wait"
                      :
                      "Create Account"

                    }
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
