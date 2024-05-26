import React from 'react';
import { Link } from 'react-router-dom';
import './AccountMenu.css';

const AccountMenu = () => {
  return (
    <Link to='/profile' className='account-menu__profile-link'>Аккаунт</Link>
  )
};

export default AccountMenu;