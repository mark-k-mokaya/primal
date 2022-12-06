import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-around;
  color: #000;
  margin-bottom: 5px;
  z-index: 10;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 200px;
  padding: 20px;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;