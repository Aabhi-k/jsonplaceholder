

import { useState } from "react";
import { createPost } from "../Api/api";
import "./FormPost.css";

const FormPost = ({ onPostCreated }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
        userId: 1
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await createPost(newPost);
            if (!response || !response.data) {
                throw new Error("No data received");
            }
            console.log("New Post Created:", response.data);
            setNewPost({
                title: "",
                body: "",
                userId: 1
            });
            onPostCreated();
        } catch (err) {
            setError("Failed to create post");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-form">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="body">Content</label>
                    <textarea
                        id="body"
                        name="body"
                        value={newPost.body}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <button type="submit" disabled={loading} className="form-submit-button">
                    {loading ? 'Creating...' : 'Create Post'}
                </button>
            </form>
            
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default FormPost;