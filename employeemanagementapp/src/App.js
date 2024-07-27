import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import EditPage from './components/EditPage';
import AddPage from './components/AddPage';
import Header from './Components2/Header';
import Footer from './Components2/Footer';

function App() {
  return (
    <div className="App">
    
<Header></Header>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/add' element={<AddPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
