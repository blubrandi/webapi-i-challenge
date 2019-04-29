import React from 'react'

import User from './User'

class Users extends React.Component {
    render() {
        return (
            <div>
                <h2>List of users</h2>
                <div>
                    {this.props.users.map(user => {
                        return (
                            <User
                            name={user.name}
                            bio={user.bio}
                            key={user.id}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Users