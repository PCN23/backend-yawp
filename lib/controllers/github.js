const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const [user, token]  = await UserService.create(req.body);
      res.cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          maxAge: ONE_
} )  } catch (e) {
    next(e);
  }
});
