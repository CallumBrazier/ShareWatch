const router = require("express").Router();
const axios = require("axios");

router.post("/companynews", async (req, res) => {
  try {
    let { dateto, datefrom, query } = req.body;
    console.log("companynews", req.body);

    await axios
      .get(
        `https://finnhub.io/api/v1/company-news?symbol=${query}&from=${datefrom}&to=${dateto}&token=${process.env.REACT_APP_FH_API_KEY}`
      )
      .then((response) => {
        console.log("api response:", response.data);
        res.status(200).json({ data: response.data });
      });
  } catch (err) {
    console.log("error:", err);
    res.status(200).json({ msg: err.message });
  }
});

router.post("/stockinfo", async (req, res) => {
  try {
    let { query } = req.body;
    console.log("stock info", req.body);

    await axios
      .get(
        `https://finnhub.io/api/v1/quote?symbol=${query}&token=${process.env.REACT_APP_FH_API_KEY}`
      )
      .then((response) => {
        console.log("api response:", response.data);
        res.status(200).json({ data: response.data });
      });
  } catch (err) {
    console.log("error:", err);
    res.status(200).json({ msg: err.message });
  }
});

router.post("/metrics", async (req, res) => {
  try {
    let { query } = req.body;
    console.log("metrics info", req.body);

    await axios
      .get(
        `https://finnhub.io/api/v1/stock/metric?symbol=${query}&token=${process.env.REACT_APP_FH_API_KEY}`
      )
      .then((response) => {
        console.log("api response:", response.data);
        res.status(200).json({ data: response.data });
      });
  } catch (err) {
    console.log("error:", err);
    res.status(200).json({ msg: err.message });
  }
});

router.post("/companydetails", async (req, res) => {
  try {
    let { query } = req.body;
    console.log("company info", req.body);

    await axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${query}&token=${process.env.REACT_APP_FH_API_KEY}`
      )
      .then((response) => {
        console.log("api response:", response.data);
        res.status(200).json({ data: response.data });
      });
  } catch (err) {
    console.log("error:", err);
    res.status(200).json({ msg: err.message });
  }
});

router.post("/candles", async (req, res) => {
  try {
    let { currentdate, date, daybefore, int, query } = req.body;
    console.log("candle info", req.body);

    await axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${query}&resolution=${int}&from=${daybefore}&to=${currentdate}&token=${process.env.REACT_APP_FH_API_KEY}`
      )
      .then((response) => {
        console.log("api response:", response.data);
        res.status(200).json({ data: response.data });
      });
  } catch (err) {
    console.log("error:", err);
    res.status(200).json({ msg: err.message });
  }
});

router.post("/stockhistory", async (req, res) => {
  try {
    let { query, interval, unixtime, currentdate } = req.body;
    console.log("candle info", req.body);

    await axios
      .get(
        `https://finnhub.io/api/v1/stock/candle?symbol=${query}&resolution=${interval}&from=${unixtime}&to=${currentdate}&token=${process.env.REACT_APP_FH_API_KEY}`
      )
      .then((response) => {
        console.log("api response:", response.data);
        res.status(200).json({ data: response.data });
      });
  } catch (err) {
    console.log("error:", err);
    res.status(200).json({ msg: err.message });
  }
});

module.exports = router;
