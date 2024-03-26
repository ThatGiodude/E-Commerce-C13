// // Import necessary modules
const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// GET /api/categories
// Fetches all categories along with their associated products
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET /api/categories/:id
// Fetches a single category by its ID, including its associated products
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// POST /api/categories
// Creates a new category
router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(categoryData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});
// PUT /api/categories/:id
// Updates an existing category
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const CategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE /api/categories/:id
// Deletes a category by its ID
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Export the router for use in other parts of the application
module.exports = router;