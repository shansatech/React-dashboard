import * as React from 'react';
import { Component } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField, Grid, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid'

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


export default class NestedModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            id: uuid(),
            name: "",
            description: "",
            users: []
        };
    };

    componentDidMount() {
        this.setState({
            users: JSON.parse(localStorage.getItem("users")) || []
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
        e.preventDefault()
        console.log('hi')

        // setting an object
        const user = {
            id: uuid(),
            name: this.state.name,
            description: this.state.description
        };

        // add new user with existing users

        const new_values = [...this.state.users, user];

        // after updating, change the dialog box into empty and updated value stored with old items.

        this.setState({
            users: new_values,
            open: false,
            name: "",
            description: ""
        }, () => {
            localStorage.setItem("users", JSON.stringify(new_values));
        });

    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleOpen}>Add User</Button>
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
                                <Button type="submit" variant="contained" >Add User </Button>
                            </Grid>
                        </form>
                    </Box>
                </Modal>
            </div>
        );
    }
}

