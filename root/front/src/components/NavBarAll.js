import * as React from 'react';
import {Navbar , Container , Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {logoutUser} from '../redux/actions/userAction';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import webAppLogo from '../images/webAppLogo.png';

//https://react-bootstrap.github.io/components/navbar/ + https://stackoverflow.com/a/72184830

const Header = ({user , logoutUser}) => {
  
  const navigate = useNavigate();
  // const userRole = user.user.role;
  // const userName = user.user.name;
  // console.log('User role is ' + userRole);
  // console.log('User name is ' + userName);
  
  return (
        <header className="App-header">
          <Navbar variant="dark" collapseOnSelect expand='sm' style={{backgroundColor:'#a28089'}}>
            <Container fluid>
            <Nav><img src={webAppLogo} style={{width:'83px', height:'83px', maxWidth:'12rem', maxHeight:'12rem', justifyContent:'center', margin:'auto', display:'block'}} /></Nav>
              <Navbar.Brand style={{marginBottom: '5x', fontFamily: 'verdana, sans serif', paddingRight:'20px', paddingLeft:'4px', fontSize:'x-large'}}>E-Library
                <Link to = '/'  className="nav-link">
                  Home
                  </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav" className='mx-auto' style={{paddingTop: '32px'}}>
                {/*}
                <NavDropdown title="Quick Links" id="basic-nav-dropdown" className='mx-left'style={{color:'white', fontSize:'large'}}>
              <NavDropdown.Item >
                <Link to={'/signin'} className="nav-link">Membership</Link>              
              </NavDropdown.Item>
              <NavDropdown.Item>
              <Link to={'/signin'} className="nav-link">Project Info</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
              <Link to={'/signin'} className="nav-link">About Us</Link> 
                </NavDropdown.Item>
            </NavDropdown> */}
            

            <Nav className='me-auto'></Nav>
            
              {
              //Some links should be shown based on user's authentication status 
              !user.isAuthenticated ?
              //Case that user is not authenticated/logged out (PUBLIC)
                <Nav className="justify-content-end" style={{fontSize: 'larger', fontFamily: 'verdana, sans-serif', color:'white'}}>
                  <Nav>
                    <Link to={'/signin'} className="nav-link">
                      Sign-In
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={'/register'} className="nav-link">
                      Register!
                    </Link>
                  </Nav>
                </Nav>
                :
                //Case that the user is authenticated/logged in (PRIVATE)
                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={'/signin'} className="nav-link" onClick={() =>logoutUser(navigate)}>
                      Logout
                    </Link>
                    <Link to={'/profile'} className="nav-link">
                    Your Profile
                    </Link>
                  </Nav>
                  {/* If user is an admin, they can see some other navigation links too! */}
                  {user.user.role === 'admin'?
                    <Nav>
                      <Link to={'/manage'} className="nav-link">
                        Management
                      </Link>
                    </Nav>:
                    ""
              }
                </Nav>
              }
               </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps , {logoutUser})(Header);
