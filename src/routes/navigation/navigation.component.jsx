import { Fragment, useContext} from "react";
import { Outlet, Link  } from "react-router-dom";
import PrimalLogo from "../../assets/Logo.png";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from "../navigation/navigation.styles";

function Navigation(){
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

    return(
      <Fragment>
        <NavigationContainer>
            <div>
            <LogoContainer to="/">
              <img src={PrimalLogo} alt="Primal Logo" className="logo"/>
            </LogoContainer>
            </div>

            <NavLinks>
                <NavLink to="shop">Shop</NavLink>
                {
                  currentUser ? (
                    <NavLink as="span" onClick={signOutUser}>
                      Sign Out
                    </NavLink>
                  ) : (
                    <NavLink to="auth">
                      Sign In
                    </NavLink> 
                  )
                }
              <CartIcon/>
            </NavLinks>
            {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }

  export default Navigation;