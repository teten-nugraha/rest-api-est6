import model from '../models';

const { Book } = model;

class Books {

    static create(req, res) {
        const { title, author, description, quantity } =  req.body;
        const { userId } = req.params
        return Book 
            .create({
                title,
                author,
                description,
                quantity,
                userId
            })
            .then(book => res.status(201).send({
                message: `Your book with the title ${title} has been created successfully `,
                book
            }))
    }

    static list(req, res) {
        return Book 
            .findAll()
            .then(books => res.status(200).send(books))
    }

    static modify(req, res) {
        const { title, author, description, quantity } = req.body
        return Book 
            .findById(req.params.bookId)
            .then((book) => {
                book.update({
                    title: title || book.title,
                    author: author || book.author,
                    description: description || book.description,
                    quantity: quantity || book.quantity,
                })
                .then((updatedBook) => {
                    res.status(200).send({
                        message: 'Book updated successfully',
                        data: {
                            title: title || updatedBook.title,
                            author: author || updatedBook.author,
                            description: description || updatedBook.description,
                            quantity: quantity || updatedBook.quantity
                        }
                    })
                })
                .catch(error => res.status(400).send(error))
            })
    }
}

export default Books