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
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
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

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required('שדה זה הוא חובה').min(2, 'שם חייב להכיל לפחות 2 תווים'),
    email: yup.string().email('כתובת מייל לא תקינה').required('שדה זה הוא חובה'),
    password: yup
    .string()
    .required('שדה זה הוא חובה')
    .test(
      'password',
      'הסיסמה חייבת לכלול לפחות אות קטנה אחת, אות גדולה אחת וחמישה מספרים',
      (value) => {
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /\d/g;
        const lowercaseMatch = lowercaseRegex.test(value);
        const uppercaseMatch = uppercaseRegex.test(value);
        const numberMatch = (value.match(numberRegex) || []).length >= 5;
        return lowercaseMatch && uppercaseMatch && numberMatch;
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const { name, email, password } = values;
      navigate('/test', { state: { name, email, password } });
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, background: 'transparent', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #ff53e7 80%,lightblue 35%)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            יצירת חשבון
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="שם"
                  autoFocus
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  {...formik.getFieldProps('name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="כתובת מייל"
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  {...formik.getFieldProps('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  {...formik.getFieldProps('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              יצירת חשבון
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn">{"יש לך כבר חשבון? התחבר"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;