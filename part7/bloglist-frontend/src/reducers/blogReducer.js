import blogsService from '../services/blogs';

const INIT_BLOGS = 'INIT_BLOGS';
const CREATE_BLOG = 'CREATE_BLOG';
const UPDATE_BLOG_LIKES = 'UPDATE_BLOG_LIKES';
const DELETE_BLOG = 'DELETE_BLOG';

const initialState = [];

const byLikes = (a, b) => b.likes - a.likes;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_BLOGS:
      return action.data.sort(byLikes);
    case CREATE_BLOG:
      return [...state, action.data].sort(byLikes);
    case UPDATE_BLOG_LIKES:
      return state
        .map(blog => (blog.id === action.data.id ? { ...blog, likes: action.data.likes } : blog))
        .sort(byLikes);
    case DELETE_BLOG:
      return state.filter(blog => blog.id !== action.id && blog);
    default:
      return state;
  }
}

export function initBlogs() {
  return async dispatch => {
    const data = await blogsService.getAll();
    dispatch({
      type: INIT_BLOGS,
      data,
    });
  };
}

export function createBlog(newBlog) {
  return async dispatch => {
    try {
      const data = await blogsService.create(newBlog);
      dispatch({
        type: CREATE_BLOG,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateLikes(newBlog) {
  return async dispatch => {
    try {
      const data = await blogsService.update(newBlog);
      dispatch({
        type: UPDATE_BLOG_LIKES,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteBlog(id) {
  return async dispatch => {
    await blogsService.deleteBlog(id);
    dispatch({
      type: DELETE_BLOG,
      id,
    });
  };
}
