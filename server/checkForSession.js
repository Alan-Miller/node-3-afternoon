module.exports = function checkSessionUser(req, res, next) {
  if (!req.session.user) {
    req.session.user = { username: '', cart: [], total: 0.00 };
    // req.session.user = { id: ++id, username: '', pword: '' };
    // users.push(req.session.user);
  }
  console.log("user is ", req.session.user)
  next();
}