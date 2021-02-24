const router = require("express").Router();
const Stock = require("../models/stockModels");
const auth = require("../middleware/auth");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

router.post("/favourites", async (req, res) => {
  try {
    let { id, ticker } = req.body;
    console.log("add", req.body);
    let uniqueCode = id.concat(ticker);
    const newStock = new Stock({
      id,
      ticker,
      uniqueCode: uniqueCode,
    });

    const existingStock = await Stock.findOne({ uniqueCode: uniqueCode });
    if (existingStock)
      return res.status(400).json({ msg: "Favourite already exists!" });

    const savedStock = await newStock.save().then(() => {
      res.status(200).json({ msg: "Favourite added!", favourite: newStock });
    });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

router.post("/allfavourites", async (req, res) => {
  try {
    let { id } = req.body;
    console.log("all", req.body);

    const allStocks = await Stock.find({ id: id });
    if (allStocks)
      return res
        .status(200)
        .json({ msg: "All favourites grabbed!", favourites: allStocks });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

router.post("/checkfavourite", async (req, res) => {
  try {
    let { id, ticker } = req.body;
    console.log("check", req.body);
    let uniqueCode = id.concat(ticker);

    const existingStock = await Stock.findOne({ uniqueCode: uniqueCode });
    if (existingStock)
      return res.status(200).json({ msg: "Favourite already exists!" });
  } catch (err) {
    res.status(500).json("Error: " + err.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    let { id, ticker } = req.body;
    console.log("remove", req.body);
    let uniqueCode = id.concat(ticker);
    console.log(uniqueCode);

    const deletedStock = await Stock.findOneAndDelete({
      uniqueCode: uniqueCode,
    });
    res
      .status(200)
      .json({ msg: "Favourite removed!", favourite: deletedStock });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
