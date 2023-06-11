import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Menu.css';
import logo from '../logo.png';
import updateLogo from '../updateLogo.png';
import { Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import GetAllCategories from './Getallcategories';
import ViewPdf from './pdfViewer';
import AddNewCategory from './ChooseNewArticale';
import welcome from '../welcome.mp4'
import Gif from '../Gif.gif'
import { useSelector } from 'react-redux';
import Profile from './Profile';
import UserTable from './UserTable';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import History from './History';
import AddCategoryScreen from './ChooseNewArticale';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [subscribe, stsubscribe] = useState()
  useEffect(() => {

  }, []);

  function handleEnded() {
    videoRef.current.play();
  }

  return (
    // <video width="640" height="360" muted autoPlay loop onEnded={handleEnded} style={{border: 'none'}}>
    <video
      src={welcome}
      ref={videoRef}
      autoPlay
      loop
      muted
      onEnded={handleEnded}
      style={{ border: 'none', width: '100%', height: '120%', top: 0 }}
    >
      <source src={welcome} type="video/mp4" />
    </video>
  );
}


export default function Menu1() {
  const [activeButton, setActiveButton] = useState('home');
  const user = useSelector(state => state.userSlice.currentUser);
  const navigate = useNavigate();

  console.log(user);

  const handleButtonClick = (buttonName) => {
    navigate(`${buttonName}`)
  };


  return <div className='allPage'>

    <div className='sideNavBar'>
      <img src={updateLogo} onClick={() => handleButtonClick('home')}/>
      <div>
        <IconButton className='itemInsideNavBar' onClick={() => handleButtonClick('myTabs')}>
          <Typography variant="button" sx={{ color: pink[300], marginLeft: '8px', fontSize: 20 }}>
            לימוד
          </Typography>
          <LocalLibraryIcon sx={{ color: pink[300] }} />
        </IconButton>
      </div>
      <div>
        <IconButton className='itemInsideNavBar' onClick={() => handleButtonClick('profile')}>
          <Typography variant="button" sx={{ color: pink[300], marginLeft: '8px', fontSize: 20 }}>
            פרופיל
          </Typography>
          <AccountCircleIcon sx={{ color: pink[300] }} />
        </IconButton>
      </div>
      <div>
        {user.isAdmin && (
          <IconButton className='itemInsideNavBar' onClick={() => handleButtonClick('user')}>
            <Typography variant="button" sx={{ color: pink[300], marginLeft: '8px', fontSize: 20 }}>
              ניהול משתמשים
            </Typography>
            <PeopleAltIcon sx={{ color: pink[300] }} />
          </IconButton>
        )}
      </div>
    </div>
  </div>
}


export function MyTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = useSelector(state => state.userSlice.currentUser);


  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="My tabs" textColor="secondary"
        indicatorColor="secondary" sx={{ color: pink[300], direction: 'rtl' }}>
        <Tab label="בחירה מתוך מאמרים קיימים" />
        <Tab label="בחירת מאמר חדש" />
        <Tab label="היסטוריית מאמרים" />
        {user.isAdmin && <Tab label="הוספת מאמרים" />}
      </Tabs>
      <div className='tab-content'>
        {value === 0 && <GetAllCategories />} {/* Render ExistingArticles component only when activeTab is 0 */}
        {value === 1 && <ViewPdf />}
        {value === 2 && <History />}
        {value === 3 && <AddCategoryScreen />}
      </div>
    </div>
  );
}

