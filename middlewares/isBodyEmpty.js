import { httpError } from '../helpers/index.js';
const isBodyEmpty = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(httpError(400, 'missing fields'));
  }
  next();
};
export default isBodyEmpty;
