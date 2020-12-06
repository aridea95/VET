const { tokenVerifier } = require("../helpers/jwt");

exports.Authentication = (req, res, next) => {
    const { access_token } = req.headers;
    if (!access_token) {
        res.status(400).json({
            success: false,
            message: "Token is not found!",
        });
    } else {
        try {
            const decoded = tokenVerifier(access_token);

            req.userData = decoded;
            next();
        } catch (err) {
            next(err);
        }
    }
};

exports.isPatient = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'patient') {
        next()
    } else {
        res.status(400).json({
            success: false,
            message: "Access Denied! You are not Patient!",
        });
    }
}

exports.isClinic = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'clinic') {
        next()
    } else {
        res.status(400).json({
            success: false,
            message: "Access Denied! You are not Clinic!",
        });
    }
}
exports.isVeterinary = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'veterinary') {
        next()
    } else {
        res.status(400).json({
            success: false,
            message: "Access Denied!",
        });
    }
}