import React from 'react'
import {Grid, Paper, Avatar,TextField, Button, Link, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = () => {
  const paperStyle = {padding: 20, height:'70vh',width:280,margin:'20px auto'}
  const avatarStyle = {backgroundColor: '#1bbd7e' };
  const btnStyle = {margin: '8px 0'}
  return (
    <Grid align='center'>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
          <TextField label="Email" placeholder="Enter your Email Id" variant="outlined" margin="normal" fullWidth required/>
          <TextField label="Password" placeholder="Enter your Password" type="password"  variant="outlined" margin="normal" fullWidth required/>
          <Button type="submit" style={btnStyle} color="primary" variant="contained" fullWidth>Sign In</Button>
          <Typography> Do you have an account?
            <Link href="#">Sign Up</Link>
          </Typography>
      </Paper>
    </Grid>
  )
}

export default LoginForm;
  