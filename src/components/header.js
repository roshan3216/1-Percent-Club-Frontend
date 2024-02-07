import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from "react-router-dom";
import { logout } from "../api";

const Header = () =>{

    const accessToken = localStorage.getItem('accessToken');
    const [name, setName] = useState('Username');
    const navigate = useNavigate();

    useEffect(() =>{
        if(accessToken){
            const token = accessToken.split('.')[1];
            const jwt = JSON.parse(atob(token));
            const email = jwt.email;
            const emailString = email.split('@')[0];
            const name = emailString.charAt(0).toUpperCase() + emailString.slice(1);    
            setName(name);
        }

    },[accessToken]);

    const handleLogout = async(e) =>{
        console.log(e,'[e]-[handleLogout]');
        try {
            const resp = await logout();
            console.log(resp.data,'[resp.data]-[logout]-[handleLogout]');
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (err) {
            console.error(err, '[error in logout]-[handleLogout]');
        }
    }


    return (
        <div className="header">
            <div>
                <img height='40px' width='100%' src = "https://assets-global.website-files.com/64bd17c976f02c3a8c8e76ec/64bd18f2d95372adf57afd1c_1%25%20logo.svg" alt = 'logo' />

            </div>

            <div className="header-content">
                <div className="name">
                    {name}
                </div>
                <Avatar sx={{ bgcolor: '#b2b5c6' }}>
                    <AccountCircleOutlinedIcon/>
                </Avatar>
                <button className="button" onClick={handleLogout}><LogoutOutlinedIcon style={{color:"#2c84ce"}} /></button>
                
            </div>
        </div>
    )
}

export default Header;