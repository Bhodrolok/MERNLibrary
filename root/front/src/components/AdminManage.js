import * as React from 'react';
import { Row , Col , Table , Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { allBook , deleteBook } from '../redux/actions/bookAction';
import { allOthers, deleteUser } from '../redux/actions/userAction';
import {useNavigate} from 'react-router-dom';

const Manage = ({
    book, user , allBook , deleteBook , allOthers , deleteUser
}) => {
    React.useEffect(() => {
        allBook();
        allOthers();
    } , []);

    const navigate = useNavigate();
    return (
        <Row className = 'mt-5'>
            <Col md ={6}>
                <h4 className='text-primary text-center'>User Management</h4>
                <div className = 'text-end my-3'>
                    <Button className='btn-success' onClick={() => navigate('/create-user')}>Add new user</Button>
                </div>
                <div style={{overflow:'scroll', maxWidth: '100%',maxHeight:'30rem' ,margin:'auto'}}>
                <Table striped bordered hover>
                    <thead className='text-center'>
                        <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th style={{width: '150px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {user.others.map((item , index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button size='sm' className = 'btn-warning' onClick={() => navigate(`/user_update/${item._id}`)}>update</Button>
                                    <Button size='sm' className = 'btn-danger' onClick={() => deleteUser({id: item._id} , navigate)}>delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </Col>
            
            
            <Col md ={6}>
                <h4 className='text-warning text-center'>Book Management</h4>
                <div className = 'text-end my-3'>
                    <Button className='btn-success' onClick={() => navigate('/create-book')}>Add new book</Button>
                </div>
                <div style={{overflow:'scroll', maxWidth: '100%',maxHeight:'30rem', margin:'auto'}}>
                <Table striped bordered hover>
                    <thead className='text-center'>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th style={{width: '150px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {book.books.map((item , index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>
                                    <Button size='sm' className = 'btn-warning' onClick={() => navigate(`/update/${item._id}`)}>update</Button>
                                    <Button size='sm' className = 'btn-danger' onClick={() => deleteBook({id: item._id} , navigate)}>delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    book: state.book,
    user: state.user
})

export default connect(mapStateToProps , {allBook , allOthers , deleteBook , deleteUser})(Manage);
