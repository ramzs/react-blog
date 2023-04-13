import { useEffect, useState } from 'react';
import { postsUrl } from '../../shared/projectData';
import { BlogItem } from './components/BlogItem';
import { AddPostForm } from './components/AddPostForm';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './BlogPage.module.css';
import { EditPostForm } from './components/EditPostForm';

// https://636d00fc91576e19e31c64d8.mockapi.io/posts

let source;

export const BlogPage = (props) => {

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});


  const fetchPosts = () => {
    source = axios.CancelToken.source();
    axios.get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        setBlogArr(response.data);
        setIsPending(false);
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPosts();
    return () => {
      if (source) {
        source.cancel('Axios get canceled');
      }
    };
  }, []);

  const likePost = (blogPost) => {

    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        console.log('Пост изменен =>', response.data);
        fetchPosts();
      }).catch((err) => {
        console.log(err);
      });
  }

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {

      setIsPending(true);

      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          fetchPosts();
        }).catch((err) => {
          console.log(err);
        });

    }
  }

  const addNewBlogPost = (blogPost) => {

    setIsPending(false);

    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        fetchPosts()
      }).catch((err) => {
        console.log(err)
      });
  }

  const editBlogPost = (updatedBlogPost) => {

    setIsPending(false);

    axios
      .put(`${postsUrl}${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        fetchPosts()
      }).catch((err) => {
        console.log(err)
      });
  }

  const handleAddFormShow = () => {
    setShowAddForm(true);
  }

  const handleEditFormShow = () => {
    setShowEditForm(true);
  }

  const handleAddFormHide = () => {
    setShowAddForm(false);
  }

  const handleEditFormHide = () => {
    setShowEditForm(false);
  }

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  }

  const blockPosts = blogArr.map((item) => {
    return (
      <BlogItem
        key={item.id}
        title={item.title}
        description={item.description}
        liked={item.liked}
        likePost={() => likePost(item)}
        deletePost={() => deletePost(item)}
        handleEditFormShow={handleEditFormShow}
        handleSelectPost={() => handleSelectPost(item)}
      />
    );
  });

  if (blogArr.length === 0) return <h1>Загружаю данные...</h1>

  const postsOpacity = isPending ? 0.5 : 1;

  return (
    <div className={styles.blogPage}>

      {showAddForm && (
        <AddPostForm
          blogArr={blogArr}
          addNewBlogPost={addNewBlogPost}
          handleAddFormHide={handleAddFormHide}
        />
      )}

      {
        showEditForm && (
          <EditPostForm
            handleEditFormHide={handleEditFormHide}
            selectedPost={selectedPost}
            editBlogPost={editBlogPost}
          />
        )
      }

      <h1>Блог</h1>
      <div className={styles.addNewPost}>
        <button className="blackBtn" onClick={handleAddFormShow}>Создать новый пост</button>
      </div>
      <div className={styles.posts} style={{ opacity: postsOpacity }}>
        {blockPosts}
      </div>
      {isPending && <CircularProgress className={styles.preloader} />}

    </div>
  )
}
