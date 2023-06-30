import React, {useState, useContext} from 'react'
import Select from 'react-select';
import styled from 'styled-components'
import { BiHomeAlt } from "react-icons/bi";

import { AiOutlineFundProjectionScreen, AiOutlineTrophy, AiOutlineDotChart, AiOutlineBell, AiOutlineCaretDown } from "react-icons/ai";

import { BsCircleFill, BsBook, BsInfoCircle } from "react-icons/bs";
import Tooltip from '@material-ui/core/Tooltip';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Link } from "react-router-dom";
import avatarImage from "../assets/account-logo.png"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ToggleModeButton from '../components/ToggleModeButton';
import { ThemeContext } from '../contexts/ThemeContext';
import LogoPaci from '../components/Logo';
import ModalsCustomStyled from '../contexts/ModalsCustomStyled';

function Sidebar() {
    const { theme } = useContext(ThemeContext);
    const { mode } = theme;
    const [currentLink, setCurrentLink] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showChangeIDModal, setShowChangeIDModal] = useState(false);
    const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);
    const [showChangePWDModal, setShowChangePWDModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const options = [
        { value: 'account', label: 'Account' },
        { value: 'changeUsername', label: 'Genera username' },
        { value: 'changeid', label: 'Cambio id' },
        { value: 'changePassword', label: 'Cambio password' },
        // { value: 'logout', label: 'Logout' },
    ];
    

    const handleOptionSelect = (option) => {
        console.log(`Option selected:`, option);
        console.log(`Option selected:`, option.value);
        if (option && option.value) {
            setSelectedOption(option);
            console.log(`Option selected:`, option);
            console.log(`Option selected:`, option.value);
            if(selectedOption.value === 'account') setShowAccountModal(true);
            else if(selectedOption.value === 'changeUsername') setShowChangeUsernameModal(true);
            else if(selectedOption.value === 'changeid') setShowChangeIDModal(true);
            else if(selectedOption.value === 'changePassword') setShowChangePWDModal(true);
            setShowDropdown(false);
        }

    };

    const handleCloseModal = () => {
        setShowAccountModal(false);
        setShowChangeIDModal(false);
        setShowChangeUsernameModal(false);
        setShowChangePWDModal(false);
    };
    
    const handleLogout = async (event) => {
        // Perform logout logic here
        // Redirect the user to the login page
        event.preventDefault();
        try {
            const response = await axios.post('/logout');
            console.log(response.data);
            if(response.status === 200) {
                console.log("Logout successfull");
                navigate('/'); //direct redirect 
        
            }
            else {
                console.log("Logout failed");
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    const {
        MyGenericModal,
        MyGenericModalContent,
        MyButton,
        MuiCloseButton,
        MuiCustomDialog,
        MuiCustomButton,
        MuiCustomDialogTitle,
        MuiCustomDialogContent,
        MuiCustomDialogContentText,
        MuiCustomDialogActions,
        MuiCustomTextField,
        MuiCustomIconButton,
        MuiCustomInputAdornment,
        MuiCustomVisibility,
        MuiCustomVisibilityOff,
        MuiUseStyles,
    } = ModalsCustomStyled();



    const SidebarToggleModeButton = styled(ToggleModeButton)`
        padding: 6px 10px;
        font-size: 16px;
        gap: 2px;
    `;

    const Section = styled.section`
        font-family: Roboto, sans-serif;
        position: fixed;
        left: 0;
        background-color: ${theme.backgroundColor};
        height: 100vh;
        width: 6vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 0;
        gap: 2rem;
        .top{
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            .links {
            
                ul {
                
                    margin-bottom: 0.5rem;

                    .active {
                        border-right: 0.2rem solid black;
                    }
                    
                    .active a {
                        color: ${theme.buttonBackgroundColor};
                    }
                    
                    .active svg {
                        color: ${theme.buttonBackgroundColor};
                    }
                      
                    
                    li{
                        display: flex;
                        justify-content: center;
                        border-right: 0.2rem solid transparent;
                        margin: 1rem 0;
                        list-style-type: none;
                        a {   
                            text-decoration: none;
                            color: ${theme.textColor};
                            font-size: 1.6rem;
                            gap: 0 0.4rem;;
                        }
                        .noti{
                            display: flex;
                            margin-left: 21px;
                            span {
                                background-color: red;
                                font-size: 0.5rem;
                                border-radius: 50%;
                                padding: 2px 5px 2px 5px;
                                color: ${theme.textColor};
                                margin-bottom: 19px;
                                margin-top: -10px;
                            }
                        }
                        transition: 0.3s ease-in-out;
                        &:hover{
                            a {
                                color: ${theme.buttonBackgroundColor};
                            }
                        }
                    
                    }
                
                }
            }
        }
        .toggle-button {
            margin-left: 2rem; /* Distanza dal bordo sinistro */
            font-size: 1rem; /* Dimensioni del pulsante */
        }

        .notification{
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: 0.5rem;
            /*padding: 0.5rem 1rem;*/
            .font_icon{
                font-size: 1.5rem;
            }

            svg{
                color: ${theme.textColor};
            }

            .image {
                display: flex;
                gap: 1rem;
                img{
                    height: 2.5rem;
                    width: 2.5rem;
                    border-radius: 3rem;
                }
            }

            .account-image {
                height: 2rem;
                width: 2rem;
                border-radius: 3rem;
                background-color: white; /* Imposta il colore di sfondo dell'immagine */
            }

            .bell-icon {
                font-size: 2rem; /* Imposta la grandezza desiderata */
            }

            
            .dropdown-container {
                position: relative;
            }
            
            .dropdown-header {
                cursor: pointer;
            }
            
            .dropdown-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 200px;
                background-color: #fff;
                border: 2px solid #ccc;
                border-radius: 4px;
                padding: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .dropdown-option {
                padding: 6px;
                cursor: pointer;
            }
            
            .dropdown-option:hover {
                background-color: #f5f5f5;
            }
            
            .dropdown-option.selected {
                background-color: #007bff;
                color: #fff;
            }
            
            .dropdown-option.logout {
                margin-top: 8px;
                color: #dc3545;
            }

            .popup-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .popup-window {
                width: 400px;
                padding: 20px;
                background-color: white;
                border: 2px solid orange;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
            
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
            }
        }

        `
        ;

    return (
        <Section>
            <div className="top">
                    <LogoPaci />
                    <div className="links">
                        <ul>
                            <Tooltip title="Dashboard" placement="right">
                                <li
                                    className={currentLink === 1 ? "active" : ""}
                                    onClick={() => setCurrentLink(1)}
                                >
                                    <Link to="/dashboard">
                                        <BiHomeAlt />
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="I tuoi grafici" placement="right">
                                <li
                                    className={currentLink === 6 ? "active" : ""}
                                    onClick={() => setCurrentLink(6)}
                                >
                                    <Link to="/your-charts">
                                        <AiOutlineDotChart />
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="Inserimento dati" placement="right">
                                <li
                                    className={currentLink === 3 ? "active" : "none"}
                                    onClick={() => setCurrentLink(3)}
                                >
                                    <Link to="/insert-values">
                                        <HiOutlinePencilAlt />
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="Controlla i mercati" placement="right">
                                <li
                                    className={currentLink === 2 ? "active" : "none"}
                                    onClick={() => setCurrentLink(2)}
                                >
                                    <Link to="/check-prices">
                                        <AiOutlineFundProjectionScreen />
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="Classifica" placement="right">
                                <li
                                    className={currentLink === 5 ? "active" : "none"}
                                    onClick={() => setCurrentLink(5)}
                                >
                                    <Link to="/leaderboard">
                                        <AiOutlineTrophy />
                                    </Link>
                                </li>
                            </Tooltip>
                            
                            <Tooltip title="Conoscenze" placement="right">
                                <li
                                    className={currentLink === 7 ? "active" : "none"}
                                    onClick={() => setCurrentLink(7)}
                                >
                                    <Link to="/knowledge">
                                        
                                            <BsBook />
                                        
                                        
                                    </Link>
                                </li>
                            </Tooltip>
                            <Tooltip title="Info" placement="right">
                                <li
                                    className={currentLink === 8 ? "active" : "none"}
                                    onClick={() => setCurrentLink(8)}
                                >
                                    <Link to="/info">
                                        
                                            <BsInfoCircle/>
                                        
                                    </Link>
                                </li>
                            </Tooltip>
                          
                        </ul>
                    </div>
                        
                    <div className="notification">
                        <AiOutlineBell />
                        <div className="account-container">
                            <div className="account-image-wrapper">
                                <img src={avatarImage} alt="Account" className="account-image" />
                            </div>
                        </div>
                        <div className="dropdown-container">
                            <div className="dropdown-header" onClick={() => setShowDropdown(!showDropdown)}>
                                <AiOutlineCaretDown />
                            </div>
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    {options.map((option) => (
                                        <div
                                            key={option.value}
                                            className={`dropdown-option ${selectedOption === option ? 'selected' : ''}`}
                                            
                                            onClick={() => handleOptionSelect(option)} >
                                        
                                            {option.label}

                                            
                                        </div>
                                    ))}
                                    <div className="dropdown-option logout" onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                        {showPopup && (
                            <div className="popup-container">
                                <div className="popup-window">
                                <h3>{selectedOption.label}</h3>
                                {/* Add content for the popup here */}
                                </div>
                                <div className="overlay" onClick={() => setShowPopup(false)}></div>
                            </div>
                        )}
                        {showAccountModal && (
                            <MuiCustomDialog
                                open={showAccountModal}
                                onClose={handleCloseModal}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <MuiCustomDialogTitle id="alert-dialog-title">
                                    {"Profilo"}
                                </MuiCustomDialogTitle>
                                <MuiCustomDialogContent>
                                    <MuiCustomDialogContentText id="alert-dialog-description">
                                        Si è verificato un errore nell'accesso con il tuo account. <br></br>
                                        Controlla di digitare correttamente id e password.<br></br>
                                    </MuiCustomDialogContentText>
                                </MuiCustomDialogContent>
                                <MuiCustomDialogActions>
                                    <MuiCustomButton onClick={handleCloseModal} autoFocus>
                                        Ok, va bene
                                    </MuiCustomButton>
                                </MuiCustomDialogActions>
                            </MuiCustomDialog>
                        )}

                        {showChangeUsernameModal && (
                            <MuiCustomDialog
                                open={showChangeUsernameModal}
                                onClose={handleCloseModal}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <MuiCustomDialogTitle id="alert-dialog-title">
                                    {"GeneraUsername"}
                                </MuiCustomDialogTitle>
                                <MuiCustomDialogContent>
                                    <MuiCustomDialogContentText id="alert-dialog-description">
                                        Per aumentare la tua privacy e il tuo coinvolgimento <br></br>
                                        abbiamo pensato di creare un generatore di Username casuali e univoci.<br></br>
                                        La generazione sarà guidata da alcuni tuoi input. Se sarà necessario potrai cambiarlo in futuro.<br></br>
                                    </MuiCustomDialogContentText>
                                </MuiCustomDialogContent>
                                <MuiCustomDialogActions>
                                    <MuiCustomButton onClick={handleCloseModal} autoFocus>
                                        Genera Username
                                    </MuiCustomButton>
                                </MuiCustomDialogActions>
                            </MuiCustomDialog>
                        )}

                        {showChangeIDModal && (
                            <MuiCustomDialog
                                open={showChangeIDModal}
                                onClose={handleCloseModal}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <MuiCustomDialogTitle id="alert-dialog-title">
                                    {"Cambio ID"}
                                </MuiCustomDialogTitle>
                                <MuiCustomDialogContent>
                                    <MuiCustomDialogContentText id="alert-dialog-description">
                                        Per mantenere la tua privacy ti diamo la possibilità di <br></br>
                                        cambiare il tuo id, quando ne hai bisogno.<br></br>
                                        Il sistema genererà un nuovo id casuale e univoco.<br></br>
                                        Inserisci il tuo vecchio id e la tua password per confermare il cambio.<br></br>
                                    </MuiCustomDialogContentText>
                                </MuiCustomDialogContent>
                                <MuiCustomDialogActions>
                                    <MuiCustomButton onClick={handleCloseModal} autoFocus>
                                        Voglio cambiare id
                                    </MuiCustomButton>
                                </MuiCustomDialogActions>
                            </MuiCustomDialog>
                        )}

                        {showChangePWDModal && (
                            <MuiCustomDialog
                                open={showChangePWDModal}
                                onClose={handleCloseModal}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <MuiCustomDialogTitle id="alert-dialog-title">
                                    {"Cambio Password"}
                                </MuiCustomDialogTitle>
                                <MuiCustomDialogContent>
                                    <MuiCustomDialogContentText id="alert-dialog-description">
                                        Per cambiare la tua password ti chiediamo di inserire <br></br> 
                                        la tua email usata in fase di registrazione e il tuo id. <br></br>
                                        TI invieremo un'email con un link per il cambio password.<br></br>
                                    </MuiCustomDialogContentText>
                                </MuiCustomDialogContent>
                                <MuiCustomDialogActions>
                                    <MuiCustomButton onClick={handleCloseModal} autoFocus>
                                        Ok, va bene
                                    </MuiCustomButton>
                                </MuiCustomDialogActions>
                            </MuiCustomDialog>
                        )}

                    </div>

                    <div className="toggle-button">
                        <SidebarToggleModeButton />
                    </div>
            </div>
        </Section>
  );
}

export default Sidebar