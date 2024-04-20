import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import EditPage from './components/EditPage';
import AddPage from './components/AddPage';

function App() {
  return (
    <div className="App">
      <h1>welcome</h1>

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/add' element={<AddPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
