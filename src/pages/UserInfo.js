import React, { Component } from 'react'
import { TableBody, MenuItem, TableCell, InputLabel, Select, TableHead, Typography, TableRow, Table } from '@mui/material';
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

const useInfo = localStorage.getItem('details') ? JSON.parse(localStorage.getItem('details')) : []

export class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            id: '',
            current_id: localStorage.getItem("current_id") ? JSON.parse(localStorage.getItem("current_id")) : 0,
            name: "",
            description: "",
            counter: 0,
            users: [],
            usertype: '',
            editId: null,
        };
    };

    componentDidMount() {
        this.setState({
            users: JSON.parse(localStorage.getItem("users")) || [],
            // counter: JSON.parse(localStorage.setItem('counter', 1)) || 1
            // current_id: JSON.parse(localStorage.getItem("current_id")) || 0
        });
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('prevState::', prevState)

        if (prevState.current_id !== this.state.current_id) {
            this.renderUserList()
        }
    }

    renderUserList() {
        return this.state.users.length > 0 && this.state.users.map(({ id, name, description, usertype }, i) => (
            <TableBody>
                <TableRow key={id} >
                    <TableCell>{id}</TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>{name}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell style={{ textTransform: 'uppercase' }}>{usertype}</TableCell>
                    <Button variant='contained' onClick={() => this.handleEditOpen(id, name, description, usertype, i)}>Edit</Button>
                    <Button variant='contained' color='secondary'>Delete</Button>
                </TableRow>
            </TableBody>
        ))
    }

    handleEditOpen = (id, name, description, usertype, i) => {
        console.log("==============>", i)
        this.setState(() => ({
            open: true,
            name: name,
            description: description,
            usertype: usertype,
        }))
    }

    handleEdit = (e) => {
        e.preventDefault()
    }

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

    handleChange = (e) => {
        this.setState({
            usertype: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault()
        // setting an object

        const user = {
            id: this.state.current_id + 1,
            name: this.state.name.toLowerCase(),
            description: this.state.description,
            usertype: this.state.usertype
        };
        console.log('user::--------->', user)
        // add new user with existing users
        // const new_values = [...this.state.users, user]
        const validName = this.state.users.find(x => x.name.toLowerCase() === this.state.name.toLowerCase())
        if (validName) {
            alert("User already added")
        }
        else {
            this.setState(prevState => ({
                users: [...prevState.users, user],
                open: false,
                name: "",
                description: "",
                usertype: "",
                current_id: this.state.current_id + 1
            }), () => {
                localStorage.setItem("users", JSON.stringify(this.state.users));
                localStorage.setItem('current_id', this.state.current_id)
            })
        }
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
        console.log('current id:', this.state.current_id)

        console.log(useInfo)
        return (
            <div className='user'>
                <div className='user-info'>
                    <Button variant="contained" color="primary" size='small' onClick={this.handleOpen}>Add User</Button>
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
                                <Grid container
                                    direction="column"
                                    justify="center"
                                >
                                    <Typography htmlFor="name">Name: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="name"
                                        id="name"
                                        placeholder="Enter your Name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid container
                                    direction="column"
                                    justify="center">
                                    <Typography htmlFor="text">Job Description: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="description"
                                        id="description"
                                        placeholder="Enter your Job Description"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid container
                                    direction="column"
                                    justify="center">
                                    {/* <InputLabel id="demo-multiple-name-label">User Type</InputLabel>
                                    <Select
                                        displayEmpty
                                        values={this.state.values}
                                        onChange={this.handleChange}
                                    >
                                        {userInfo.map((user, index) => (
                                            <MenuItem key={index} >
                                                {user.type}
                                            </MenuItem>
                                        ))}
                                    </Select> */}
                                    <InputLabel id="demo-multiple-name-label">User Type</InputLabel>
                                    <Select
                                        onChange={this.handleChange}
                                        // onChange={() => console.log('test')}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {useInfo.map(({ type, index }) => (
                                            <MenuItem key={index} value={type} style={{ textTransform: 'uppercase' }}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                        {console.log("---------------->", this.state.details)}
                                    </Select>
                                </Grid>
                                {/* <Grid helperText={setError}></Grid> */}
                                <Grid marginTop='10px' display='flex' justifyContent='center'>
                                    <Button type="submit" variant="contained">Add User </Button>
                                </Grid>
                            </form>
                        </Box>
                    </Modal>

                    <Table >
                        <TableHead>
                            <TableRow className='user-head'>
                                <TableCell >ID</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Job Description</TableCell>
                                <TableCell >User Type</TableCell>
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

                        {this.renderUserList()}
                    </Table >
                </div >
            </div>
        )
    }
}

export default UserInfo