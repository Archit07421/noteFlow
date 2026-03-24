const jwt = require("jsonwebtoken");

/**
 * Expects `Authorization: Bearer <token>` or legacy header `auth-token: <token>`.
 * JWT payload must include `id` (user id) from login/signup.
 */
const fetchUser = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  const token = bearerToken || req.header("auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // Login issues: { id, email } — not `data.user`
    req.user = {
      id: data.id,
      email: data.email,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
};

module.exports = fetchUser;
