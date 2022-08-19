import React, { Component } from 'react'
import userInfo from './Users'
import { v4 as uuid } from 'uuid';
import { TableBody, TableCell, TableHead, Typography, TableRow, Table } from '@mui/material';
import NestedModal from '../components/Model';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField, Grid } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            id: '',
            current_id: localStorage.getItem("current_id") ? JSON.parse(localStorage.getItem("current_id")) : 0,
            name: "",
            description: "",
            error: '',
            users: []
        };
    };

    componentDidMount() {
        this.setState({
            users: JSON.parse(localStorage.getItem("users")) || [],
            // current_id: JSON.parse(localStorage.getItem("current_id")) || 0
        });
    };

    handleOpen = () => {
        this.setState({
            open: true,
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handleInputChange = (e) => {
        // e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        console.log('namess', this.state.name)
        e.preventDefault()
        // setting an object
        const user = {
            id: this.state.current_id + 1,
            name: this.state.name,
            description: this.state.description
        };
        // add new user with existing users
        // const new_values = [...this.state.users, user]
        const validName = this.state.users.find(x => x.name === this.state.name)
        if (validName) {
            alert("User already added")
        }
        else {
            this.setState(prevState => ({
                users: [...prevState.users, user],
                open: false,
                name: "",
                description: "",
            }), () => {
                localStorage.setItem("users", JSON.stringify(this.state.users));
                localStorage.setItem('current_id', JSON.stringify(this.state.current_id + 1))
            })

        }
        console.log("current_id", this.state.current_id + 1)
        console.log('users', this.state.users)
    }

    // after updating, change the dialog box into empty and updated value stored with old items

    //     const validName = this.state.users.find(x => x.name === this.state.name)
    //     if (validName) {
    //         alert("User already added")
    //     }
    //     else {
    //         this.setState(prevState => ({
    //             users: [...prevState.users, user],
    //             open: false,
    //             name: '',
    //             description: ''
    //         },
    //             () => {
    //                 localStorage.setItem("users", JSON.stringify(this.state.users));
    //                 localStorage.setItem('current_id', JSON.stringify(this.state.current_id + 1))
    //             }))
    //     }

    // }

    render() {
        return (
            <div className='user'>
                <div className='user-info'>

                    <Button variant="contained" color="primary" onClick={this.handleOpen} >Add User</Button>
                    <Modal
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                <Typography variant='h4' color='primary' display='flex' justifyContent='center'>Add New User</Typography>
                                {/* {(error !== '') ? (<div>{error}</div>) : ''} */}
                                <Grid >
                                    <Typography htmlFor="name">Name: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid>
                                    <Typography htmlFor="text">Job Description: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="description"
                                        id="description"
                                        placeholder="Enter job description"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                {/* <Grid helperText={setError}></Grid> */}
                                <Grid marginTop='10px' display='flex' justifyContent='center'>
                                    <Button type="submit" variant="contained">Add User </Button>
                                </Grid>
                            </form>
                        </Box>
                    </Modal>

                    <Table >
                        <TableHead >
                            <TableRow className='user-head'>
                                <TableCell >ID</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Job Description</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* {userInfo.length !== 0 ? <TableBody>
                        {userInfo.map((user, index) => (
                            <tr key={index}>
                                <td><span>{user.id}</span></td>
                                <td><span>{user.name}</span></td>
                                <td><span>{user.description}</span></td>
                            </tr>
                        ))}
                    </TableBody> : null} */}

                        {this.state.users.length !== 0 ? <TableBody>
                            {this.state.users.map(({ name, description, id }) => (
                                <TableRow key={id} >
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> : null}
                    </Table >
                </div >
            </div>
        )
    }
}

export default UserInfo