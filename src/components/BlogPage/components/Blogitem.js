import "./BlogItem.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export const BlogItem = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost
}) => {

  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  }

  const heartFill = liked ? 'crimson' : 'black';

  return (
    <div className="post">
      <div className="postContent">
        <h2>{title}</h2>
        <p> {description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div className="postControl">
        <button className="editBtn" onClick={showEditForm}>
          <EditIcon />
        </button>
        <button className="deleteBtn" onClick={deletePost}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  )
}
