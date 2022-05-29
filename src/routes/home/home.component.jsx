import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component.jsx';

const Home = () => {

  return (
    <div>
      <Outlet />
      <div className="categories-container">
        <Directory />
      </div>
    </div>


  );
}

export default Home;