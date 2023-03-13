export const unless = function (path: RegExp, middleware) {
  return function (req, res, next) {
    if (path.test(req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};
