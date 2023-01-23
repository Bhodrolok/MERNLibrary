import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateBook , addComment, allBook } from '../redux/actions/bookAction';
import {useNavigate, useParams} from 'react-router-dom';

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
//https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js

const Preview = ({book, user , updateBook , addComment , allBook}) => {
    const {id} = useParams();
    const [title , setTitle] = React.useState("");
    const [author , setAuthor] = React.useState("");
    const [description , setDescription] = React.useState("");
    const [comments , setComments] = React.useState("");
    const [myComment , setMyComment] = React.useState("");
    const [imageURL, setimageURL] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        allBook();
    } , [])
    React.useEffect(() => {
        if(book.books.length > 0){

                setTitle(book.books.filter(item => item._id == id)[0].title);
                setAuthor(book.books.filter(item => item._id == id)[0].author);
                setDescription(book.books.filter(item => item._id == id)[0].description);
                setComments(book.books.filter(item => item._id == id)[0].comments);
                setimageURL(book.books.filter(item=>item._id==id)[0].imageURL);
        }
    } , [book]);
    const url = 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png';
    //const url2 = book.book.imageURL;
    const url3 = imageURL;
    

    return (
        <div>
            
            <h2 className='text-center my-5'>Preview</h2>
            <img src={url} style={{width:'10rem', height:'10rem', maxWidth:'12rem', maxHeight:'12rem', justifyContent:'center', margin:'auto', display:'block'}}/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={author}  disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <p style={{ background:'#e9ecef', opacity:'1'}}>{description}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Comments on this book:</Form.Label>
                    {
                        comments.length>0 &&comments.map((item , index) =>{
                            var date = new Date(item.postedDate);
                            
                            return (
                                
                                <Form.Control type="text" 
                                value={item.email + " on " + date.toLocaleString('en-US') + " commented: " + item.comment} 
                                disabled 
                                />
                            )
                        })
                    }
                </Form.Group>
                

                <hr />
                {(comments.length>0 &&comments.filter(item => item.email == user.user.email).length==0) || comments.length ==0?
                    <>
                        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                            <Form.Label>Your comment: </Form.Label>
                            <Form.Control type="text" value={myComment} onChange = {(e) => setMyComment(e.target.value)} disabled = {!user.isAuthenticated}/>
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault(); 
                                addComment({id , email:user.user.email , comment:myComment} , navigate) }} disabled = {!user.isAuthenticated}
                                >
                                Leave a Comment!
                            </Button>
                        </div>
                    </>
                    :
                    ""
                }
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    book: state.book,
    user: state.user
});

export default connect(mapStateToProps , {addComment , allBook})(Preview);
