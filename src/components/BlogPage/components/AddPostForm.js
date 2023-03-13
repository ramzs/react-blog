import { Component } from 'react';
import './AddPostForm.css';
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

  render() {

    const handleAddFormHide = this.props.handleAddFormHide

    return (
      <>
        <form action="" className="addPostForm">
          <button className='hideBtn' onClick={handleAddFormHide}>
            <CloseIcon />
          </button>
          <h2>Создание поста</h2>
          <div>
            <input
              className='addFormInput'
              type="text"
              name="postTitle"
              placeholder='Заголовок поста'
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
            />
          </div>
          <div>
            <textarea
              className='addFormInput'
              name="postDescription"
              placeholder='Описание поста'
              value={this.state.postDescription}
              onChange={this.handlePostDescChange}
            />
          </div>
          <button type="submit" className="blackBtn" onClick={handleAddFormHide}>Добавить пост</button>
        </form>
        <div className="overlay" onClick={handleAddFormHide}></div>
      </>
    )
  }
}
