import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (query = '') => {
    const { data } = await axios.get(`/posts?section=${query}`)
    return data
})
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags')
    return data
})
export const fetchTag = createAsyncThunk('posts/fetchTag', async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`)
    return data
})
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
    await axios.delete(`/posts/${id}`)
)


export const fetchCreateComment = createAsyncThunk('posts/fetchCreateComment', async (params) => {
    const { values, id } = params
    const { data } = await axios.post(`/posts/${id}/comments`, values)

    return data
})

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
    const { data } = await axios.get(`/comments`,)
    return data
})
export const fetchRemoveComments = createAsyncThunk('posts/fetchRemoveComments', async (id) => {
    await axios.delete(`/comments/${id}`,)
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
    comments: {
        items: [],
        status: 'loading'
    },

}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, actions) => {
            state.posts.items = actions.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, actions) => {
            state.tags.items = actions.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        // Удаление статьи
        [fetchRemovePost.pending]: (state, actions) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== actions.meta.arg)
            state.tags.status = 'loading'
        },

        // Удаление комментария
        [fetchRemoveComments.pending]: (state, actions) => {
            state.comments.items = [state.comments.items].filter(obj => obj._id !== actions.meta.arg)
            state.comments.status = 'loading'
        },
        // Получение статей по тегу
        [fetchTag.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchTag.fulfilled]: (state, actions) => {
            state.posts.items = actions.payload
            state.posts.status = 'loaded'
        },
        [fetchTag.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        //comments


        [fetchCreateComment.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchCreateComment.fulfilled]: (state, actions) => {
            state.comments.items = actions.payload
            state.comments.status = 'loaded'
        },
        [fetchCreateComment.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error'
        },
        [fetchComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading'
        },
        [fetchComments.fulfilled]: (state, actions) => {
            state.comments.items = actions.payload
            state.comments.status = 'loaded'
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error'
        }
    }
})


export const postsReducer = postsSlice.reducer 