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

    
}

export default Books