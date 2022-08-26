import React, { Component } from 'react'
import userInfo from './Users'
import { TableBody, TableCell, TableHead, TableRow, Table } from '@mui/material';


export class UserDetails extends Component {

    render() {
        return (
            <div className='user'>
                <div className='user-info'>
                    <Table >
                        <TableHead>
                            <TableRow className='user-head'>
                                <TableCell >User Type</TableCell>
                            </TableRow>
                        </TableHead>
                        {userInfo.length !== 0 ? <TableBody className='user-head'>
                            <TableCell >
                                {userInfo.map((user, index) => (
                                    <tr key={index}>
                                        <td><span>{user.type}</span></td>
                                    </tr>
                                ))}</TableCell>
                        </TableBody> : null}
                    </Table >
                </div >
            </div>
        )
    }
}

export default UserDetails