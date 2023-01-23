import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createBook } from '../redux/actions/bookAction';
import {useNavigate, useParams} from 'react-router-dom';

const Create = ({book , createBook}) => {
    const [title , setTitle] = React.useState('');
    const [author , setAuthor] = React.useState('');
    const [description , setDescription] = React.useState('');
    const navigate = useNavigate();
    return (
        <div>
            <h2 className='text-center my-5'>Add a new book entry to the library</h2>
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
                    <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault();createBook({title , author , description} , navigate)}}>
                    Add to Collection!
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    book: state.book
});

export default connect(mapStateToProps , {createBook})(Create);
