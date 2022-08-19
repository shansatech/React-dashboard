import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'
import './Navbar.css'
import * as FaIcons from 'react-icons/fa'
import { AppBar, Typography, Toolbar, Grid } from '@mui/material'
// import NestedModal from './Model';


export class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isDialogBox: true
        }
    }

    submit = () => {
        this.setState(
        )
    }

    render() {
        return (
            <div>
                <AppBar style={{ position: 'fixed', background: 'linear-gradient(45deg, #332e36, #80b6c7 )', borderRadius: '25px' }}>
                    <Toolbar style={{ justifyContent: 'space-between', size: '30px' }}>
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars />
                        </Link>
                        <Typography variant='h4'>Dashboard</Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-between', size: '30px' }}>
                            {/* <NestedModal /> */}
                        </div>
                    </Toolbar>
                    <div style={{ position: 'fixed', background: 'linear-gradient(45deg, #88cc90, #80b6c7 )', height: '100%', width: '25%', borderRadius: '5px', top: '70px' }}>
                        <Grid >
                            {SidebarData.map((item, index) => {
                                return (
                                    <div >
                                        <li key={index} className={item.className}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    </div>
                                )
                            })}
                        </Grid>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default Navbar