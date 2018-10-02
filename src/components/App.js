import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();
    this.baseUrl = "https://practiceapi.devmountain.com/api"
    this.state = {
      posts: [{}]
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search = this.search.bind(this);
  }
  
  componentDidMount() {
    axios.get(this.baseUrl + "/posts")
    .then(res => {
      this.setState({
        posts : res.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(this.baseUrl + `/posts?id=${id}`, {text})
    .then(res => {
      this.setState({
        posts : res.data
      })
    })
  }

  deletePost(id) {
    axios.delete(this.baseUrl + `/posts?id=${id}`)
    .then(res => {
      this.setState({
        posts : res.data
      })
    })
  }

  createPost(text) {
    const newPost = { text , date : new Date() }
    axios.post(this.baseUrl + `/posts`, newPost)
    .then(res => {
      this.setState({
        posts : res.data
      })
    })
  }

  search(text) {
    axios.get(this.baseUrl + `/posts`)
    .then(res => {
      const filteredData = res.data.filter(post => post.text.toLowerCase().includes(text.toLowerCase()))
      this.setState({
        posts : (text!=='') ? filteredData : res.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    const postVals = posts.map((post,i)=> 
      <Post id={post.id} 
            key={i} 
            text={post.text} 
            date={post.date} 
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}
      />
    );
    return (
      <div className="App__parent">
        <Header searchFn={this.search}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          
          {postVals}
        </section>
      </div>
    );
  }
}

export default App;
