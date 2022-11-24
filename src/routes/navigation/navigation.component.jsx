import { Fragment, useContext} from "react";
import { Outlet, Link  } from "react-router-dom";
import PrimalLogo from "../../assets/Logo.png";
import "../navigation/navigation.styles.scss"
import {signOutUser} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

function Navigation(){

  const {currentUser} = useContext(UserContext);
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
                {
                  currentUser ? (
                    <span className="nav-link" onClick={signOutUser}>
                      Sign Out
                    </span>
                  ) : (
                    <Link className="nav-link" to="auth">
                      Sign In
                    </Link> 
                  )
                }
                
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default Navigation;