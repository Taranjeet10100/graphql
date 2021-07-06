import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
    return (
            <Navbar bg="" variant="dark" expand="lg" sticky="top" style={{ backgroundColor: '#fff',borderBottom: 'solid #cecece 1px',margin:'0px'}}>
                <Navbar.Brand href="/">
                    <div className="text-4xl font-bold" style={{ color: '#000000',paddingLeft:'15px'}}>
                        Managex<span className="text-green-700">.</span>
                    </div>
                </Navbar.Brand>
            </Navbar>
    )
}
export default Header;