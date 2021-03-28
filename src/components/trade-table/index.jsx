import React from 'react';

const Trades = React.memo(({trades}) => {
    const tradeRows = trades ?
        trades.map((trade, index) => {
            const totalPrice = trade.price && trade.quantity ? (trade.price * trade.quantity) : "-";
            return (
            <tr data-testid={`trade-row-${index}`} key={`trade-row-${index}`}>
                <td data-testid={`trade-dateandtime-${index}`}>{trade.dateAndTime}</td>
                <td data-testid={`trade-symbol-${index}`}>{trade.symbol}</td>
                <td data-testid={`trade-quanity-${index}`}>{trade.quantity}</td>
                <td data-testid={`trade-action-${index}`}>{trade.action}</td>
                <td data-testid={`trade-price-${index}`}>
                    {trade.price && trade.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                    })}
                </td>
                <td data-testid={`trade-totalprice-${index}`}>
                    {totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                    })}
                </td>
            </tr>
        )
    }): null;

    return (
        <>
            <h2>
                Trades
            </h2>
            <table className='tableFormat'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Stock Symbol</th>
                        <th>Quantity</th>
                        <th>Action</th>
                        <th>Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                  <tbody>
                    {tradeRows}
                </tbody>
            </table>
        </>
    );
});

export default Trades;