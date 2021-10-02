import React from 'react'
import {Grid, Paper, Avatar,TextField, Button, Link, Typography} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const UserRegistrationForm = () => {
  const paperStyle = {padding: 20, height:'90vh',width:280,margin:'20px auto'}
  const avatarStyle = {backgroundColor: '#1bbd7e' };
  const headerStyle = {margin: '0px'};
  const btnStyle = {margin: '8px 0'}
  return (
    <Grid align='center'>
        <Paper elevation={10} style={paperStyle}>
            <Grid>
            <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon/></Avatar>
            <h2 style={headerStyle}>Sign Up</h2>
            <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </Grid>
            <form>
                <TextField label="First Name" placeholder="Enter your First Name" variant="outlined" margin="normal" fullWidth required/>
                <TextField label="Last Name" placeholder="Enter your Last Name" variant="outlined" margin="normal" fullWidth required/>
                <TextField label="Email" placeholder="Enter your Email Id" variant="outlined" margin="normal" fullWidth required/>
                <TextField label="Password" placeholder="Enter your Password" type="password"  variant="outlined" margin="normal" fullWidth required/>
                <TextField label="Confirm Password" placeholder="Enter your Confirm Password" type="password"  variant="outlined" margin="normal" fullWidth required/>
                <Button type="submit" style={btnStyle} color="primary" variant="contained" fullWidth>Sign In</Button>
            </form>
        </Paper>
    </Grid>
    )
}

export default UserRegistrationForm;
