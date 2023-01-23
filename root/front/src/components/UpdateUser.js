import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateUser } from '../redux/actions/userAction';
import {useNavigate, useParams} from 'react-router-dom';

const UserUpdate = ({user , updateUser}) => {
    const {id} = useParams();
    const [name , setName] = React.useState(user.others.filter(item => item._id == id)[0].name);
    const [email , setEmail] = React.useState(user.others.filter(item => item._id == id)[0].email);
    const navigate = useNavigate();
    return (
        <div>
            <h2 className='text-center my-5'>Update User</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange = {(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} onChange = {(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <div className='text-center'>
                    <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault(); updateUser({id , name , email} , navigate) }}>
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps , {updateUser})(UserUpdate);
