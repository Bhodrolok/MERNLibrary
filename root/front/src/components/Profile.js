import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { allBook } from '../redux/actions/bookAction';

const Profile = ({user, book, allBook}) => {

    const navigate = useNavigate();

    React.useEffect(() => {
        allBook();
    } ,[book]);

    return (
        <div>
            <Button onClick={() => navigate('/')} className='btn-secondary'>To Library</Button>
            <h2 className='text-center my-5'>My Profile</h2>
            <h4>user handle: {user.user.name}</h4>
            <h4>email address: {user.user.email}</h4>
            <br></br>
            {/* <h4>role is: {user.user.role}</h4> */}
            <h4>Your Favourite books:</h4>
            <p>
                {user.user.favourites.length> 0 && user.user.favourites.map(item =>book.books.filter(_item => _item._id == item)[0].title).map(item => <p className='text-success'>Book title: {item}</p>)}
            </p>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
    book: state.book
});

export default connect(mapStateToProps , {allBook})(Profile);
