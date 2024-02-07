import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:7000/api",
    baseURL: "https://one-percent-club-backend.onrender.com/api",
    withCredentials: true,
});

api.interceptors.request.use((req)=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        req.headers.authorization =`Bearer ${accessToken}`; 
    }
    return req;
})

export const signUp = (formData) =>{
    return api.post('/signup',formData);
}

export const login = (formData) =>{
    return api.post('/login', formData);
}

export const logout = () =>{
    return api.post('/logout');
}

export const createTask = (taskData) =>{
    return api.post('/task', taskData);
}

export const fetchTasks = () =>{
    return api.get('/task');
}

export const updateTask = (id, formData) =>{
    return api.put(`task/${id}`, formData);
}

export const deleteTask = (id) =>{
    return api.delete(`/task/${id}`);
}

export const updatePriority = (id, formData) =>{
    return api.put(`/task/${id}`, formData);
}

export const updateCompleted = (id, formData) =>{
    return api.put(`/task/${id}`, formData);
}