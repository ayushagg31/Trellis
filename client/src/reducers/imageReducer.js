import * as ACTIONS from '../actions/actions'

const initialState = {
  images: [],
}
export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_URLS: {
      const images = action.payload.images.map((img) => ({
        id: img.id,
        thumb: img.urls.thumb,
        full: img.urls.full,
        user: {
          username: img.user.username,
          link: img.user.links.html,
        },
      }))
      return { images }
    }
    default:
      return state
  }
}
