import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UserContext from "../Context/UserContext";

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
  const [expanded, setExpanded] = React.useState(false);
  //   const [favourite, setFavourite] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //   const favouriteStock = async () => {
  //     let id = user.user.id;
  //     let ticker = company.Symbol;
  //     let data = { id, ticker };

  //     if (favourite === false) {
  //       setFavourite(true);
  //       await Axios.post("http://localhost:3001/stocks/favourites", data).then(
  //         (res) => {
  //           if (res.data.msg) {
  //             console.log(res.data.msg);
  //           }
  //         }
  //       );
  //     } else if (favourite === true) {
  //       setFavourite(false);
  //       console.log(data);
  //       await Axios.delete("http://localhost:3001/stocks/delete", {
  //         data: data,
  //       }).then((res) => {
  //         if (res.data.msg) {
  //           console.log(res.data.msg);
  //         }
  //       });
  //     }
  //   };

  useEffect(() => {
    async function getCompany() {
      await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=${process.env.API_KEY}`
      )
        .then((response) => response.json())
        .then((companyInfo) => {
          setCompany(companyInfo);
          console.log(companyInfo);
        });
    }

    async function getStock() {
      await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${query}&interval=1min&apikey=${process.env.API_KEY}`
      )
        .then((response) => response.json())
        .then((stockInfo) => {
          setStock(stockInfo);
          console.log(stockInfo);
        });
    }

    // async function getFavourite() {
    //   let id = user.user.id;
    //   let ticker = query;
    //   console.log(id, ticker);
    //   let data = { id, ticker };

    //   try {
    //     await Axios.post(
    //       "http://localhost:3001/stocks/checkfavourite",
    //       data
    //     ).then((res) => {
    //       if (res.data.msg) {
    //         console.log(res.data.msg);
    //         setFavourite(true);
    //       }
    //     });
    //   } catch (err) {
    //     console.log("Not yet favourited");
    //     setFavourite(false);
    //   }
    // }

    getCompany();
    getStock();
  }, [query]);

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <h2>
            {company.Name} ({company.Symbol})
            {/* <IconButton aria-label="add to favorites" onClick={favouriteStock}> */}
            {/* {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
            {/* </IconButton> */}
          </h2>

          <h4>
            {/* Current Value: {stockInfo.Time_Series ([1]min)} */}
            52 Week High: ${company["52WeekHigh"]} <br />
            52 Week Low: ${company["52WeekLow"]} <br />
            Market Cap: {company.MarketCapitalization} <br />
            Shares: {company.SharesOutstanding} <br />
            Dividend Yeild: ${company.DividendYield} <br />
            EBITDA: ${company.EBITDA} <br />
            EPS: {company.EPS} <br />
            PE Ratio: {company.PERatio} <br />
            Return on Assets: {company.ReturnOnAssetsTTM} <br />
            Return on Equity: {company.ReturnOnEquityTTM} <br />
          </h4>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleExpandClick}>
            Learn More
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Company Description:</Typography>
            <Typography paragraph>{company.Description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
