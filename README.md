<img width="1274" alt="Screen Shot 2021-03-16 at 4 09 35 PM" src="https://user-images.githubusercontent.com/38820651/111251079-6d6aaa00-8673-11eb-9f2e-3d15ca798ea0.png">

# ShareWatch🍃

## Overview
The aim of this project is to create a hub where anyone can login, follow their favourite stocks, and track them on a user-friendly dashboard. <br/>
This will assist them in making informed decisions about which stocks to trade and which to buy. 🚀

## Stack
This project has been developed using **MongoDB**, **Express**, **React**, and **Node.js**. <br/>
It also utilises the **[Finnhub API](https://finnhub.io/)** to get up-to-date stock and company information.

## Current features
- [x] Register a new-user and log in to your private dashboard.
- [x] The ability to search for US stocks and favourite them.
- [x] Favourite stocks appear on your dashboard.

## In-progress features
- [ ] Drag and drop the cards on your dashboard into a desired order. 
- [ ] Graphing stock movements over time. 
- [ ] Select two stocks and compare them. 

## Potential future featues
- [ ] A forum for different users to discuss stocks. 
- [ ] The ability to search securities from other exchanges outside of the US (e.g. NZX, ASX).
- [ ] The ability to search for cryptocurrencies.
- [ ] Add when a stock was purchased, and how much was purchased, and track your return over-time.

## Deployment
ShareWatch has currently been deployed with Heroku, and can be accessed **[here](https://share-watch.herokuapp.com/)**. <br/>
Note: ShareWatch uses the free-tier of the Finnhub API, which limits API calls to a maximum of 30 calls per second, and up to 60 calls per minute.

## Running Locally
### 1. Clone the repository: 
   1. The first step is to clone this repository into a folder on your local computer. 
### 2. Install the dependencies: <br/>
   1. From the root folder, navigate into the server folder (cd server) and run npm install in the console to download the dependencies. <br/>
   2. Repeat this step; navigating into the sharewatch folder (cd ../sharewatch from the server folder, or cd sharewatch from the root folder) and run npm install.
### 3. Set up environment variables: <br/>
   1. In the server folder you will need to create a .env file to hold your environment variables. <br/>
   2. The first variable is called DB_Connection, which you can get by setting up a new cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).<br/>
   3. Next you will also need to get an API Key from [Finnhub](https://finnhub.io/) and save that as REACT_APP_FH_API_KEY in the .env file.<br/>
   4. Lastly, you will need to create a JWT_SECRET in the .env file. This secret code can be anything, but it is recommended that it is generated [here](https://passwordsgenerator.net/). This is used for secure authorisation based on [JSON Web Tokens](https://jwt.io/introduction).<br/>
### 4. Run the application: <br/>
   1. Once this is complete, you will need to run npm start in both the sharewatch folder and server folder, and navigate to the relevant port on the [localhost](http://localhost:3000).

