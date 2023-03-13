import './AddPostForm.css';
import CloseIcon from '@mui/icons-material/Close';

export const AddPostForm = ({ handleAddFormHide }) => {
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
          />
        </div>
        <div>
          <textarea
            className='addFormInput'
            name="postDescription"
            placeholder='Описание поста'
          />
        </div>
        <button type="submit" className="blackBtn" onClick={handleAddFormHide}>Добавить пост</button>
      </form>
      <div className="overlay" onClick={handleAddFormHide}></div>
    </>
  )
}
