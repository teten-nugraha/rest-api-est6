import Users from '../controllers/user';
import Books from '../controllers/book';

import passport from 'passport';
require('../config/passport')(passport);

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the BookStore API!',
    }));

    app.post('/api/users', Users.signUp); // API route for user to signup
    app.post('/api/users/signin', Users.signIn); // API route for user to signup
    

    app.post('/api/users/:userId/books',passport.authenticate('jwt', { session: false}), Books.create)
    app.get('/api/books',passport.authenticate('jwt', { session: false}), Books.list)
    app.put('/api/books/:bookId', passport.authenticate('jwt', { session: false}),  Books.modify)
    app.delete('/api/books/:bookId', passport.authenticate('jwt', { session: false}),  Books.delete)
};