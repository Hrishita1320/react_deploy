import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router-dom";
//USING REDUX
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
//USING CONTEXT API
// import { DataProvider } from "./context/DataContext";

function App() {
  //WITHOUT CUSTOM HOOK
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         // This is not in 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error : ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  //USING REDUX
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data,setPosts]);




  return (
    <div className="App">
      <Header title="React JS Blog" />
      {/* <DataProvider> */}
        <Nav/>
        <Routes>
          <Route exact path="/" element={<Home 
          isLoading={isLoading}
          fetchError={fetchError}/>} />

          <Route path="post" element={<NewPost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post" element={<PostPage />}>
            <Route path=":id" element={<PostPage />} />
          </Route>

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
}

export default App;
