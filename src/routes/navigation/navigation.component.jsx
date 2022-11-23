import { Fragment} from "react";
import { Outlet, Link  } from "react-router-dom";
import PrimalLogo from "../../assets/Logo.png";
import "../navigation/navigation.styles.scss"

function Navigation(){
    return(
      <Fragment>
        <div className="navigation">
            <div>
            <Link className="logo-container" to="/">
              <img src={PrimalLogo} alt="Primal Logo" className="logo"/>
            </Link>
            </div>
            <div className="nav-links-container">
                <Link className="nav-link" to="shop">Shop</Link>
                <Link className="nav-link" to="auth">Sign In</Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default Navigation;