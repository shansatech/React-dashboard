import React, { Component } from 'react'
import { TableBody, TableCell, TableHead, Typography, TableRow, Table } from '@mui/material';
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
            usertype: "",
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
        return this.state.details.length > 0 && this.state.details.map(({ usertype, explanation, id }) => (
            <TableBody>
                <TableRow key={id} >
                    <TableCell>{id}</TableCell>
                    <TableCell style={{ textTransform: 'uppercase' }}>{usertype}</TableCell>
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

    // handleChange = (e) => {
    //     console.log("HI")
    //     this.setState({
    //         t: e.target.value
    //     })
    //     console.log("--------------->", e.target.value)
    // };

    handleSubmit = (e) => {
        e.preventDefault()
        // setting an object

        const detail = {
            id: this.state.usertype_id + 1,
            usertype: this.state.usertype.toUpperCase(),
            explanation: this.state.explanation,
        };
        console.log('detail::--------->', detail)
        // add new detail with existing details
        // const new_values = [...this.state.details, detail]
        const validName = this.state.details.find(x => x.usertype.toUpperCase() === this.state.usertype.toUpperCase())
        if (validName) {
            alert("detail already added")
        }
        else {
            this.setState(prevState => ({
                details: [...prevState.details, detail],
                open: false,
                usertype: "",
                explanation: "",
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
                                        name="usertype"
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
                        {this.state.details.length === 0 ? <Typography>No usertype found</Typography> : this.renderUserList()}
                    </Table >
                </div >
            </div>
        )
    }
}

export default UserInfo