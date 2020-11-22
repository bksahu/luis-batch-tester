import Navbar from 'react-bootstrap/Navbar';
import logo from './logo.svg';

function DefaultNavbar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand className='m-auto'>
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                    style={{ filter: "invert(1)" }}
                />
            </Navbar.Brand>
        </Navbar>
    );
}

export default DefaultNavbar;