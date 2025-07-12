import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from './layout/PublicLayout';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { NoPage } from './pages/NoPage';
import { List } from './pages/List';
import { UserLayout } from './layout/UserLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AdminCarTypes } from './pages/car-types/AdminCarTypes';
import { AdminNewCarType } from './pages/car-types/AdminNewCarType';
import { AdminEditCarType } from './pages/car-types/AdminEditCarType';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/list' element={<List />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/car-types' element={<AdminCarTypes />}></Route>
            <Route path='/car-types/new' element={<AdminNewCarType />}></Route>
            <Route path='/car-types/:carType/edit' element={<AdminEditCarType />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<NoPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;
