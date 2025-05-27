'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
     const { user, logout, loading } = useAuth();


  return (
    <nav>
      {user ? (
        <>
         <nav className="navbar navbar-expand-lg bg-primary text-light py-2">
  <div className="container-fluid px-5">
    <Link  className="navbar-brand text-light" href="/">PM To-Do</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item ">
          <Link className="nav-link active text-light fw-semibold" aria-current="page" href="/grupos"><span className="fw-light text-uppercase">Grupos</span></Link>
        </li>
        <li className="nav-item">
           <Link  className="nav-link text-light" href="/todos">Mi Lista</Link>
        </li>
     
        
      </ul>
      <form className="d-flex" role="search">
        <button className="btn btn-outline-danger"  onClick={logout}>Cerrar Sesión</button>
      </form>
    </div>
  </div>
</nav>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
}