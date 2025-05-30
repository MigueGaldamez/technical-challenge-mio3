'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Notifications from '../notifications/notifications';
import NavLink from '../navLink/navLink';

export default function Navbar() {
     const { user, logout, loading } = useAuth();


  return (
    <nav>
      {user ? (
        <>
        
         <nav className="navbar navbar-expand-lg bg-primary text-light py-2">
          
  <div className="container-fluid px-5">
     <Notifications userId={user._id} />
    <Link  className="navbar-brand text-light" href="/">PM To-Do</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item ">
          <NavLink href="/grupos" label="Grupos" />
        </li>
        <li className="nav-item">
             <NavLink href="/todos" label="Mi Lista" />
        </li>
     
        
      </ul>
      <form className="d-flex align-items-center" role="search">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
           <i className="fa-solid fa-user me-2"></i> {user.username}
          </button>
          <ul className="dropdown-menu px-2">
            <li className='btn btn-danger btn-sm w-100 ' onClick={logout}><a className="text-decoration-none" href="#" >Cerrar Sesión</a>   </li>
          </ul>
        </div>
        <div className='me-2'>
           
        </div>
      
      </form>
    </div>
  </div>
</nav>

        </>
      ) : (
        <> <nav className="navbar navbar-expand-lg bg-primary text-light py-2"></nav></>
      )}
    </nav>
  );
}