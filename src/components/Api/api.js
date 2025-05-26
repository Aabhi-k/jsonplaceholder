import axios from 'axios';


const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
export const getPosts = async () => {
    try{
        const response = await api.get('/posts');
        return response;
    }
    catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }

}


export const getPostById = async (id) => {
    try{
        const response = await api.get(`/posts/${id}`);
        return response;
    }
    catch (error) {
        console.error('Error fetching post by ID:', error);
        throw error;
    }
}

export const createPost = async (postData) => {
    try{
        const response = await api.post('/posts', postData);
        return response;
    }
    catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}