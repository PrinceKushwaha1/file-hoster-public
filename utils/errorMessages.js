class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

function notFound(message) {
    return new CustomError(message, 404);
}

function badRequest(message) {
    return new CustomError(message, 400);
}

function unauthorized(message) {
    return new CustomError(message, 401);
}

function forbidden(message) {
    return new CustomError(message, 403);
}

function internalServerError(message) {
    return new CustomError(message, 500);
}

function notImplemented(message) {
    return new CustomError(message, 501);
}

function userNotFound() {
    return notFound('User not found');
}

function invalidToken() {
    return unauthorized('Invalid token');
}

function fileNotFound() {
    return notFound('File not found');
}

function directoryNotFound() {
    return notFound('Directory not found');
}

function invalidCreds() {
    return unauthorized('Invalid credentials');
}

function invalidUsernameOrPassword() {
    return badRequest('Invalid username or password');
}

function forbiddenPage() {
    return forbidden('You do not have permission to access this page');
}

function forbiddenPath() {
    return forbidden('You do not have permission to access this path');
}

module.exports = {
    notFound,
    badRequest,
    unauthorized,
    forbidden,
    internalServerError,
    notImplemented,
    userNotFound,
    invalidToken,
    fileNotFound,
    directoryNotFound,
    invalidCreds,
    invalidUsernameOrPassword,
    forbiddenPage,
    forbiddenPath
}