import axios from 'axios';

export const apiDiagrams = axios.create({
    baseURL: 'http://diagrams.flowbuild.com.br:3000/diagrams'
})