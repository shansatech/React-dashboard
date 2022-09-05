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
            usertype: '',
            counter: 0,
            users: [],
            editOpen: false,
            editName: '',
            editDescription: '',
            editUsertype: '',
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
        if (this.state.users.length === 0) {
            return <Typography>No user found</Typography>
        }
        return this.state.users.length > 0 && this.state.users.map(({ id, name, description, usertype }, i) => (
            <TableBody>
                <TableRow key={id} >
                    <TableCell>{id}</TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>{name}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell style={{ textTransform: 'uppercase' }}>{usertype}</TableCell>
                    <Button variant='contained' onClick={() => this.handleEditOpen(id, name, description, usertype)}>Edit</Button>
                    <Modal
                        open={this.state.editOpen}
                        onClose={this.handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <form onSubmit={(e) => this.handleEditSubmit(e)}>
                                <Typography variant='h4' color='primary' display='flex' justifyContent='center'>Edit User</Typography>
                                {/* {(error !== '') ? (<div>{error}</div>) : ''} */}
                                <Grid container
                                    direction="column"
                                    justify="center"
                                >
                                    <Typography htmlFor="name">Name: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="editName"
                                        id="name"
                                        placeholder="Enter your Name"
                                        value={this.state.editName}
                                        onChange={this.handleEditChange}
                                    />
                                </Grid>
                                <Grid container
                                    direction="column"
                                    justify="center">
                                    <Typography htmlFor="text">Job Description: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="editDescription"
                                        id="description"
                                        placeholder="Enter your Job Description"
                                        value={this.state.editDescription}
                                        onChange={this.handleEditChange}
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
                                        onChange={this.handleEditChange}
                                        // onChange={() => console.log('test')}
                                        name="editUsertype"
                                        value={this.state.editUsertype}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {useInfo.map(({ usertype, index }) => (
                                            <MenuItem key={index} value={usertype} style={{ textTransform: 'uppercase' }}>
                                                {usertype}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </Grid>
                                {/* <Grid helperText={setError}></Grid> */}
                                <Grid marginTop='10px' display='flex' justifyContent='center'>
                                    <Button type="submit" variant="contained">Save Changes</Button>
                                </Grid>
                            </form>
                        </Box>
                    </Modal>
                    <Button variant='contained' color='secondary' onClick={() => this.handleDelete(id)}>Delete</Button>
                </TableRow>
            </TableBody >
        ))
    }

    handleEditOpen = (id, name, description, usertype) => {
        console.log("==============>", usertype)
        this.setState(() => ({
            editId: id,
            editOpen: true,
            editName: name,
            editDescription: description,
            editUsertype: usertype,
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
            open: false,
            editOpen: false
        })
    };

    handleInputChange = (e) => {
        // e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

    };

    handleEditChange = (e) => {
        // e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
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

    handleEditSubmit = (e) => {
        e.preventDefault()
        // setting an object

        const editUser = {
            id: this.state.editId,
            name: this.state.editName.toLowerCase(),
            description: this.state.editDescription,
            usertype: this.state.editUsertype,
        };
        console.log(">>>>>>>->>>>>>>>>->>>>>>>>", this.state.editUsertype)
        // add new user with existing users
        // const new_values = [...this.state.users, user]

        const editName = this.state.users.find(x => x.name.toLowerCase() === this.state.editName.toLowerCase() && x.id !== this.state.editId)
        const index = this.state.users.findIndex(x => x.id === this.state.editId)
        // const sameName = this.state.users.find(x => x.name.toLowerCase() === this.state.name.toLowerCase())
        // console.log("index here", index)
        // console.log("splice here~~~>", this.state.users.splice(index, 1, editUser))

        if (editName) {
            alert("User already added")
        }
        else {
            this.state.users.splice(index, 1, editUser)
            this.setState(({
                users: this.state.users,
                editOpen: false,
                name: "",
                description: "",
                usertype: "",
            }), () => {
                console.log('state::', this.state.users)
                localStorage.setItem("users", JSON.stringify(this.state.users));
            })
        }
    }

    handleDelete = (id) => {
        console.log("kkkkkkkkkkkkkk", id)
        const deleteUser = this.state.users.filter(x => x.id !== id)
        this.setState({ users: deleteUser })
        console.log("--->---->--->", deleteUser)
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
        console.log("editUsertype ====>", this.state.editUsertype)
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
                                        onChange={this.handleEditChange}
                                        // onChange={() => console.log('test')}
                                        name="usertype"
                                        value={this.state.usertype}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {useInfo.map(({ usertype, index }) => (
                                            <MenuItem key={index} value={usertype} style={{ textTransform: 'uppercase' }}>
                                                {usertype}
                                            </MenuItem>
                                        ))}
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