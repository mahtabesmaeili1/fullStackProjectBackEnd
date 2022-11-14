const Category = require("./models").categories;
const Product = require("./models").products;

//test our relation
const getAllProducts = async () => {
  const productsWithCategories = await Product.findAll({
    raw: true,
    include: Category,
  });
  console.log(productsWithCategories);
};
getAllProducts();

//all categories with the products that belong to them.

const getAllCategory = async () => {
  const categoryWithProducts = await Category.findAll({
    raw: true,
    include: Product,
  });
  console.log(categoryWithProducts);
};
getAllCategory();
