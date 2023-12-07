const customHeader = (request, response, next) => {
  try {
    const { api_key } = request.headers;
    if (api_key === 'api-public-123') {
      next();
    } else {
      response.status(403);
      response.send({ error: 'api_key no es correcta' })
    }

  } catch (error) {
    response.status(403);
    response.send({ error: 'Error customHeader' })
  }
}

module.exports = customHeader;