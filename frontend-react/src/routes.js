import {
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/home';
import Snake from './pages/snake'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/snake' element={<Snake />} />
    </Routes>
  )
}