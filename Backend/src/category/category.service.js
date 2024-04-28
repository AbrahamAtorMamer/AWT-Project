const db = require("../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  changeStatus,
  searchByKeyword,
};

async function getAll() {
  return await db.Category.findAll({
    // include: [
    //   {
    //     model: db.Category,
    //   },
    // ],
  });
}

async function getById(id, callback) {
  getCategory(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function create(params) {
  // Check if user with the same email already exists
  // const existingCategory = await db.Category.findOne({ where: { category_title } });
  // if (existingCategory) {
  //   return "Category " + category_title + " already exists";
  // }

  // Create a new category
  const newCategory = new db.Category({ category_name: params.category_name});

  // Save the user to the database
  await newCategory.save()


  return newCategory;
}

async function update(id, params) {
  const category = await getCategory(id);
  if (!category) {
    return "Category not found";
  }

  try {
    await category.update(params);
    return category;
  } catch (error) {
    return error;
  }
}

async function changeStatus(id) {
  const Category = await getCategory(id);
  if (Category.category_status) {
    Category.category_status = false;
    console.log("Category inactivated");
  } else {
    Category.category_status = true;
    console.log("Category activated");
  }
  await Category.save();
  return Category;
}

async function searchByKeyword(searchKeyword) {
  const Category = await db.Category.findAll({
    where: { category_name: { [Op.like]: "%" + searchKeyword + "%" } },
  });

  if (!Category || Category.length === 0) return "No categorys found";
  return Category;
}

async function getCategory(id) {
  const Category = await db.Category.findByPk(id);
  if (!Category) return "Category not found";
  return Category;
}

async function del(id) {
  return await db.Category.destroy({
    where: {
      id,
    },
  });
}
