import React, { Component } from 'react'
import userInfo from './Users'
import { v4 as uuid } from 'uuid';
import { TableCell, TableHead, Typography, TableRow, Table } from '@mui/material';
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

export class UserType extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            id: '',
            present_id: localStorage.getItem("present_id") ? JSON.parse(localStorage.getItem("present_id")) : 0,
            name: "",
            description: "",
            error: '',
            counter: 0,
            persons: []
        };
    };

    componentDidMount() {
        this.setState({
            persons: JSON.parse(localStorage.getItem("persons")) || [],
            // counter: JSON.parse(localStorage.setItem('counter', 1)) || 1
            // present_id: JSON.parse(localStorage.getItem("present_id")) || 0
        });
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('prevState::', prevState)

        if (prevState.present_id !== this.state.present_id) {
            this.renderUserList()
        }
    }


    renderUserList() {
        return this.state.persons.length > 0 && this.state.persons.map(({ name, description, id }) => (
            <TableRow key={id} >
                <TableCell>{id}</TableCell>
                <TableCell style={{ textTransform: 'capitalize' }}>{name}</TableCell>
                <TableCell>{description}</TableCell>
            </TableRow>
        ))
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

    handleSubmit = (e) => {
        e.preventDefault()
        // setting an object

        const person = {
            id: this.state.present_id + 1,
            name: this.state.name.toLowerCase(),
            description: this.state.description
        };
        console.log('user::', person)
        // add new user with existing persons
        // const new_values = [...this.state.persons, user]
        const validName = this.state.persons.find(x => x.name.toLowerCase() === this.state.name.toLowerCase())
        if (validName) {
            alert("User already added")
        }
        else {
            this.setState(prevState => ({
                persons: [...prevState.persons, person],
                open: false,
                name: "",
                description: "",
                present_id: this.state.present_id + 1
            }), () => {
                localStorage.setItem("persons", JSON.stringify(this.state.persons));
                localStorage.setItem('present_id', this.state.present_id)
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
    //                 localStorage.setItem('present_id', JSON.stringify(this.state.present_id + 1))
    //             }))
    //     }

    // }

    render() {
        console.log('current id:', this.state.present_id)
        return (
            <div className='user'>
                <div className='user-info'>
                    <Button variant="contained" color="primary" size='small' onClick={this.handleOpen}>Add Person</Button>
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

export default UserType