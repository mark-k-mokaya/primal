import { Fragment} from "react";
import { Outlet} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";


import PrimalLogo from "../../assets/Logo.png";
import {signOutStart} from "../../store/user/user.action";

import {
  NavigationContainer, 
  NavLinks, 
  NavLink, 
  LogoContainer
} from "../navigation/navigation.styles";

function Navigation(){
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

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