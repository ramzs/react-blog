import { Component } from 'react';
import './EditPostForm.css';
import CloseIcon from '@mui/icons-material/Close';

export class EditPostForm extends Component {

  state = {
    postTitle: this.props.selectedPost.title,
    postDesc: this.props.selectedPost.description
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

  savePost = (e) => {
    e.preventDefault();
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: this.props.selectedPost.liked
    }
    console.log(post);

    this.props.editBlogPost(post);
    this.props.handleEditFormHide();
  }

  handleEscape = (e) => {
    if (e.key === 'Escape') {
      this.props.handleEditFormHide();
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  render() {

    const handleEditFormHide = this.props.handleEditFormHide

    return (
      <>
        <form className="editPostForm" onSubmit={this.savePost}>
          <button className='hideBtn' onClick={handleEditFormHide}>
            <CloseIcon />
          </button>
          <h2>Редактирование поста</h2>
          <div>
            <input
              className='editFormInput'
              type="text"
              name="postTitle"
              placeholder='Заголовок поста'
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div >
          <div>
            <textarea
              className='editFormInput'
              name="postDescription"
              placeholder='Описание поста'
              value={this.state.postDesc}
              onChange={this.handlePostDescChange}
              required
            />
          </div>
          <button
            type="submit"
            className="blackBtn"
          >
            Сохранить
          </button>
        </form >
        <div className="overlay" onClick={handleEditFormHide}></div>
      </>
    )
  }
}
