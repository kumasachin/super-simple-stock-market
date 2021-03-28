import {
    isNumber,
    isNumberAndNonZero,
    calculateDividendYield,
    calculatePERatio,
    getTime,
    getDiffInMinutes,
    filterTradeItem,
    nthRoot,
    calculateVWSPrice
} from "./common"
import { waitFor, act } from '@testing-library/react';

describe("common function", () => {  
    it('isNumber: validate if value is number', () => {
        expect(isNumber(1)).toBeTruthy();
        expect(isNumber(1.1)).toBeTruthy();
    });
    it('isNumber: validate if value is not a number', () => {
        expect(isNumber("1")).toBeFalsy();
        expect(isNumber("")).toBeFalsy();
        expect(isNumber("s")).toBeFalsy();
        expect(isNumber({})).toBeFalsy();
        expect(isNumber([])).toBeFalsy();
    });
    it('isNumberAndNonZero: validate if value is non zero number ', () => {
        expect(isNumberAndNonZero(1)).toBeTruthy();
        expect(isNumberAndNonZero(1.1)).toBeTruthy();
    });
    it('isNumberAndNonZero: validate if value is not a non zero number ', () => {
        expect(isNumberAndNonZero(0)).toBeFalsy();
        expect(isNumberAndNonZero("1")).toBeFalsy();
        expect(isNumberAndNonZero("")).toBeFalsy();
        expect(isNumberAndNonZero("s")).toBeFalsy();
        expect(isNumberAndNonZero({})).toBeFalsy();
        expect(isNumberAndNonZero([])).toBeFalsy();
    });
    it('calculateDividendYield: calculate dividend ', () => {
        expect(calculateDividendYield({
            type:"Common", 
            lastDividend: 8, 
            fixedDividend: 2, 
            price: 100, 
            parValue: 100
        })).toBe(0.08);
    });

    it('calculateDividendYield: calculate dividend preferred ', () => {
        expect(calculateDividendYield({
            type:"Preferred", 
            lastDividend: 8, 
            fixedDividend: 2, 
            price: 100, 
            parValue: 100
        })).toBe(2);
    });
    it('calculateDividendYield: calculate dividend ', () => {
        expect(calculateDividendYield({
            type:"Common", 
            fixedDividend: 2, 
            price: 100, 
            parValue: 100
        })).toBe(null);
    });
    it('calculatePERatio: calculate dividend ', () => {
        expect(calculatePERatio({
            dividendYield: 122, 
            priceData: 100, 
        })).toBe(0.819672131147541);
    });
    it('getTime: calculate time ', () => {
        expect(getTime()).toBeTruthy();
    });

    it('nthRoot: calculate nthroot ', () => {
        expect(nthRoot(2333,4)).toBe(6.9499020642692);
        expect(nthRoot(0,4)).toBe(undefined);
        expect(nthRoot(4,2)).toBe(2);
    });
    it('getDiffInMinutes: calculate time prev and now time difference ', async () => {
        jest.useFakeTimers();
        const dateAndTime1 = new Date();
        await act( async () => {
            jest.advanceTimersByTime(1500);
        });
        const dateAndTime2 = new Date();
        expect(getDiffInMinutes(dateAndTime1, dateAndTime2)).toBe(0)
    });

    it('filterTradeItem: filter tradeitmes in last 15 min ', async () => {
        const dateAndTime1 = new Date();
        jest.useFakeTimers();
        await act( async () => {
           jest.advanceTimersByTime(1500);
        })
        const dateAndTime2 = new Date();
        const trades = [{
            symbol: "AER",
            type: "Common",
            timestamp: dateAndTime1,
            lastDividend: "-",
            fixedDividend: "23",
            parValue: "-",
            price: "123",
            quantity: "21"
        },{
            symbol: "AER",
            type: "Common",
            timestamp: dateAndTime2,
            lastDividend: "-",
            fixedDividend: "23",
            parValue: "-",
            price: "123",
            quantity: "21"
        }];
        expect(calculateVWSPrice(trades)).toBe(2.4356435643564356)
    });
    it('filterTradeItem: filter tradeitmes in last 15 min ', async () => {
        const dateAndTime1 = new Date();
        act(() => {
            jest.useFakeTimers();
            jest.advanceTimersByTime(1500);
        })
        const dateAndTime2 = new Date();
        const trades = [{
            symbol: "AER",
            type: "Common",
            timestamp: dateAndTime1,
            lastDividend: "-",
            fixedDividend: "23",
            parValue: "-",
            price: "123",
            quantity: "21"
        },{
            symbol: "AER",
            type: "Common",
            timestamp: dateAndTime2,
            lastDividend: "-",
            fixedDividend: "23",
            parValue: "-",
            price: "123",
            quantity: "21"
        }];
        const filterTradeItemVal = filterTradeItem(trades,{
            key: "symbol",
            value: "AER",
            duration: 15
        });
        filterTradeItemVal[0].timestamp ="12";
        filterTradeItemVal[1].timestamp ="12";

        expect(filterTradeItemVal[0].fixedDividend).toBe("23");
        //[{"fixedDividend": "23", "lastDividend": "-", "parValue": "-", "price": "123", "quantity": "21", "symbol": "AER", "timestamp": "12", "type": "Common"}, {"fixedDividend": "23", "lastDividend": "-", "parValue": "-", "price": "123", "quantity": "21", "symbol": "AER", "timestamp": "12", "type": "Common"}]);
    });
});
 