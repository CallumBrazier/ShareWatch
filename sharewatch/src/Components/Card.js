import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import "./CSS/Card.css";
import UserContext from "../Context/UserContext";
import LineGraph from "./Graph";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
    maxWidth: 375,
    borderRadius: "2rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function StockCard({ query }) {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [company, setCompany] = useState("");
  const [stock, setStock] = useState("");
  const [metrics, setMetrics] = useState("");
  const [stockHistory, setStockHistory] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [newsexpanded, setNewsExpanded] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [timeframe, setTimeframe] = useState("1D");
  const [unixtime, setUnixtime] = useState("");
  const [interval, setInterval] = useState("1");
  const [graphData, setGraphData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClickNews = () => {
    setNewsExpanded(!newsexpanded);
  };

  const favouriteStock = async () => {
    let id = user.user.id;
    let ticker = company.ticker;
    let data = { id, ticker };

    if (favourite === false) {
      setFavourite(true);
      await Axios.post("/stocks/favourites", data).then((res) => {
        if (res.data.msg) {
          // setStatus(res.data.msg);
          console.log(res.data.msg);
        }
      });
    } else if (favourite === true) {
      setFavourite(false);
      console.log(data);
      await Axios.delete("/stocks/delete", {
        data: data,
      }).then((res) => {
        if (res.data.msg) {
          console.log(res.data.msg);

          // setStatus(res.data.msg);
        }
      });
    }
  };

  useEffect(() => {
    async function getNews() {
      const d = new Date();
      const dateto = d.toISOString().split("T")[0];
      const startdate = d.setFullYear(d.getFullYear() - 1);
      const date = new Date(startdate);
      const datefrom = date.toISOString().split("T")[0];
      let data = { dateto, datefrom, query };

      await Axios.post("/api/companynews", data).then((res) => {
        console.log("date-info", res);
        if (res.data.msg) {
          return console.log("news error message", res.data.msg);
        } else {
          setNewsData(res.data.data);
          console.log("FH-News-Info", res.data.data);
        }
      });
    }

    async function getStock() {
      let data = { query };
      await Axios.post("/api/stockinfo", data).then((res) => {
        console.log("stock-info", res);
        if (res.data.msg) {
          return console.log("stock info error", res.data.msg);
        } else {
          setStock(res.data.data);
          console.log("FH-Stock-Info", res.data.data);
        }
      });
    }

    async function getMetrics() {
      let data = { query };
      await Axios.post("/api/metrics", data).then((res) => {
        console.log("metrics", res);
        if (res.data.msg) {
          return console.log("metric info error", res.data.msg);
        } else {
          setMetrics(res.data.data);
          console.log("FH-Metrics-Info", res.data.data);
        }
      });
    }

    async function getCompany() {
      let data = { query };
      await Axios.post("/api/companydetails", data).then((res) => {
        console.log("company details", res);
        if (res.data.msg) {
          return console.log("company info error", res.data.msg);
        } else {
          setCompany(res.data.data);
          console.log("FH-Company-Info", res.data.data);
        }
      });
    }

    async function getFavourite() {
      let id = user.user.id;
      let ticker = query;
      console.log(id, ticker);
      let data = { id, ticker };

      try {
        await Axios.post("/stocks/checkfavourite", data).then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
            setFavourite(true);
          }
        });
      } catch (err) {
        console.log("Not yet favourited");
        setFavourite(false);
      }
    }

    getStock();
    getMetrics();
    getCompany();
    getNews();
    setFavourite(false);
    getFavourite();
  }, [query]);

  useEffect(() => {
    const currentdate = Math.round(new Date().getTime() / 1000);
    const date = new Date();
    const daybefore = Math.round(date.setDate(date.getDate() - 1) / 1000);
    const int = "1";

    async function firstAPICall() {
      let data = { currentdate, date, daybefore, int, query };
      await Axios.post("/api/candles", data).then((res) => {
        console.log("candle details", res);
        if (res.data.msg) {
          return console.log("candle info error", res.data.msg);
        } else {
          setStockHistory(res.data.data.c);
          setGraphData(res.data.data.t);
          setTimeData(
            graphData &&
              graphData.map((data) => {
                let date = new Date(data * 1000);
                return date.toLocaleString();
              })
          );
        }
      });
    }
    firstAPICall();
  }, []);

  useEffect(() => {
    const currentdate = Math.round(new Date().getTime() / 1000);
    setUnixtime(currentdate - 86400);

    if (timeframe === "1D") {
      setUnixtime(currentdate - 86400);
      console.log("1D", unixtime);
      setInterval("1");
    } else if (timeframe === "1W") {
      setUnixtime(currentdate - 86400 * 7);
      setInterval("60");
      console.log("1W", unixtime);
    } else if (timeframe === "1M") {
      setUnixtime(currentdate - 2629743);
      setInterval("60");
      console.log("1M", unixtime);
    } else if (timeframe === "3M") {
      setUnixtime(currentdate - 2629743 * 3);
      setInterval("D");
      console.log("3M", unixtime);
    } else if (timeframe === "6M") {
      setUnixtime(currentdate - 2629743 * 6);
      setInterval("D");
      console.log("6M", unixtime);
    } else if (timeframe === "1Y") {
      setUnixtime(currentdate - 31556926);
      setInterval("D");
      console.log("1Y", unixtime);
    } else {
      setUnixtime(currentdate - 31556926 * 5);
      setInterval("W");
      console.log("5Y", unixtime);
    }

    async function getStockHistory() {
      let data = { query, interval, unixtime, currentdate };
      await Axios.post("/api/stockhistory", data).then((res) => {
        console.log("stock history details", res);
        if (res.data.msg) {
          return console.log("company info error", res.data.msg);
        } else {
          setStockHistory(res.data.data.c);
          setGraphData(res.data.data.t);
          setTimeData(
            graphData &&
              graphData.map((data) => {
                let date = new Date(data * 1000);
                return date.toLocaleString();
              })
          );
          console.log("FH-Stock-History", stockHistory);
          console.log("FH-GraphData", graphData);
        }
      });
    }
    getStockHistory();
  }, [timeframe]);

  return (
    <div className="stockcard">
      <Card className={classes.root}>
        <CardContent>
          <div className="stockcard-top">
            <img src={company.logo} alt="" className="stock-logo" />
            <div className="stockcard-top-title">
              <h2 className="title-main">{company.name}</h2>
              <h5 className="title-second">
                {company.ticker} | {company.exchange}
              </h5>
            </div>
            <IconButton
              aria-label="add to favorites"
              onClick={favouriteStock}
              className="favourite-button"
            >
              {favourite ? (
                <FavoriteIcon className="favourite-button-icon" />
              ) : (
                <FavoriteBorderIcon className="favourite-button-icon" />
              )}
            </IconButton>
          </div>
          <div className="stockcard-main">
            <h3>
              ${stock.c} {company.currency}
            </h3>
            <div className="stockcard-main-right">
              <h3
                className={
                  stock.c - stock.pc > 0
                    ? "stockcard-main-right-change-profit"
                    : "stockcard-main-right-change-loss"
                }
              >
                {stock.c - stock.pc > 0
                  ? `+${(stock.c - stock.pc).toFixed(2)}`
                  : `${(stock.c - stock.pc).toFixed(2)}`}
              </h3>
              <h3>|</h3>
              <h3 className="stockcard-main-right-percentchange">
                {`${(((stock.c - stock.pc) / stock.pc) * 100).toFixed(2)}%`}
              </h3>
              <h3>
                {stock.c - stock.pc > 0 ? (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    className="trend-icon"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    className="trend-icon"
                  />
                )}
              </h3>
            </div>
          </div>
          <div className="stockcard-main-columns">
            <div className="stockcard-main-column-left">
              <p className="stockcard-value-header">Open</p>
              <p className="stockcard-value">{stock.o}</p>
              <p className="stockcard-value-header">Volume</p>
              <p className="stockcard-value">{stock.o}</p>
              <p className="stockcard-value-header">Day Range</p>
              <p className="stockcard-value">
                {stock.l}-{stock.h}
              </p>
            </div>
            <div className="stockcard-main-column-right">
              <p className="stockcard-value-header">Prev Close</p>
              <p className="stockcard-value">{stock.c}</p>
              <p className="stockcard-value-header">Market Cap</p>
              <p className="stockcard-value">
                {company.marketCapitalization > 999999
                  ? `${(company.marketCapitalization / 1000000).toFixed(2)}T`
                  : `${(company.marketCapitalization / 1000).toFixed(2)}B`}
              </p>

              <p className="stockcard-value-header">52 Week Range</p>
              <p className="stockcard-value">
                {metrics && metrics.metric
                  ? `${metrics.metric["52WeekLow"].toFixed(2)}-${metrics.metric[
                      "52WeekHigh"
                    ].toFixed(2)}`
                  : null}
              </p>
            </div>
          </div>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div className="radio">
              <input
                type="radio"
                name="myRadio"
                value="1D"
                id="1D"
                className="radio__input"
                checked={timeframe === "1D"}
                onClick={() => {
                  setTimeframe("1D");
                }}
              />
              <label for="1D" className="radio__label">
                1D
              </label>
              <input
                type="radio"
                name="myRadio"
                value="1W"
                id="1W"
                className="radio__input"
                checked={timeframe === "1W"}
                onClick={() => {
                  setTimeframe("1W");
                }}
              />
              <label for="1W" className="radio__label">
                1W
              </label>
              <input
                type="radio"
                name="myRadio"
                value="1M"
                id="1M"
                className="radio__input"
                checked={timeframe === "1M"}
                onClick={() => {
                  setTimeframe("1M");
                }}
              />
              <label for="1M" className="radio__label">
                1M
              </label>
              <input
                type="radio"
                name="myRadio"
                value="3M"
                id="3M"
                className="radio__input"
                checked={timeframe === "3M"}
                onClick={() => {
                  setTimeframe("3M");
                }}
              />
              <label for="3M" className="radio__label">
                3M
              </label>
              <input
                type="radio"
                name="myRadio"
                value="6M"
                id="6M"
                className="radio__input"
                checked={timeframe === "6M"}
                onClick={() => {
                  setTimeframe("6M");
                }}
              />
              <label for="6M" className="radio__label">
                6M
              </label>
              <input
                type="radio"
                name="myRadio"
                value="1Y"
                id="1Y"
                className="radio__input"
                checked={timeframe === "1Y"}
                onClick={() => {
                  setTimeframe("1Y");
                }}
              />
              <label for="1Y" className="radio__label">
                1Y
              </label>
              <input
                type="radio"
                name="myRadio"
                value="5Y"
                id="5Y"
                className="radio__input"
                checked={timeframe === "5Y"}
                onClick={() => {
                  setTimeframe("5Y");
                }}
              />
              <label for="5Y" className="radio__label">
                5Y
              </label>
            </div>

            <LineGraph stockHistory={stockHistory} graphData={timeData} />
          </CardContent>
        </Collapse>
        <Collapse in={newsexpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              {newsData.slice(0, 3).map((data) => {
                console.log(data);
                return (
                  <div>
                    <a className="news-link" href={data.url}>
                      <h2 className="news-headline">{data.headline}</h2>
                    </a>
                    <div className="news-summary">
                      <img
                        src={data.image}
                        alt="article image"
                        className="news-image"
                      />

                      {/* <h3>{data.datetime}</h3> */}

                      <p className="news-info">{data.summary}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Collapse>

        <CardActions>
          <div className="expand-buttons">
            {newsexpanded ? null : (
              <button
                size="small"
                className="graph-button"
                onClick={handleExpandClick}
              >
                {!expanded ? "Show Graphs" : "Hide Graphs"}
              </button>
            )}
            {expanded ? null : (
              <button
                size="small"
                className="graph-button news-button"
                onClick={handleExpandClickNews}
              >
                {!newsexpanded ? "Show News" : "Hide News"}
              </button>
            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
