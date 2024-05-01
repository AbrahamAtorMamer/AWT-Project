const db = require('../helpers/db.helper')
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchByKeyword,
  login,
};
async function getAll() {
  return await db.User.findAll({
    include: [
      {
        model: db.Campaign,
        as: "Campaigns"
      },
    ],
  });
}
async function getById(id, callback) {
  getUser(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const User = await getUser(id);
  const nameChanged = params.User_name && params.user_name !== User.user_name;
  if (
    nameChanged &&
    (await db.User.findOne({ where: { user_name: params.user_name } }))
  ) {
    return "User with name " + params.user_name + " is already exists";
  }
  Object.assign(User, params);
  await User.save();
  return User;
}

async function create(params) {
  // Check if user with the same email already exists
  const existingUser = await db.User.findOne({ where: { email: params.email } });
  if (existingUser) {
    return "User " + params.email + " already exists";
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(params.password, 10); // 10 is the saltRounds

  // Create a new user with the hashed password
  const newUser = new db.User({ email: params.email, password: hashedPassword, firstName: params.firstName, lastName: params.lastName, });

  // Save the user to the database
  await newUser.save()


  return newUser;
}

async function changeStatus(id) {
  const User = await getUser(id);
  //    const ret_msg = '';
  if (User.user_status) {
    User.user_status = false;
    // ret_msg = 'Camp Inactivated';
    console.log("from true");
  } else {
    User.user_status = true;
    console.log("from false");
    // ret_msg = 'Camp Activated';
  }
  await User.save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
  return User;
}
async function searchByKeyword(searchKeyword) {
  const User = await db.User.findAll({
    where: { user_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!User || User == []) return "no User found";
  return User;
}
async function getUser(id) {
  const User = await db.User.findByPk(id);
  if (!User) return "User not found";
  return User;
}
async function del(did) {
  return await db.User.destroy({
    where: {
      id: did
    }
  });
}

async function login(email, password) {
  try {
    // Find the user by email
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email not found');
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Token expiration time
    );

    // Return the user object along with the generated token
    return { user, token };
  } catch (error) {
    throw error;
  }
}

