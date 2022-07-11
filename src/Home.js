import Feed from './Feed';
// USEING CONTEXT API
// import {useContext} from 'react';
// import DataContext from './context/DataContext';
//USING REDUX
import { useStoreState } from 'easy-peasy';
const Home = ({ isLoading, fetchError }) => {
    // USEING CONTEXT API
    // const { searchResults,fetchError,isLoading } =useContext(DataContext);
    
    //USING REDUX
    const searchResults = useStoreState((state) => state.searchResults);

    return (
        <main className="Home">
            {isLoading  && <p className="statusMsg">loading Posts....</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{color:"red"}}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> :<p>No posts to display.</p>)}
        </main>
    )
}

export default Home
