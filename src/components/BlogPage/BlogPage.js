import { Component } from 'react';
import './BlogPage.css';
import { posts } from '../../shared/projectData';
import { Blogitem } from './components/Blogitem';

export class BlogPage extends Component {

  state = {
    showBlog: true,
    blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
  }

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked

    this.setState({
      blogArr: temp
    });

    localStorage.setItem('blogPosts', JSON.stringify(temp))

  }

  toggleBlog = () => {
    this.setState(({ showBlog }) => {
      return {
        showBlog: !showBlog
      }
    });
  }

  deletePost = (pos) => {
    if (window.confirm(`Удалить ${this.state.blogArr[pos].title}?`)) {
      const temp = [...this.state.blogArr];

      temp.splice(pos, 1);

      this.setState({
        blogArr: temp
      });

      localStorage.setItem('blogPosts', JSON.stringify(temp));
    }
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
      )
    });
    return (
      <>
        <button onClick={this.toggleBlog}>
          {
            this.state.showBlog ? 'Скрыть блог' : 'Показать блог'
          }
        </button>
        {
          this.state.showBlog ?
            <>
              <h1>Simple blog</h1>
              <div className="posts">
                {blockPosts}
              </div>
            </>
            : null
        }

      </>
    )
  }
}
