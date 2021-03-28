import React, { useState } from "react";
import {
  Stocks,
  Trades
} from "./components/";
import stockData from "./data/stock";
import './App.css';
import {
  nthRoot
} from "./utils/common";

const App = () => {
  const [stocksData, setStocksData] = useState(stockData);
  const [tradesData, setTradesData] = useState([]);
  const [geomatricMean, setGeomatricMean] = useState("");
  const setStockInStore = (stock, index) => {
    const stockLocalData = [
      ...stocksData
    ];
    stockLocalData[index] = stock;
    setStocksData(stockLocalData);
  };
  const getGeomatricMean = () => {
    const filledElementArray = stocksData.map(stock => stock.price).filter(Boolean);
    if(filledElementArray.length > 0) {
      const allPriceMultplied = filledElementArray.reduce((prevPrice, nextPrice) => {
        if (prevPrice) {
          return prevPrice*nextPrice;
        }
        return nextPrice;    
      }, 0);
      const geomatricMean = nthRoot(allPriceMultplied, filledElementArray.length);
      setGeomatricMean(geomatricMean);
    } else {
      setGeomatricMean("");
    }
  };

  const handleTrade = (trade) => {
    setTradesData([
      ...tradesData, 
      trade
    ])
  };

  return (
    <div className="App">
      <header>
        <h1 data-testid="application-heading">Super simple stock market</h1>
      </header>
      <Stocks
        trades={tradesData} 
        stocks={stocksData} 
        setStockInStore={setStockInStore} 
        handleTrade={handleTrade} 
      />
      <br/>
      <h3 data-testid="geo-matric-mean-container">
        {
        geomatricMean ? (
          <span data-testid="geo-matric-mean">
            Current Geomatric Mean = {
              geomatricMean.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })
            }
          </span>): null 
        }
      </h3>
      <button data-testid="btn-get-geomatric-mean" onClick={getGeomatricMean}>Calculate Geometric Mean</button>
      <br/>
      {
        tradesData.length > 0 && <Trades 
          trades={tradesData} 
        />
      }
    </div>
  );
}

export default App;
