const jwt = require("jsonwebtoken");
const JWT_SECRET = "CP and development both are important";
const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    
       return res
            .status(401)
            .send({ error: "Please authenticate using valid credentials" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    if(!data){
        return res
            .status(401)
            .send({ error: "Please authenticate using valid credentials" });
    }
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
