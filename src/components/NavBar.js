import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const NavBar = () => {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand
          href="#"
          style={{
            fontSize: "5vh",
            background:
              "repeating-linear-gradient(43deg, green, transparent 100px)",
            // padding: "2vh",
            borderRadius: "1vh",
            boxShadow: "2px 1px 5px 3px seagreen",
          }}
        >
          TODO-List
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
