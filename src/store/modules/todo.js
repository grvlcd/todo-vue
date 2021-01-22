import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

const state = {
    status: '',
    todos: [],
    user: localStorage.getItem('user'),
    token: localStorage.getItem('access') || ''
}

const mutations = {
    SET_TODOS: (state, todos) => state.todos = todos,
    REQUEST_STATUS: (state) => state.status = 'loading',
    SUCCESS_STATUS: (state) => state.status = 'success',
    AUTH_SUCCESS_STATUS: (state, payload) => {
        state.status = 'success'
        state.token = payload.token,
        state.user = payload.user
    },
    AUTH_LOGOUT: (state) => {
        state.user = ""
        state.token = ""
    },
    ERROR_STATUS: (state, error) => state.status = error,
    UPDATE_TODO: (state, todo) => {
        const index = state.todos.findIndex(item => item.id === todo.id)
        if(index !== -1) {
            state.todos.splice(index, 1, todo )
        }
    },
    DELETE_TODO: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    ADD_TODO:(state, todo) => state.todos.unshift(todo)
}

const actions = {
    fetchTodos: ({commit, state}) => {
        commit('REQUEST_STATUS')
        return apiClient.get('api/posts', {headers: {"Authorization": "Token " + state.token}})
        .then(response => {
            commit('SET_TODOS', response.data)
            commit('SUCCESS_STATUS')
        })
        .catch(error => {
            commit('ERROR_STATUS', error.message)
        })
    },
    logoutUser: ({commit}) => {
        commit('REQUEST_STATUS')
        localStorage.removeItem('access')
        localStorage.removeItem('user')
        commit('SUCCESS_STATUS')
    },
    loginUser: ({commit}, userCredentials) => {
        commit('REQUEST_STATUS')
        return apiClient.post('auth/login/', userCredentials)
        .then(response => {
            localStorage.setItem('access', response.data.token)
            localStorage.setItem('user', response.data.email)
            commit('AUTH_SUCCESS_STATUS', {token: response.data.token, user: response.data.email})
            return response
        })
        .catch(error => {
            commit('ERROR_STATUS', error.message)
        })
    },
    updateTodo: ({commit}, todo) => {
        commit('REQUEST_STATUS')
        return apiClient.put(`api/posts/${todo.id}`, todo, {headers: {"Authorization": "Token " + state.token}})
        .then(response => {
            commit('UPDATE_TODO', response.data)
            commit('SUCCESS_STATUS')
        })
        .catch(error => {
            commit('ERROR_STATUS', error.message)
        })
    },
    deleteTodo: ({commit}, todo) => {
        commit('REQUEST_STATUS')
        return apiClient.delete(`api/posts/${todo.id}`, {headers: {"Authorization": "Token " + state.token}})
        .then(() => {
            commit('DELETE_TODO', todo.id)
            commit('SUCCESS_STATUS')
        })
        .catch(error => {
            commit('ERROR_STATUS', error.message)
        })
    },
    addTodo: ({commit}, todo) => {
        commit('REQUEST_STATUS')
        return apiClient.post('api/posts', todo, {headers: {"Authorization": "Token " + state.token}})
        .then(response => {
            commit('ADD_TODO', response.data)
            commit('SUCCESS_STATUS')
        })
        .catch(error => {
            commit('ERROR_STATUS', error.message)
        })
    }
}

const getters = {   
    getTodos: state => state.todos,
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    getStatus: state => state.status
}

export default {
    state, mutations, actions, getters
}