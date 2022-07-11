import { useParams, Link,useNavigate } from "react-router-dom";
// USING CONTEXT API
// import {useContext} from 'react';
// import DataContext from './context/DataContext';
// import api from "./api/posts";
//USING REDUX
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
    // USING CONTEXT API
    // const { posts,setPosts }=useContext(DataContext);
    const { id } = useParams();
    const history = useNavigate();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    // USING CONTEXT API
    // const post = posts.find(post => (post.id).toString() === id);
    
    const handleDelete = (id) => {
        deletePost(id);
          // USING CONTEXT API
        // try {
        //   await api.delete(`/posts/${id}`);
        //   const postsList = posts.filter((post) => post.id !== id);
        //   setPosts(postsList);
        history('/');
        // } catch (err) {
        //   console.log(`Error : ${err.message}`);
        // }
      };
    
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton" >
                            Edit Post
                        </button></Link>
                        <button className='deleteButton'onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage
