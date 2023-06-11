import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import { Button, DialogActions, IconButton } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import EnglishToHebrewTranslator from './Translate';
import { useSelector } from 'react-redux';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';


const DownloadPdf = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const pdfUrl1 = 'http://localhost:8081';
  const [activeButton, setActiveButton] = useState('myTabs');
  const user = useSelector(state => state.userSlice.currentUser);
  const navigate = useNavigate()
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    navigate('/menu')
  };
  const location = useLocation();
  const { article, category } = location.state;

  useEffect(() => {
    const pdff = `${pdfUrl1}/${category}/${article.title}.pdf`;
    setPdfUrl(pdff);
  }, []);

  return (
    <div>
      <GetWords art={article} link={article.link} url={pdfUrl} />
    </div>

  );
};

export default DownloadPdf;

const GetWords = (props) => {
  const [wordsList, setWordsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [notInLevel, setNotInLevel] = useState(false)
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.userSlice.currentUser);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    axios.post(`https://localhost:7193/api/Vocabulary?artId=${props.art.id}&userId=${user.id}`)
      .then(response => {
        setWordsList(response.data);
        setIsLoading(false)
        if (response.data == 0) {
          setNotInLevel(true)
          setOpen(true)
        }

      })
      .catch(error => {
        console.error(error);
      });

  }, []);
  useEffect(() => {
    console.log(notInLevel);
  }, [notInLevel])

  const handleReadyClick = () => {
    setIsReady(true);
  };

  const handleConfirmClick = () => {
    setOpen(false)
  }
  return (
    <>
      {isLoading ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <Dialog open={isLoading} sx={{ direction: 'rtl' }}>
            <DialogTitle>עיבוד הנתונים</DialogTitle>
            <DialogContent>
              <CircularProgress />
              <Typography variant="body1" style={{ marginLeft: '8px' }}>
                מעבד את הנתונים...
              </Typography>
            </DialogContent>
          </Dialog>

        </div>
        : notInLevel ? (
          <div>
            <Dialog open={open} sx={{ direction: 'rtl' }}>
              <DialogTitle>בחירת מאמר אחר</DialogTitle>
              <DialogContent>
                <p>המאמר הנבחר אינו תואם את רמתך מומלץ לבחור מאמר אחר</p>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={handleConfirmClick}>
                  אישור
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : !isReady ? (
          <>
            <EnglishToHebrewTranslator wordsList={wordsList} />
            <Button
              variant="outlined"
              onClick={handleReadyClick}
              style={{
                width: '30%',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DoneOutlineIcon />
              אני מוכן
            </Button>

          </>
        ) : (
          <iframe src={props.url} title="PDF Viewer" width="100%" height="750px" />)
      }
    </>
  );
}