import Users from '../controllers/user';
import Books from '../controllers/book';

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the BookStore API!',
    }));

    app.post('/api/users', Users.signUp); // API route for user to signup
    app.post('/api/users/signin', Users.signIn); // API route for user to signup
    

    app.post('/api/users/:userId/books', Books.create)
    app.get('/api/books', Books.list)
    app.put('/api/books/:bookId', Books.modify)
    app.delete('/api/books/:bookId', Books.delete)
};