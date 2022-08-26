import React, { Component } from 'react'
import userInfo from './Users'
import { v4 as uuid } from 'uuid';
import { TableBody, MenuItem, TableCell, InputLabel, Select, TableHead, Typography, TableRow, Table } from '@mui/material';
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
            usertype_id: localStorage.getItem("usertype_id") ? JSON.parse(localStorage.getItem("usertype_id")) : 0,
            type: "",
            explanation: "",
            error: '',
            counter: 0,
            details: [],
        };
    };

    componentDidMount() {
        this.setState({
            details: JSON.parse(localStorage.getItem("details")) || [],
            // counter: JSON.parse(localStorage.setItem('counter', 1)) || 1
            // usertype_id: JSON.parse(localStorage.getItem("usertype_id")) || 0
        });
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('prevState::', prevState)

        if (prevState.usertype_id !== this.state.usertype_id) {
            this.renderUserList()
        }
    }


    renderUserList() {
        return this.state.details.length > 0 && this.state.details.map(({ type, explanation, id }) => (
            <TableBody>
                <TableRow key={id} >
                    <TableCell>{id}</TableCell>
                    <TableCell style={{ textTransform: 'uppercase' }}>{type}</TableCell>
                    <TableCell>{explanation}</TableCell>
                </TableRow>
            </TableBody>
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

    handleChange = (e) => {
        console.log("HI")
        this.setState({
            usertype: e.target.value
        })
        console.log("--------------->", e.target.value)
    };

    handleSubmit = (e) => {
        e.preventDefault()
        // setting an object

        const detail = {
            id: this.state.usertype_id + 1,
            type: this.state.type.toUpperCase(),
            explanation: this.state.explanation,
        };
        console.log('detail::--------->', detail)
        // add new detail with existing details
        // const new_values = [...this.state.details, detail]
        const validName = this.state.details.find(x => x.type.toUpperCase() === this.state.type.toUpperCase())
        if (validName) {
            alert("detail already added")
        }
        else {
            this.setState(prevState => ({
                details: [...prevState.details, detail],
                open: false,
                type: "",
                explanation: "",
                usertype: "",
                usertype_id: this.state.usertype_id + 1
            }), () => {
                localStorage.setItem("details", JSON.stringify(this.state.details));
                localStorage.setItem('usertype_id', this.state.usertype_id)
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
                                    <Typography htmlFor="name">User Type: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="type"
                                        id="type"
                                        placeholder="Enter User Type"
                                        value={this.state.type}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                <Grid container
                                    direction="column"
                                    justify="center">
                                    <Typography htmlFor="text">Explanation: </Typography>
                                    <TextField
                                        type="text"
                                        required
                                        name="explanation"
                                        id="explanation"
                                        placeholder="Enter your Explanation"
                                        value={this.state.explanation}
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
                                <TableCell >User Type</TableCell>
                                <TableCell >Explanation</TableCell>
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