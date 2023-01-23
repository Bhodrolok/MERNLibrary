import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signinUser } from '../redux/actions/userAction';
import {useNavigate} from 'react-router-dom';

const Signin = ({signinUser , error}) => {
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
    const navigate = useNavigate();
    return (
        <div style = {{ maxWidth: '500px' }} className = 'm-auto'>
            <h2 className='text-center my-5'>Sign in</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange = {(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-danger">
                        {!error.isValid?error.error.email:""}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange = {(e) => setPassword(e.target.value)}/>
                    <Form.Text className="text-danger">
                        {!error.isValid?error.error.password:""}
                    </Form.Text>
                </Form.Group>
                <div className='text-center'>
                    <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault(); signinUser({email , password} , navigate)}}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    error: state.error
});

export default connect(mapStateToProps , {signinUser})(Signin);
