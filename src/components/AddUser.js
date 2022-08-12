// import React, { Component } from 'react'
// import { Grid, TextField, Button, Typography } from '@mui/material'
// import userInfo from '../pages/Users';

// export class AddUser extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             name: "",
//             description: "",
//         };

//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleInputChange(event) {
//         event.preventDefault();
//         const target = event.target;
//         this.setState({
//             [target.name]: target.value,
//         });
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         console.log('User added or not. Refresh the page')
//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <Typography variant='h4' color='primary' display='flex' justifyContent='center'>Add New User</Typography>
//                     {/* {(error !== '') ? (<div>{error}</div>) : ''} */}
//                     <Grid >
//                         <Typography htmlFor="name">Name: </Typography>
//                         <TextField
//                             type="text"
//                             required
//                             name="name"
//                             id="name"
//                             placeholder="Enter your name"
//                             value={this.state.name}
//                             onChange={this.handleInputChange}
//                         />
//                     </Grid>
//                     <Grid>
//                         <Typography htmlFor="text">Job Description: </Typography>
//                         <TextField
//                             type="text"
//                             required
//                             name="description"
//                             id="description"
//                             placeholder="Enter job description"
//                             value={this.state.description}
//                             onChange={this.handleInputChange}
//                         />
//                     </Grid>
//                     {/* <Grid helperText={setError}></Grid> */}
//                     <Grid marginTop='10px' display='flex' justifyContent='center'>
//                         <Button type="submit" variant="contained" >Add User</Button>
//                     </Grid>
//                 </form>
//             </div>
//         )
//     }
// }

// export default AddUser