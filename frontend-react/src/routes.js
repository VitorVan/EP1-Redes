import {
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/home';
import Snake from './pages/snake'
import TictacToe from './pages/ticTacToe';
import WaitingRoom from './pages/waitingRoom';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/snake' element={<Snake />} />
      <Route path='/waitingroom' element={<WaitingRoom />} />
      <Route path='/tictactoe' element={<TictacToe />} />
    </Routes>
  )
}
