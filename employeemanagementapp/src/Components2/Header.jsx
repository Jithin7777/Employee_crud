import React from 'react';

const Header = () => {
  return (
    <header className="navbar navbar-dark bg-dark fixed-top " >
      <div className="container" style={{textAlign:'center'}}>
        <a className="navbar-brand mx-auto " href="/" >
          Employee Management System
        </a>
      </div>
    </header>
  );
}

export default Header;
