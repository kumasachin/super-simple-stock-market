import React, { useState, useEffect } from 'react';
import {
    calculateDividendYield,
    calculatePERatio,
    getTime,
    filterTradeItem,
    calculateVWSPrice
} from "../../utils/common";

export const StockRow = ({stock, trades, setStockInStore, handleTrade, index}) => {
    const {
        symbol = "",
        type = "-",
        lastDividend = "-",
        fixedDividend = "",
        parValue = "-",
        price,
        quantity = ""
    } = stock;
    const [stockData, setStock] = useState(stock);
    const [priceData, setPrice] = useState(price);
    const [quantityData, setQuantity] = useState(quantity);
    const [tradesData, setTrades] = useState(trades);
    
    const handleInputChange = (event) => {
        const {
          name, 
          value
        } = event.target;
        name === "price" ? setPrice(parseFloat(value)) : setQuantity(parseFloat(value)); 
    };
    
    const handleTradeSubmission = (event) => {
        const {
          name, 
        } = event.target;
        const {
            timestamp,
            dateAndTime
        } = getTime();
        const newTradeRow = {
            symbol, 
            timestamp,
            dateAndTime,
            action: name === "buy" ? "buy" : "sell",
            price: priceData,
            quantity: quantityData,
            totalPrice: priceData * quantityData
        };
        setQuantity("");
        handleTrade(newTradeRow);
        setTrades([
            ...tradesData,
            newTradeRow
        ]);
    };

    useEffect(() => {
        if(priceData !== price) {
            setStock({ 
                ...stockData,
                quantity: quantityData,
            }, index);
        }
    }, [quantityData, index]);

    useEffect(() => {
        if (tradesData.length > 0) {
            const tradeInTime = filterTradeItem(tradesData,{
                key: "symbol",
                value: symbol,
                duration: 15
            });
            setStock({ 
                ...stockData,
                VWSPrice: calculateVWSPrice(tradeInTime)
            });
        }
    }, [tradesData]);

    useEffect(() => {
        if(priceData !== price) {
            const dividendYield = calculateDividendYield({ 
                ...stockData,
                price: priceData
            });
            const peRatio = calculatePERatio({dividendYield, priceData});

            setStock({ 
                ...stockData,
                price: priceData,
                dividendYield,
                peRatio
            }, index);
        }
    }, [priceData, index]);
    
    useEffect(() => {
        setStockInStore({ 
            ...stockData
        }, index);
    }, [stockData, index]);
    
    return (
        <tr data-testid={`stock-row-${index}`} key={`stock-row-${index}`}>
            <td data-testid={`stock-symbol-${index}`}>{symbol}</td>
            <td data-testid={`stock-type-${index}`}>{type}</td>
            <td data-testid={`stock-lastdivident-${index}`}>{lastDividend ? lastDividend : '-'}</td>
            <td data-testid={`stock-fixeddividend-${index}`}>{fixedDividend ? `${fixedDividend}%` : "-"}</td>
            <td data-testid={`stock-parvalue-${index}`}>{parValue}</td>
            <td><input name={"price"} type='number' min="1" data-testid={`stock-price-${index}`} onBlur={handleInputChange} /></td>
            <td data-testid={`stock-dividentyield-${index}`}>
                {
                    stockData.dividendYield && 
                    stockData.dividendYield.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                }
            </td>
            <td data-testid={`stock-peratio-${index}`}>
                {
                    stockData.peRatio && 
                    stockData.peRatio.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                }
            </td>
            <td data-testid={`stock-vwsprice-${index}`}>
                {
                    stockData.VWSPrice && 
                    stockData.VWSPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                }
            </td>
            <td><input name={"quantity"} data-testid={`stock-quantity-${index}`} value={quantityData} type='number' min="1" onChange={handleInputChange} /></td>
            <td data-testid={`stock-buysell-${index}`}>
                <button data-testid={`stock-buy-${index}`} name="buy" {...( !(priceData && quantityData) && { disabled: true })} onClick={handleTradeSubmission}>Buy</button>
                <br/><br/>
                <button data-testid={`stock-sell-${index}`} name="sell" {...( !(priceData && quantityData) && { disabled: true })} onClick={handleTradeSubmission}>Sell</button>
            </td>
        </tr>
    );
}

export default StockRow;