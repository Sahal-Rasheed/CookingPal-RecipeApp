import axios from 'axios';

export const axios_instance = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/'
});