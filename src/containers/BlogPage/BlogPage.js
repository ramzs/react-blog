import { Component } from 'react';
import { postsUrl } from '../../shared/projectData';
import { BlogItem } from './components/BlogItem';
import { AddPostForm } from './components/AddPostForm';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './BlogPage.module.css';
import { EditPostForm } from './components/EditPostForm';

// https://636d00fc91576e19e31c64d8.mockapi.io/posts

let source;

export class BlogPage extends Component {

  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
    // blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
  }


  fetchPosts = () => {
    source = axios.CancelToken.source();
    axios.get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentWillUnmount() {
    if (source) {
      source.cancel('Axios get canceled');
    }
  }

  likePost = (blogPost) => {

    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios.put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log('Пост изменен =>', response.data);
        this.fetchPosts();
      }).catch((err) => {
        console.log(err);
      });
  }

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {

      this.setState({
        isPending: true
      })
      axios.delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          this.fetchPosts();
        }).catch((err) => {
          console.log(err);
        });

    }
  }

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true
    });
    axios.post(postsUrl, blogPost)
      .then((response) => {
        this.fetchPosts()
      }).catch((err) => {
        console.log(err)
      });
  }

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true
    });

    axios.put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        this.fetchPosts()
      }).catch((err) => {
        console.log(err)
      });
  }

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true
    });
  }

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true
    });
  }

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false
    });
  }

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false
    });
  }

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
  }

  render() {
    const blockPosts = this.state.blogArr.map((item) => {
      return (
        <BlogItem
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>

    const postsOpacity = this.state.isPending ? 0.5 : 1;

    return (
      <div className={styles.blogPage}>

        {this.state.showAddForm && (
          <AddPostForm
            addNewBlogPost={this.addNewBlogPost}
            blogArr={this.state.blogArr}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        {
          this.state.showEditForm && (
            <EditPostForm
              handleEditFormHide={this.handleEditFormHide}
              selectedPost={this.state.selectedPost}
              editBlogPost={this.editBlogPost}
            />
          )
        }

        <h1>Блог</h1>
        <div className={styles.addNewPost}>
          <button className="blackBtn" onClick={this.handleAddFormShow}>Создать новый пост</button>
        </div>
        <div className={styles.posts} style={{ opacity: postsOpacity }}>
          {blockPosts}
        </div>
        {this.state.isPending && <CircularProgress className={styles.preloader} />}

      </div>
    )
  }
}
