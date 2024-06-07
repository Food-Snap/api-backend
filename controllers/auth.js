const authService = require('../services/auth');

exports.signup = async (req, res, next) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json({ message: 'User Created', user });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ message: 'Logged in', token });
    } catch (error) {
        next(error);
    }
};
