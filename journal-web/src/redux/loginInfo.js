const LoginInfo = (state={username:'1'}, action) => {
  switch (action.type) {
    case 'LOGIN_OPERATE':
      return {username:action.username}
    default:
      return state
  }
}

export default LoginInfo
