import { Component } from 'react';
import styles from './AddPostForm.module.css';
import CloseIcon from '@mui/icons-material/Close';

export class AddPostForm extends Component {

  state = {
    postTitle: '',
    postDesc: ''
  }

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value
    })
  }

  handlePostDescChange = (e) => {
    this.setState({
      postDesc: e.target.value
    })
  }

  createPost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false
    }
    console.log(post);

    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  }

  handleEscape = (e) => {
    if (e.key === 'Escape') {
      this.props.handleAddFormHide();
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  render() {

    const handleAddFormHide = this.props.handleAddFormHide

    return (
      <>
        <form className={styles.addPostForm} onSubmit={this.createPost}>
          <button className={styles.hideBtn} onClick={handleAddFormHide}>
            <CloseIcon />
          </button>
          <h2>Создание поста</h2>
          <div>
            <input
              className={styles.addFormInput}
              type="text"
              name="postTitle"
              placeholder='Заголовок поста'
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className={styles.addFormInput}
              name="postDescription"
              placeholder='Описание поста'
              value={this.state.postDesc}
              onChange={this.handlePostDescChange}
              rows={8}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.blackBtn}
          >
            Добавить пост
          </button>
        </form>
        <div className={styles.overlay} onClick={handleAddFormHide}></div>
      </>
    )
  }
}
