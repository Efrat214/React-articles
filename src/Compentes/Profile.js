import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Container,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog
} from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const user = useSelector(state => state.userSlice.currentUser);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.mail);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [valid,setValid]=useState(true)
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    if(nameError==''&&passwordError==''&&emailError=='')
    {
      setEditMode(false);
      // Perform save/update logic here
      setOpenDialog(true);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset the form or revert changes if needed
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        break;
    }
     // Check for empty name
  if (name === 'name' && value.trim() === '') {
    setNameError('שדה שם הוא חובה');
    setValid(false)
  } else if (name === 'name' && value.length< 2) {
    setNameError('שם חייב לכלול לפחות 2 תווים');
    setValid(false)
  } else {
    setNameError('');
  }
 
  
  if (name === 'password' && value.trim() === '') {
    setPasswordError('שדה חובה');
    setValid(false);
  } else if (name === 'password') {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/g;
    const lowercaseMatch = lowercaseRegex.test(value);
    const uppercaseMatch = uppercaseRegex.test(value);
    const numberMatch = (value.match(numberRegex) || []).length >= 5;

    if (!(lowercaseMatch && uppercaseMatch && numberMatch)) {
      setPasswordError('הסיסמה חייבת לכלול לפחות אות קטנה אחת, אות גדולה אחת וחמישה מספרים');
      setValid(false);
    } else {
      setPasswordError('');
    }
  }
  if (name === 'email' && value.trim() === '') {
    setEmailError('שדה חובה');
    setValid(false);
  } else if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
  
    if (!isValidEmail) {
      setEmailError('כתובת האימייל אינה תקינה');
      setValid(false);
    } else {
      setEmailError('');
    }
  }
}
  const handleConfirmDialog = () => {
    const updatedUser = {
      ...user,
      name: name,
      password: password,
      mail: email
    };

    axios.put(`https://localhost:7193/api/Users/${user.id}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        setOpenDialog(false);

      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            פרטי משתמש
          </Typography>
          <form>
            <TextField
              label="שם"
              name="name"
              value={name}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              margin="normal"
              width="80%"
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              label="סיסמה"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              label="אימייל"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              disabled={!editMode}
              fullWidth
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />
            {editMode ? (
              <Box mt={2}>
                <Button onClick={handleSaveClick} variant="contained" color="primary">
                  אישור
                </Button>
                <Button onClick={handleCancelClick} color="secondary">
                  ביטול
                </Button>
              </Box>
            ) : (
              <Box mt={2}>
                <Button onClick={handleEditClick} variant="contained" color="primary">
                  עריכה
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ direction: 'rtl' }}>
        <DialogTitle>עריכת פרטי משתמש</DialogTitle>
        <DialogContent>
          <p>האם אתה בטוח שברצונך לשנות את פרטי המשתמש?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>ביטול</Button>
          <Button variant="contained" color="primary" onClick={handleConfirmDialog}>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
