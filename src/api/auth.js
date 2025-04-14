import axios from 'axios';
// import dotenv from 'dotenv'

// dotenv.config()

// const API = axios.create({ baseURL: 'http://localhost:8000', headers: { "Content-Type": "application/x-www-form-urlencoded" } });
// console.log(process.env.BASE_URL)


export const signup = function (data){
    return axios.create(
        {
            baseURL: 'http://localhost:8000',
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    ).post('/quiz-app/api/v1/auth/signup', data);
} 

export const signin = function (data) {
    return axios.create(
        {
            baseURL: 'http://localhost:8000',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
    ).post('/quiz-app/api/v1/auth/signin', data);
}

export const signout = function () {
    return axios.create(
        {
            baseURL: 'http://localhost:8000',
            // headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    ).post('/signout');
}