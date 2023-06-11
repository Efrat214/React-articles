
import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  FormControl, InputLabel, MenuItem, Select, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Rtt } from '@mui/icons-material';
import axios from 'axios';



const AddCategoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [articles, setArticles] = useState(Array(10).fill({ file: null }));
  const [formDatas, setFormDatas] = useState(Array.from({ length: 10 }, () => new FormData()));
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [categories, setCategories] = useState([]);
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleArticleFileChange = (index, event) => {
    const file = event.target.files[0];
    const updatedArticles = [...articles];
    updatedArticles[index] = {
      ...updatedArticles[index],
      file: file,
      fileName: file ? file.name : '',
      hasPath: true,
    };
    setArticles(updatedArticles);
  };

  const handleAddArticle = () => {
    setArticles([...articles, { file: null, hasPath: false }]);
  };

  const handleRemoveArticle = (index) => {
    const updatedArticles = [...articles];
    updatedArticles.splice(index, 1);
    setArticles(updatedArticles);
  };

  const handleSaveCategory = () => {
    // Perform your save logic here
    console.log('Category Name:', selectedCategory.name);
    console.log('Category Name:', newCategory);
    console.log('Articles:', articles);
    setOpenDialog(true);

  };
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(value);
    console.log(selectedCategory);
    // Reset the new category field when selecting a different option
    if (value !== 'newCategory') {
      setNewCategory('');
    }
  };
  const onSubmit = () => {
    console.log();
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
  const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: 'Bearer your_token_here',
};
  const handleConfirmDialog = async () => {
    const formData1 = new FormData();
    debugger;
    // articles.forEach((article, index) => {
      formData1.append('Files', articles[0].file);
    // });
    // formData1.append('files',articles)
    if (newCategory === '') {
      formData1.append('Category', selectedCategory.name);
    } else {
      formData1.append('Category', newCategory);
    }
    setFormData(formData1);
    console.log(formData1.get('Category'));
    console.log(formData1.get('files'));
    try {
      const res = await axios.post("https://localhost:7193/api/Articels", formData1)
      console.log(res);
    }
    catch(ex) {
        console.log(ex);

    }
    setOpenDialog(false);
    // }
  }
  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the onSubmit callback with the selected category or new category
    const category = selectedCategory === 'newCategory' ? newCategory : selectedCategory;
    onSubmit(category);
    setOpenDialog(false);

    // Reset the form
    setSelectedCategory('');
    setNewCategory('');
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  return (
    <div>
      {/* <h2>Add Article</h2> */}
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="קטגוריה"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <MenuItem value="">-- בחירת קטגוריה--</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value="newCategory">קטגוריה חדשה</MenuItem>
            </Select>
          </FormControl>
        </div>
        {selectedCategory === 'newCategory' && (
          <div>
            <TextField
              label="שם הקטגוריה"
              value={newCategory}
              onChange={handleNewCategoryChange}
              required
            />
          </div>
        )}
        <div>
          <Typography variant="h5" component="h2">הוספת מאמרים</Typography>
          {articles.map((article, index) => (
            <div key={index}>
              {article.fileName && <Typography>{article.fileName}</Typography>}

              <Button variant="outlined" component="label">
                העלה
                <input
                  id="file-selector"
                  accept=".pdf"
                  onChange={(event) => handleArticleFileChange(index, event)}
                  multiple
                  hidden
                  type="file"
                />
                <UploadFileIcon />
              </Button>
              <Button variant="outlined" onClick={() => handleRemoveArticle(index)}>הסרת מאמר</Button>
            </div>
          ))}
          <div sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '50px' }}>
            <Button variant="outlined" onClick={handleAddArticle}>הוסף מאמר</Button>
            <Button variant="contained" color="primary" onClick={handleSaveCategory}>שמור מאמרים</Button>
          </div>
        </div>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ direction: 'rtl' }}>
        <DialogTitle>שמירת מאמרים</DialogTitle>
        <DialogContent>
          <p>האם אתה בטוח שברצונך לשמור את המאמרים?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>ביטול</Button>
          <Button onClick={handleConfirmDialog} variant="contained" color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCategoryScreen;
