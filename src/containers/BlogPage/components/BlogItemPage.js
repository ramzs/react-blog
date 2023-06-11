import styles from "./BlogItem.module.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";
import axios from "axios";
import { postsUrl } from "../../../shared/projectData";
import { useEffect, useState } from "react";

export const BlogItemPage = ({
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin
}) => {

  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  }

  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(postsUrl + postId)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      }).catch((err) => {
        console.log(err)
      });
  }, [postId, setPost]);

  const heartFill = post.liked ? 'crimson' : 'black';

  return (
    <div className={styles.post}>
      <div className={styles.postContent}>
        <h2>{post.title}</h2>
        <p> {post.description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className={styles.postControl}>
          <button className={styles.editBtn} onClick={showEditForm}>
            <EditIcon />
          </button>
          <button className={styles.deleteBtn} onClick={deletePost}>
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  )
}
