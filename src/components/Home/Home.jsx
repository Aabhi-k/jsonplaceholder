import { useEffect, useState } from "react";

import "./Home.css";
import { getPosts, getPostById } from "../Api/api";

import FormPost from "../Form/FormPost";


const Home = () => {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPosts();
            if (!response || !response.data) {
                throw new Error("No data received");
            }
            setPostData(response.data);
        } catch (err) {
            setError("Failed to fetch posts");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    const handlePostClick = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPostById(id);
            if (!response || !response.data) {
                throw new Error("No data received");
            }
            console.log("Post Details:", response.data);
        } catch (err) {
            setError("Failed to fetch post details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    const handleCreatePostClick = () => {
        setShowCreateForm(!showCreateForm);
    };

    const handlePostCreated = () => {
        setSuccess(true);
        setMessage("Post created successfully!");
        setTimeout(() => {
            setSuccess(false);
            setMessage("");
        }, 3000);
        fetchPosts();
        setShowCreateForm(false);
    };

    const dismissToast = () => {
        setSuccess(false);
        setMessage("");
    };

    const indexOfFirstPost = (currentPage - 1) * postsPerPage;
    const indexOfLastPost = indexOfFirstPost + postsPerPage;
    const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPosts = postData.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPageNumbers = pageNumbers.map(number => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => handlePageClick(number)} className="page-link">
                {number}
            </button>
        </li>
    ));

    const renderPaginationButtons = () => {
        if (window.innerWidth > 768) {
            return pageNumbers.map(number => (
                <button 
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ));
        }
        
        const visiblePages = 5;
        let startPage = 1;
        let endPage = Math.min(totalPages, visiblePages);
        
        if (currentPage > 3 && totalPages > visiblePages) {
            startPage = Math.min(currentPage - 2, totalPages - visiblePages + 1);
            endPage = Math.min(startPage + visiblePages - 1, totalPages);
        }
        
        const visiblePageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            visiblePageNumbers.push(
                <button 
                    key={i}
                    onClick={() => paginate(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        
        return visiblePageNumbers;
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="home">
            {success && message && (
                <div className="toast-container">
                    <div className="toast toast-success">
                        <span className="toast-icon">✓</span>
                        <div className="toast-message">{message}</div>
                        <button className="toast-close" onClick={dismissToast}>×</button>
                    </div>
                </div>
            )}
            
            <div className="header-container">
                <h1>Posts</h1>
                <div className="create-post-button-container">
                    <button 
                        onClick={handleCreatePostClick} 
                        className="create-post-button"
                    >
                        {showCreateForm ? 'Cancel' : 'Create New Post'}
                    </button>
                </div>
            </div>
            
            {showCreateForm && <FormPost onPostCreated={handlePostCreated} />}
            
            {error && <p className="error">{error}</p>}
            
            <div className="posts-container">
                {loading && postData.length === 0 ? (
                    <p>Loading posts...</p>
                ) : currentPosts.length > 0 ? (
                    <>
                    <div className="pagination">
                            <button 
                                onClick={goToPreviousPage} 
                                disabled={currentPage === 1}
                                className="pagination-arrow"
                            >
                                &laquo;
                            </button>
                            
                            {renderPaginationButtons()}
                            
                            <button 
                                onClick={goToNextPage} 
                                disabled={currentPage === totalPages}
                                className="pagination-arrow"
                            >
                                &raquo;
                            </button>
                        </div>
                        <div className="posts-list">
                            {currentPosts.map(post => (
                                <div 
                                    className="post" 
                                    key={post.id}
                                    onClick={() => handlePostClick(post.id)}
                                >
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                    <div className="post-footer">
                                        <small>Post ID: {post.id} | User ID: {post.userId}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
}

export default Home;