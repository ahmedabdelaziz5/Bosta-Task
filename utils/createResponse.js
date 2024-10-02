exports.createResponse = (success, message, statusCode, error = null, data = null) => {
  if (!success) {
    return {
      success,
      statusCode,
      message,
      ...(error !== null && { error }),
    }
  }
  return {
    success,
    statusCode,
    message,
    ...(data !== null && { data }),
  }
};