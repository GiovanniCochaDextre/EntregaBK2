import passport from "passport";

export const isAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const isUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user || user.role !== 'user') {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.user = user;
    next();
  })(req, res, next);
};