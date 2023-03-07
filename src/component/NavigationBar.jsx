import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function NavigationBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">메이플 사냥 유틸</Navbar.Brand>
          </Container>
        </Navbar>
      );
}

export default NavigationBar;