export const getLoginPage = (req, res) => {
  if (req.session?.user) return res.redirect("/");
  res.render("login", { error: null });
};

export const postLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.restaurantADMIN_USER && password === process.env.restaurantADMIN_PASSWD) {
    req.session.user = { username };
    return res.redirect("/dashboard");
  }

  return res.status(401).render("login", { error: "Invalid username or password." });
};

export const postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
