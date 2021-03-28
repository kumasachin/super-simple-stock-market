import React from 'react';
import {
    StockRow
} from "../stock-row/";

export const Stocks = React.memo(({stocks, trades, setStockInStore, handleTrade}) => {
    const stockRows = stocks ?
        stocks.map((stock, index) => (
            <StockRow 
                key={`stock-rows-${index}`}
                index={index} 
                stocks={stocks}
                trades={trades}
                setStockInStore={setStockInStore}
                stock={stock}
                handleTrade={handleTrade}
            />
        )): null;
    return (
        <>
            <h2 data-testid={`stock-table-title`}>
                Stocks
            </h2>
            <table data-testid={`stock-table`} key="stock-table" className='tableFormat'>
                <thead data-testid={`stock-thead`}>
                    <tr data-testid={`stock-tr`}>
                        <th>Stock Symbol</th>
                        <th>Type</th>
                        <th>Last Dividend</th>
                        <th>Fixed Dividend</th>
                        <th>Par Value</th>
                        <th>Price</th>
                        <th width="15%">Dividend Yield</th>
                        <th width="15%">P/E Ratio</th>
                        <th width="15%">Volume Weighted Stock Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {stockRows}
                </tbody>
            </table>
        </>
    );
});

export default Stocks;