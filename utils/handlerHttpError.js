const handlerHttpError = (response, message = 'Algo sucedio ', code = 403) => {
  response.status(code).json({ error: message });
}

module.exports = { handlerHttpError }