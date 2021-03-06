import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, HeaderContainer, HeaderTopbar, LogoArea, MenuArea } from './Styled';
import { IoPhonePortraitOutline, IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { CgMenu } from "react-icons/cg";
import { Link as Lnk } from 'react-scroll';
import MobileMenu from './MobileMenu';
import { useAuthHook } from '../../context/auth';
import defaultUserImg from '../../images/user.png';



const HeaderArea = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const togMenu = () => setToggleMenu(! toggleMenu);
    const { user, logoutUser } = useAuthHook();
    let { isAuthenticated, photo } = user;


    // return
    return (
        <Header>
            <HeaderTopbar>
                <span>
                    <IoPhonePortraitOutline />
                    <span>+880 9696 209784</span>
                </span>
                <span>
                    <IoMailOutline />
                    <span>info@gardeofy.com</span>
                </span>
                <span>
                    <IoLocationOutline />
                    <span>
                    956 Wellington Street, Toronto, CA
                    </span>
                </span>
            </HeaderTopbar>
            <HeaderContainer>
                <LogoArea>
                    <Link to='/'>
                    <span className="logo">grandeofy<span className="dot">.</span></span>
                    </Link>
                </LogoArea>

                <span className="menu_switch" onClick={togMenu}>
                    <CgMenu />
                </span>

                {
                    toggleMenu ? (
                        <MobileMenu
                            closer={togMenu}
                            status={toggleMenu}
                            isAuthenticated={isAuthenticated}
                            logoutFunction={logoutUser}
                        />
                    ) : (
                    <MenuArea>
                        <ul className="menus">
                            <li>
                                <Link to='/'>home</Link>
                            </li>
                            <li>
                                <Lnk spy={true} to='services'>services</Lnk>
                            </li>
                            <li>
                                <Lnk spy={true} to='testimonials'>testimonials</Lnk>
                            </li>
                            <li>
                                <Lnk spy={true} to='contact'>contact</Lnk>
                            </li>
                        </ul>

                        <ul className="btns_menu">
                            {
                                isAuthenticated === true ? (
                                    <>
                                        {
                                            photo === 'user.png' ?
                                            (<li>
                                                <img src={defaultUserImg} alt="user" />
                                            </li>) :
                                            (<li>
                                                <img src={photo} alt="user" />
                                            </li>)
                                        }
                                        <li><Link to='/dashboard'>dashboard</Link></li>
                                        
                                        <li onClick={logoutUser}>
                                            <span className="marked">logout</span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to='#contact'>get a quote</Link></li>
                                        <li><Link to='/login' className="marked">sign in</Link></li>
                                    </>
                                )
                            }
                        </ul>
                    </MenuArea>
                    )
                }
            </HeaderContainer>
        </Header>
    )
}

export default HeaderArea;