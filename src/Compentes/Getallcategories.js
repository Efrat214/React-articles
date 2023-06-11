import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ArticleCard from "./GetAllArticals";
import { pageNumber, Document, Page } from 'react-pdf'
import { useSelector } from "react-redux";

export default function GetAllCategories() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [articels, setArticels] = useState([]);
  const [showArticles, setShowArticles] = useState(false);
  const [selectedArticel, setSelectedArticel] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector(state => state.userSlice.currentUser);

  const handleButtonClick = (category) => {
    debugger
    setCategory(category.name)
    console.log(category.name);
    setShowArticles(true);
    axios.get(`https://localhost:7193/api/Articels/category/${category.Name}`, { params: category })
      .then((response) => {
        console.log(response.data);
        setArticels(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(()=>{
if(category)
console.log(category);
  },[category])
  const btn = categories.map(x => {
    return <Button variant="outlined" key={x.id} onClick={() => handleButtonClick(x)} sx={{ margin: 2 }}>{x.name}</Button>
  })
  const handleConfirmClick=()=>{
    axios.delete(`https://localhost:7193/api/Form/${selectedArticel}`)
    .then(response => {
      // File successfully deleted
      console.log('File deleted successfully.');
      // Handle any further actions or UI updates
    })
    .catch(error => {
      // Failed to delete file
      console.error('Error deleting file:', error);
      // Handle error or display error message
    });
    setIsLoading(false);
  }
  const articless = articels.map((article) => (
    <div style={{ margin: '80px' }} key={article.id}>
      <ArticleCard item={article} categoryy={category} />
    </div>
  ));
  const handleArticelChange = (event) => {
    const selectedValue = event.target.value;
    console.log(event.target.value);
    setSelectedArticel(selectedValue);
    setIsLoading(true)
  }
  useEffect(() => {
    axios.get('https://localhost:7193/api/Categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleCancelClick = () => {
    setIsLoading(false);
    // Reset the form or revert changes if needed
  };
  return (
    <div  >
      {showArticles ? (
        <>
          <div>
            {user.isAdmin && (
              <FormControl fullWidth>
                <InputLabel id="category-label">מאמר למחיקה</InputLabel>
                <Select value={selectedArticel} onChange={handleArticelChange}>
                  <MenuItem value="">-- בחירת מאמר למחיקה--</MenuItem>
                  {articels.map((articel, index) => (
                    <MenuItem key={index} value={articel.title}>{articel.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

          </div>
          {articless}
          <Dialog open={isLoading} sx={{ direction: 'rtl' }}>
            <DialogTitle>מחיקת מאמר</DialogTitle>
            <DialogContent>
              <p>האם אתה בטוח שברצונך למחוק את המאמר?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelClick}>ביטול</Button>
              <Button variant="contained" color="primary" onClick={handleConfirmClick}>
                אישור
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <div>{btn}</div>
        </>

      )}

    </div>
  );
}



const DownloadPdf = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    axios.post('https://localhost:7013/api/Articels', {}, { responseType: 'arraybuffer' })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {pdfUrl && (
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  );
};


