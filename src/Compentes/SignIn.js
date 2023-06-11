import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import SignUp from './SignUp'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  // const [user, setUser] = React.useState()
  let user = useSelector(state => state.userSlice.currentUser)
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [response, setResponse] = React.useState('')
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const u = useSelector((state)=>state.user.currentUser)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    setPassword(data.get('password'))
    const email = data.get('email')
    debugger
    let res = await dispatch(login(email))
    setResponse(res)
  };
  React.useEffect(() => {
    if (response) {
      console.log(response);
      if (response.meta.requestStatus === 'fulfilled') {
        if (response.payload) {
          // User exists
          if (response.payload.password === password)
            navigate('/menu')
          else {
            setShowError(true);
            setErrorMessage('משתמש לא קיים');
          }
        } else {
          setShowError(true);
          setErrorMessage('משתמש לא קיים');
        }
      }
      else {
        console.log('Login failed');
      }
    }
  }, [response])
  return (
    <ThemeProvider theme={theme}>
      {/* <h1>{u.name}</h1> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              width: 56,
              height: 56,
              background: 'transparent',
              backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #ff53e7 80%,lightblue 35%)',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="כתובת מייל"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              התחברות
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup">{"אין לך עדיין חשבון?הירשם"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

    </ThemeProvider>
  );
}


function xxx() {
  return <div>
    <div className='side'></div>
    <div className='main'></div>

  </div>
}
