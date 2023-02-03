import { Fragment } from "react"; //Fragment is component that mounts to nothing to the DOM
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className='logo-container' to='/'>
            <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/sign-in">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
