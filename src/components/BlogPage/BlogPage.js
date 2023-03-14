import { Component } from 'react';
import { posts } from '../../shared/projectData';
import { Blogitem } from './components/Blogitem';
import { AddPostForm } from './components/AddPostForm';
import axios from 'axios';
import './BlogPage.css';

export class BlogPage extends Component {

  state = {
    showAddForm: false,
    blogArr: []
    // blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
  }

  likePost = (pos) => {

    this.setState((state) => {
      const temp = [...this.state.blogArr]
      temp[pos].liked = !temp[pos].liked

      localStorage.setItem('blogPosts', JSON.stringify(temp));

      return {
        blogArr: temp
      }
    });

  }

  deletePost = (pos) => {
    if (window.confirm(`Удалить ${this.state.blogArr[pos].title}?`)) {

      this.setState((state) => {
        const temp = [...this.state.blogArr];
        temp.splice(pos, 1);

        localStorage.setItem('blogPosts', JSON.stringify(temp));

        return {
          blogArr: temp
        }
      });

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

  handleEscape = (e) => {
    if (e.key === 'Escape' && this.state.showAddForm) {
      this.handleAddFormHide();
    }
  }

  addNewBlogPost = (blogPost) => {

    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);

      localStorage.setItem('blogPosts', JSON.stringify(posts));

      return {
        blogArr: posts
      }
    });
  }

  componentDidMount() {
    axios.get('https://636d00fc91576e19e31c64d8.mockapi.io/posts')
      .then((response) => {
        this.setState({
          blogArr: response.data
        })
      }).catch((err) => {
        console.log(err);
      });
    window.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
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

    if (this.state.blogArr.length === 0)
      return <h1>Загружаю данные...</h1>

    return (
      <div className="blogPage">

        {this.state.showAddForm && (
          <AddPostForm
            addNewBlogPost={this.addNewBlogPost}
            blogArr={this.state.blogArr}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        <h1>Блог</h1>
        <div className="addNewPost">
          <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
        </div>
        <div className="posts">{blockPosts}</div>

      </div>
    )
  }
}
