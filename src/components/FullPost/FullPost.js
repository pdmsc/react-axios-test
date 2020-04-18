import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state= {
        selectedPost: null
    };

    componentDidUpdate() {
        if (this.props.postId) {
            if (!this.state.selectedPost || (this.state.selectedPost && this.state.selectedPost.id !== this.props.postId)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.postId)
                .then((response) => {
                    const post = response.data;

                    console.log(post);

                    const updatedPost = {
                        ...post,
                       author: 'Pablo',   
                    };

                    this.setState({
                        selectedPost: updatedPost,
                    });
                });
            }
        }
            
    }

    deletePostHandler= () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.postId)
            .then((response) => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.postId) {
            post = <p style={{textAlign: 'center'}}>Loading!</p>;
            
            if (this.state.selectedPost) {
                post = (
                    <div className="FullPost">
                        <h1>{this.state.selectedPost.title}</h1>
                        <p>{this.state.selectedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                        </div>
                    </div>
                );
            }
            
        }

        return post;
    }
}

export default FullPost;