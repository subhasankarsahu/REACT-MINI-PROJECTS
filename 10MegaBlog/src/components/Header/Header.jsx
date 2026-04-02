import React, { use } from "react";
import Container from "../container/Container.jsx";
import Logo from "../Logo.jsx";
import LogoutBtn from "../LogoutBtn/LogoutBtn.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth);
  const navigate = useNavigate();

  use(() => {
    if (!authStatus.isAuthenticated) {
      navigate("/login");
    }
  }, [authStatus, navigate]);
  return (
    <header className="py-3 shadow bg-gray-400">
      <Container>
        <div className="flex items-center justify-between">
          <Logo width="120px" />
          <LogoutBtn />
        </div>
      </Container>
    </header>
  );
}

export default Header
