export const handleError = (err, req, res, next) => {
    console.error(err);
  
    const errorResponse = {
      error: {
        message: err.message,
        status: err.status || 500,
      },
    };
  
    res.status(errorResponse.error.status).json(errorResponse);
  };