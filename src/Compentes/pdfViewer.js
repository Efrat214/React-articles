import { Label, LabelOffOutlined, SettingsPowerRounded, SettingsRemoteOutlined, Translate } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import EnglishToHebrewTranslator from './Translate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useSelector } from 'react-redux';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import axios from 'axios';

export default function ViewPdf() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [wordsList, setWordsList] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [categoryName, setCategoryName] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [res, setRes] = useState(false);
  const [notInLevel, setNotInLevel] = useState(false)
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.userSlice.currentUser);
  const [error, setError] = useState(false);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const fileURL = URL.createObjectURL(file);
    setUrl(fileURL);
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
    if (event.target.value.length >= 2) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleReadyClick = () => {
    setIsReady(true);
  };

  useEffect(() => {
    if (selectedFile) {
      const updatedFormData = new FormData();
      updatedFormData.append('file', selectedFile);
      updatedFormData.append('User', user.id);
      setFormData(updatedFormData);
      setIsLoading(true);

    }
  }, [selectedFile]);

  useEffect(() => {
    if (formData.has('file') && formData.has('User')) {
      console.log(formData.get('User'));
      console.log(formData);
      fetch('https://localhost:7193/api/Form', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File saved successfully.');
          setRes(true)
          setWordsList(data); // Update component's state with the list of words
          setIsLoading(false);
          console.log(isReady);
          if (data.length == 0) {
            setNotInLevel(true)
            setOpen(true)
          }
        })
        .catch((error) => {
          console.error('Error saving file:', error);
          setIsLoading(false);
        });
    }
  }, [formData]);

  const handleConfirmClick = () => {
    setOpen(false)
    setSelectedFile(null)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', top: '20px' }}>
      {selectedFile === null ?
        <>
          <TextField
            label="כותרת המאמר"
            value={categoryName}
            onChange={handleCategoryNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          {error && (
        <Typography variant="caption" color="error">
          הכותרת חייבת להכיל לפחות 2 תווים
        </Typography>
      )}
          <Button variant="contained" component="label">
            העלה מאמר
            <input
              id="file-selector"
              accept=".pdf"
              onChange={handleFileInputChange}
              multiple
              hidden
              type="file"
            /><UploadFileIcon />
          </Button>
        </>
        :
        isLoading ?
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
            <iframe src={url} title="PDF Viewer" width="100%" height="750px" />)
      }
    </div>
  );
}
