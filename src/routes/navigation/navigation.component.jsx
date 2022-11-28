import { Fragment, useContext} from "react";
import { Outlet, Link  } from "react-router-dom";
import PrimalLogo from "../../assets/Logo.png";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import "../navigation/navigation.styles.scss";

function Navigation(){
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

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
              <CartIcon/>
            </div>
            {isCartOpen && <CartDropdown/>}
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default Navigation;