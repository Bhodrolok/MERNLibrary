import { connect } from 'react-redux';
import * as React from 'react';
import {Form , Button } from 'react-bootstrap';
import {registerUser} from '../redux/actions/userAction';
import {useNavigate} from 'react-router-dom';

const Register = ({registerUser , user}) => {
    const [name , setName] = React.useState('');
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
    const [role , setRole] = React.useState('normal');

    
    //Very basic boolean flag to check if all input fields are blank/empty
    const allFilled = ((name != "") && (email != "") && (password != ""));

    const navigate = useNavigate();

    return (
        <div style = {{ maxWidth: '500px' }} className = 'm-auto'>
            <h2 className='text-center my-5'>Register</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value = {name} onChange = {e => setName(e.target.value)} />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  value = {email} onChange = {e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value = {password} onChange = {e => setPassword(e.target.value)}  />
                </Form.Group>
                <div className='text-center'>
                    <Button variant="primary" disabled={!allFilled} type="submit" onClick = {e => {e.preventDefault(); registerUser({name , email , password} , navigate)}}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps , {registerUser})(Register);
