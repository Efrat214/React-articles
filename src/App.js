import logo from './logo.svg';
import './App.css';
import aa from './aa.jpg'
// import Hello from './Compentes/Hello';
import React, { useState, PureComponent, useEffect } from "react";
import SignUp from './Compentes/SignUp'
import SignIn from './Compentes/SignIn';
import Layout from './Compentes/Layout'
import Menu1, { MyTabs } from './Compentes/Menu'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import EnglishToHebrewTranslator from './Compentes/Translate';
import GetAllCategories from './Compentes/Getallcategories';
import ViewPdf from './Compentes/pdfViewer';
import GetAllArticals from './Compentes/GetAllArticals';
import AddNewCategory from './Compentes/ChooseNewArticale';
import Test from './Compentes/Test'
import DownloadPdf from './Compentes/viewerPDF';
import Profile from './Compentes/Profile';
import UserTable from './Compentes/UserTable';
import History from './Compentes/History';



function App() {
  const user = useSelector(state => state.userSlice.currentUser);
  return (
    <div>
      {user ?
        <Grid container spacing={3} t={1}>
          <Grid container item spacing={2} xs="auto" >
            <Menu1/>
          </Grid>
          <Grid container item spacing={2} xs="auto">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route element={<SignIn />} />
                <Route path="home" element={<Home />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="pdf" element={<UploadFile />} />
                <Route path='pdfff' element={<DownloadPdf />}></Route>
                <Route path="test" element={<Test />} />
                <Route path="menu" element={<Menu1 />} />
                <Route path="translate" element={<EnglishToHebrewTranslator />} />
                <Route path="getallcategories" element={<GetAllCategories />} />
                <Route path="viewpdf" element={<ViewPdf />} />
                <Route path="GetAllArticals" element={<GetAllArticals />} />
                <Route path="addCategory" element={<AddNewCategory />} />
                <Route path="myTabs" element={<MyTabs />} />
                <Route path="table" element={<ExampleComponent />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="user" element={<UserTable />}></Route>
                <Route path="history" element={<History />}></Route>
              </Route>
            </Routes>
          </Grid>
        </Grid>
        :
        <>
          <SignIn />
        </>
      }
    </div>
  );
};
