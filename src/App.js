import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourite from "./components/Favourite";
import Favourite2 from "./components/Favourite2";
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={ 
      <>
      <Banner/>
     <Movies/>
   
     </>}
     />
    <Route path="/favourite" element={<Favourite/>}/>
    <Route path="/favourite2" element={<Favourite2/>}/>
    </Routes>   
    </>
    </BrowserRouter>
  );
}

export default App;

