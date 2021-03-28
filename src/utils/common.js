export const isNumber = (number) => {
    return number && typeof number === 'number';
}

export const isNumberAndNonZero = (number) => {
    return isNumber(number) && number > 0;
}

export const calculateDividendYield = ({type, lastDividend, fixedDividend, price, parValue}) => {
    if (type === "Common") {
        if (isNumber(lastDividend) && isNumberAndNonZero(parseFloat(price))) {
            return lastDividend / price;
        }
        return null;
    } else if (type === "Preferred") {
        if(isNumber(fixedDividend) &&
            isNumber(parValue) &&
            isNumberAndNonZero(price)) {
            return fixedDividend * parValue / price;
        }            
        return null;
    }
    return null;
};

export const calculatePERatio = ({dividendYield, priceData}) => {
    if(isNumber(priceData) && isNumberAndNonZero(dividendYield)) {
        return priceData / dividendYield;
    }
};

export const getTime = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return {
        timestamp: today,
        dateAndTime: `${date} ${time}`
    }
}
export const getDiffInMinutes = (dateAndTime1 = new Date(), dateAndTime2 = new Date()) => {
    const timeDiff = Math.round((dateAndTime1.getTime() - dateAndTime2.getTime()) / 60000);
    return Math.abs(timeDiff);
}

export const filterTradeItem = (itemSet, {
    key, 
    value,
    duration
}) => {
    return itemSet.filter(item => {
        return item[key] === value &&
        getDiffInMinutes(item.timestamp, new Date()) <= duration
    });
}

export const nthRoot = (value, n) => {
    var negate = n % 2 === 1 && value < 0;
    if(negate)
        value = -value;
    var possible = Math.pow(value, 1 / n);
    n = Math.pow(possible, n);
    if(Math.abs(value - n) < 1 && (value > 0 && n > 0))
      return negate ? -possible : possible;
  }

export const calculateVWSPrice = (trades) => {
    let VWSPriceDividend = 0;
    let VSWPriceDivisor = 0;
    for (let trade of trades) {
        VWSPriceDividend += trade.price * trade.quantity;
        VSWPriceDivisor += trade.quantity;
    }
    return VWSPriceDividend / VSWPriceDivisor;
}
