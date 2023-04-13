import { useEffect, useState } from 'react';
import styles from './AddPostForm.module.css';
import CloseIcon from '@mui/icons-material/Close';

export const AddPostForm = (props) => {

  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value);
  }

  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value);
  }

  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDesc,
      liked: false
    }

    props.addNewBlogPost(post);
    props.handleAddFormHide();
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        props.handleAddFormHide();
      }
    }
    window.addEventListener('keyup', handleEscape);
    return () => window.removeEventListener('keyup', handleEscape);
  }, [props]);

  const handleAddFormHide = props.handleAddFormHide

  return (
    <>
      <form className={styles.addPostForm} onSubmit={createPost}>
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
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className={styles.addFormInput}
            name="postDescription"
            placeholder='Описание поста'
            value={postDesc}
            onChange={handlePostDescChange}
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
