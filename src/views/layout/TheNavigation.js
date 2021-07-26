import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import { getUserToken, isLogin, logout } from '../../utils/LoginAuth';
import { useSelector } from 'react-redux'
import { Badge} from '@material-ui/core'
import {  getUserProfile } from '../../apis/GetMethod'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import './style.css'

const TheNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data,setData] = useState(null)
    const [name,setName] = useState('')
    const state = useSelector(state=>state.cartReducer)
    const history = useHistory()
    console.log(state)
    
    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () =>{
        logout()
        history.push('/login')

    }

    useEffect(()=>{
        getUserProfile(getUserToken()).then(res=>{
            setData(res.results)
            
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Zakat kasih</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mx-auto" navbar>
                    <NavItem className="mr-2">
                        <NavLink href="https://kasih-zakat.com">Utama</NavLink>
                    </NavItem> 
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Kira Zakat
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavItem>
                                    <NavLink href="pendapatan">Zakat Pendapatan</NavLink>
                                </NavItem>
                            </DropdownItem>
                                
                            <DropdownItem>
                                <NavItem>
                                    <NavLink href="perniagaan">Zakat Perniagaan</NavLink>
                                </NavItem>
                            </DropdownItem>
                            
                            <DropdownItem>
                                <NavItem>
                                    <NavLink href="emas">Zakat Emas</NavLink>
                                </NavItem>
                            </DropdownItem>

                            <DropdownItem>
                                <NavItem>
                                    <NavLink href="kwsp">Zakat KWSP</NavLink>
                                </NavItem>
                            </DropdownItem>

                            <DropdownItem>
                                <NavItem>
                                    <NavLink href="wang-simpanan">Zakat Wang Simpanan</NavLink>
                                </NavItem>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    {
                            <NavItem className="mr-2 main-link">
                                <NavLink   href="cartItems">
                                    Bayar 
                                    <span class="badge badge-show text-white success bg-primary">
                                        {
                                            state.length>0?
                                            state.length
                                            :
                                            null
                                        }
                                    </span>
                                </NavLink>
                            </NavItem>
                    }          
                    <NavItem className="mr-2">
                        <NavLink href="https://kasih-zakat.com/hubungi-kami/">Contact</NavLink>
                    </NavItem>
                    <NavItem className="mr-2">
                        <NavLink href="#">About Ikasih</NavLink>
                    </NavItem>
                    
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {
                            isLogin() ? 
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {
                                        data ? 
                                        data[0].firstName + " " + data[0].lastName
                                        :
                                        null
                                    }
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink href="dashboard">Dashboard</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink href="profile">Profile</NavLink>
                                        </NavItem>
                                    </DropdownItem>


                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink  href="cartItems">Cart Items</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink  href="savedZakat">Saved Zakat</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink href="#" onClick={handleLogout}>Logout</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            : <NavLink href="login">Login/Register</NavLink>
                        }
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default TheNavigation
