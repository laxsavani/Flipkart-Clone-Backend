const jwt = require('jsonwebtoken');

exports.generateAdminToken = (admin) =>{
    return jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

exports.generateSellerToken = (seller) => {
    return jwt.sign(
      { id: seller.id, email: seller.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
}

exports.generateUserToken = (user) => {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
}