import { Component } from 'react';
import { posts } from '../../shared/projectData';
import { Blogitem } from './components/Blogitem';
import './BlogPage.css';
import { AddPostForm } from './components/AddPostForm';

export class BlogPage extends Component {

  state = {
    showAddForm: false,
    blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
  }

  likePost = (pos) => {
    const temp = [...this.state.blogArr]
    temp[pos].liked = !temp[pos].liked

    this.setState({
      blogArr: temp
    })

    localStorage.setItem('blogPosts', JSON.stringify(temp))

  }

  deletePost = (pos) => {
    if (window.confirm(`Удалить ${this.state.blogArr[pos].title}?`)) {
      const temp = [...this.state.blogArr]

      temp.splice(pos, 1)

      this.setState({
        blogArr: temp
      })

      localStorage.setItem('blogPosts', JSON.stringify(temp))
    }
  }

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true
    });
  }
  handleAddFormHide = () => {
    this.setState({
      showAddForm: false
    });
  }

  render() {
    const blockPosts = this.state.blogArr.map((item, pos) => {
      return (
        <Blogitem
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });
    return (
      <>

        {this.state.showAddForm ? <AddPostForm handleAddFormHide={this.handleAddFormHide} /> : null}

        <h1>Simple blog</h1>
        <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
        <div className="posts">{blockPosts}</div>

      </>
    )
  }
}
