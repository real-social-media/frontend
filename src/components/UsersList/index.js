import React from 'react'
import UsersListService from 'components/UsersList/index.service'
import UsersListComponent from 'components/UsersList/component'

const UsersList = (props) => (
  <UsersListService>{(serviceProps) => <UsersListComponent {...serviceProps} {...props} />}</UsersListService>
)

export default UsersList
