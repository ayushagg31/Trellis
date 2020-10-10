import * as ACTIONS from '../actions/actions'

const initialState = {
  token: undefined,
  user: {
    id: undefined,
    username: undefined,
  },
  isValid: false,
  successLogin: false,
  requestLogin: true,
  successRegister: false,
  requestRegister: true,
  userRequest: true,
  tokenRequest: true,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOKEN_REQUEST:
      return { ...state, tokenRequest: true }
    case ACTIONS.TOKEN_RESPONSE:
      return {
        ...state,
        isValid: action.payload.isTokenValid,
        token: action.payload.token,
        tokenRequest: false,
      }
    case ACTIONS.USER_REQUEST:
      return { ...state, userRequest: true }
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userRequest: false,
      }
    case ACTIONS.LOGIN_REQUEST:
      return { ...state, requestLogin: true, successLogin: false }
    case ACTIONS.REGISTER_REQUEST:
      return { ...state, requestRegister: true, successRegister: false }
    case ACTIONS.LOGIN_FAILED:
      return {
        ...state,
        successLogin: false,
        requestLogin: false,
        loginError: action.payload.error,
      }
    case ACTIONS.REGISTER_FAILED:
      return {
        ...state,
        successRegister: false,
        requestRegister: false,
        registerError: action.payload.error,
      }
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.user.token,
        user: {
          id: action.payload.user.user.id,
          username: action.payload.user.user.username,
        },
        requestLogin: false,
        successLogin: true,
        isValid: true,
      }
    case ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.user._id,
          username: action.payload.user.username,
        },
        requestRegister: false,
        successRegister: true,
      }
    case ACTIONS.ERROR_USER:
      return { ...state, error: action.payload.error }
    case ACTIONS.TOKEN_RESPONSE_ERROR:
      return { ...state, tokenError: action.payload.error }
    default:
      return state
  }
}
