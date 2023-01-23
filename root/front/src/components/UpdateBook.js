import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateBook } from '../redux/actions/bookAction';
import {useNavigate, useParams} from 'react-router-dom';

const Update = ({book , updateBook}) => {
    const {id} = useParams();
    const [title , setTitle] = React.useState(book.books.filter(item => item._id == id)[0].title);
    const [author , setAuthor] = React.useState(book.books.filter(item => item._id == id)[0].author);
    const [description , setDescription] = React.useState(book.books.filter(item => item._id == id)[0].description);
    const navigate = useNavigate();
    return (
        <div>
            <h2 className='text-center my-5'>Update Book</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange = {(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={author} onChange = {(e) => setAuthor(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange = {(e) => setDescription(e.target.value)}/>
                </Form.Group>
                <div className='text-center'>
                    <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault(); updateBook({id , title , author ,description} , navigate) }}>
                        Update
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    book: state.book
});

export default connect(mapStateToProps , {updateBook})(Update);
