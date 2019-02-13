import model from '../models';
import jwt from 'jsonwebtoken'

const { User } = model;

class Users {

    static signUp(req, res) {
        const { name, username, email, password } = req.body
        return User
        .create({
            name,
            username,
            email,
            password
        })
        .then(userData => res.status(201).send({
            success: true,
            message: 'User successfully created',
            userData
        }))
    }

    static signIn(req, res) {
        const { email, password } = req.body
        User
            .find({
                where: {
                    email: email
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).send({
                        message: 'Authentication failed. User not found.',
                    });
                }
                user.comparePassword(password, (err, isMatch) => {
                if(isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
                    jwt.verify(token, 'nodeauthsecret', function(err, data){
                    console.log(err, data);
                    })
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
                })
            })
            .catch((error) => res.status(400).send(error));
    }
}

export default Users;