const jwt = require("jsonwebtoken");

const createToken = async(req, res, object) => {

    const token = jwt.sign({ object }, process.env.TOKEN_SECRET_KEY, { expiresIn: "32m" });
    // re.header("auth-token", token);

    const response = {
        data: token,
        status: 201
    }

    return response;

}

const validateToken = async(req, res, next) => {

    const token = req.header("auth-token");

    if (token) {

        try {

            const verifyToken = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            req.user = verifyToken;
            next();

        } catch (error) {

            res.status(401).json(error);
        }

    } else {

        res.status(401).json({ Auth: "Token was not sent" });

    }

}

module.exports = { createToken, validateToken }