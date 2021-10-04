import React from 'react';
import {Grid, Paper, Avatar,TextField, Button, Typography,Link} from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Formik,Form,Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const paperStyle = {padding: 20, height:'70vh',width:280,margin:'20px auto'}
  const avatarStyle = {backgroundColor: '#1bbd7e' };
  const btnStyle = {margin: '8px 0'}
  const initialValues = {
    email:'',
    password:''
  }

  const onSumbit=(values,props) => {
    console.log(values);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a email').required(),
    password: Yup.string().required('Enter a password')
  })
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={onSumbit} validationSchema={validationSchema}>
         
          {(props)=> (
            <Form>
              {console.log(props)}
              <Field as={TextField} label="Email" name="email" 
              placeholder="Enter your Email Id" variant="outlined" margin="normal" fullWidth
              helperText={<ErrorMessage name="email"/>}
              />
              <Field as={TextField} label="Password" name="password" 
              placeholder="Enter your Password" type="password"  variant="outlined" margin="normal" fullWidth
              helperText={<ErrorMessage name="password"/>}/>
              <Button type="submit" style={btnStyle} color="primary" variant="contained" fullWidth>Sign In</Button>
            </Form>
          )}
        </Formik>
        <Typography> Do you have an account?
          <Link href="/UserRegisteration/">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default LoginForm;
  