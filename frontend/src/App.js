import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import List from './pages/List/List';
import Hotel from './pages/Hotel/Hotel';
import Taxi from './pages/Taxi';
import Cars from './pages/Cars';
import Flights from './pages/Flights';
import Attractions from './pages/Attractions';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/hotels' element={<List/>} />
      <Route path='/hotels/:id' element={<Hotel/>} />
      <Route path='taxis' element={<Taxi/>}/>
      <Route path='cars' element={<Cars/>}/>
      <Route path='flights' element={<Flights/>}/>
      <Route path='attractions' element={<Attractions/>}/>
      
     </Routes>
    </div>
  );
}

export default App;
