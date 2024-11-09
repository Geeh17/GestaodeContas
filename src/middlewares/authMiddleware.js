const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Usuário não autenticado" });
  };
  
  module.exports = authMiddleware;
  