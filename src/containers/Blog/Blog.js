import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: 'Pablo',        
                    };
                });
                this.setState({
                    posts: updatedPosts,
                });
            })
            .catch((error) => {
                this.setState({
                    error: true,
                });
            });
    }

    postSelected = (id) => {
        this.setState({
            selectedPostId: id,
        });
    }

    render () {
        let posts = <p>Something went wrong</p>;

        if (!this.state.error) {
            posts = this.state.posts.map((post => {
                return <Post title={post.title} author={post.author} clicked={() => this.postSelected(post.id)} key={post.id}></Post>
            }));
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;