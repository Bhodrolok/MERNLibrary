import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { registerUser } from '../redux/actions/userAction';
import {useNavigate, useParams} from 'react-router-dom';

const CreateUser = ({book , registerUser}) => {
    const [name , setName] = React.useState('');
    const [email , setEmail] = React.useState('');
    const [password , setPassword] = React.useState('');
    const [role , setRole] = React.useState('normal');
    const navigate = useNavigate();
    return (
        <div>
            <h2 className='text-center my-5'>Add a new member to the library!</h2>
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
                        <Form.Label>Role</Form.Label>
                        <Form.Select onChange = {e => setRole(e.target.value)}>
                            <option value='normal'>Normal</option>
                            <option value='admin'>Admin</option>
                        </Form.Select>
                    </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value = {password} onChange = {e => setPassword(e.target.value)}  />
                </Form.Group>



                <div className='text-center'>
                    <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault();registerUser({name, email, role, password} , navigate)}}>
                    Add to Collection!
                    </Button>
                </div>

            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps , {registerUser})(CreateUser);
