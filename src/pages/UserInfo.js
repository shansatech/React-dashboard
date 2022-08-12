import React, { Component } from 'react'
import userInfo from './Users'
import { v4 as uuid } from 'uuid';

export class UserInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: JSON.parse(localStorage.getItem('users'))
        }
    }

    render() {
        const unique_id = uuid()
        const small_id = unique_id.slice(0, 5)
        return (
            <div className='user-info'>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Job Description</th>
                    </thead>
                    {userInfo.length !== 0 ? <tbody>
                        {userInfo.map((user, index) => (
                            <tr key={index}>
                                <td><span>{user.id}</span></td>
                                <td><span>{user.name}</span></td>
                                <td><span>{user.description}</span></td>
                            </tr>

                        ))}
                    </tbody> : null}
                    {this.state.users.map(({ name, description, id }) => (
                        <tr key={small_id}>
                            <td><span>{small_id}</span></td>
                            <td><span>{name}</span></td>
                            <td><span>{description}</span></td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

export default UserInfo