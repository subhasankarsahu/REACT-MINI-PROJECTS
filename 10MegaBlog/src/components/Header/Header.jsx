import React from "react";
import Container from "../container/Container.jsx";
import Logo from "../Logo.jsx";
import LogoutBtn from "../LogoutBtn/LogoutBtn.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <header className='border-b border-slate-200 bg-white/95 py-3 shadow-sm backdrop-blur'>
      <Container>
        <nav className='flex items-center gap-4'>
          <div className='mr-2'>
            <Link to='/'>
              <Logo width='170px' />

            </Link>
          </div>
          <ul className='ml-auto flex items-center gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className='inline-flex rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100'
                  >{item.name}</Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header
