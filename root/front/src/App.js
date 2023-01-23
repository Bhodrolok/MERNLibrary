import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import  Header  from './components/NavBarAll'
import Home from './components/Home'
import Signin from './components/Signin'
import Register from './components/Register'
import Profile from './components/Profile'
import Update from './components/UpdateBook'
import Create from './components/CreateBook'
import Manage from './components/AdminManage'
import CreateUser from './components/CreateUser'
import UserUpdate from './components/UpdateUser'
import Preview from './components/Preview'


function App() {
  return (
    <div className="App">
        <Header />
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
              <Routes>
          {/* Landing page (public + private) */}
          <Route exact path="/" element={<Home/>}/>
          {/* Profile page (private) */}
                  <Route exact path="/profile" element={<Profile/>}/>
                  {/* Signup/Login pages (public) */}
                  <Route exact path="/register" element={<Register/>}/>
                  <Route exact path="/signin" element={<Signin/>}/>
                    {/*Admin management page (user+books) (private)  */}
                  <Route exact path="/manage" element={<Manage/>} />
                  
                  <Route exact path="/update/:id" element={<Update/>} />
                  <Route exact path="/user_update/:id" element={<UserUpdate/>}/>
                  <Route exact path="/preview/:id" element={<Preview/>}/>
                  <Route exact path="/create-book" element={<Create/>}/>
                  <Route exact path="/create-user" element={<CreateUser/>}/>
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default App