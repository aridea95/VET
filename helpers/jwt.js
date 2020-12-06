const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const tokenGenerator = (user) => {
    const { _id, name, role } = user;

    return jwt.sign({
            _id,
            name,
            role
        },
        secretKey
    );
};

const tokenVerifier = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = {
    tokenGenerator,
    tokenVerifier,
};