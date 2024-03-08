export const genereateResponse = (data: any, errorMessage?: string) => {
  if (errorMessage) {
    return {
      data: null,
      error: {
        message: errorMessage,
      },
    };
  }
  return {
    data,
    error: null,
  };
};
