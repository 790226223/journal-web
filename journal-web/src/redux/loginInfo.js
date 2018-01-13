const LoginInfo = (state={username:''}, action) => {
  switch (action.type) {
    case 'LOGIN_OPERATE':
      return {username:action.username}
    default:
      return state
  }
}

export default LoginInfo
