import {useNavigate} from 'react-router-dom';
import { format } from "date-fns";
//USING CONTEXT API
// import api from './api/posts';
// import {useContext,useState} from 'react';
// import DataContext from './context/DataContext';

//USING REDUX
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
  const history = useNavigate();

  //USING CONTEXT API
    // const {posts, setPosts} =useContext(DataContext);
    // const [postBody, setPostBody] = useState("");
    // const [postTitle, setPostTitle] = useState("");

  //USING REDUX
  const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);

    const savePost = useStoreActions((actions) => actions.savePost);
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const handleSubmit =  (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    // try {
      // const response = await api.post("/posts", newPost);
      // const allPosts = [...posts, response.data];
      // setPosts(allPosts);
      // setPostTitle("");
      // setPostBody("");
      history("/");
    // } catch (err) {
      // console.log(`Error : ${err.message}`);
    // }
  };

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
