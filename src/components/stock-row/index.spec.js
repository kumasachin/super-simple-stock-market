import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import StockRow from "./";

describe("Stocks row snapshot testing", () => {
  afterEach(cleanup);
  const stock = {
    symbol: "AER",
    type: "Common",
    lastDividend: 123,
    parValue: 100,
    price: 100,
    quantity: 1
  };
  const trades = [{
    symbol: "AER",
    type: "Common",
    lastDividend: "-",
    fixedDividend: "23",
    parValue: "-",
    price: "123",
    quantity: "21"
  }];
  it("should take a snapshot", () => {
    const { asFragment } = render(<table><tbody><StockRow stock={stock} trades={trades} index={0} setStockInStore={jest.fn()} /></tbody></table>)
    expect(asFragment(<table><tbody><StockRow /></tbody></table>)).toMatchSnapshot()
  });

  it("should render row with valid data", async () => {
    render(<table><tbody><StockRow stock={stock} trades={trades} index={0} setStockInStore={jest.fn()} /></tbody></table>)
    expect(screen.getByTestId("stock-row-0")).toHaveTextContent("AERCommon123-100123.00BuySell")
  });
});

describe("Stocks row function validation", () => {
  afterEach(cleanup);
  const stock01 = {
    symbol: "AER",
    type: "Common",
    lastDividend: 123,
    fixedDividend: 2,
    parValue: 100,
    price: 100,
    quantity: 1
  };
  const trades = [{
    symbol: "AER",
    type: "Common",
    lastDividend: "-",
    fixedDividend: "23",
    parValue: "-",
    price: "123",
    quantity: "21"
  }];

  it("should validate stock rows with type common", () => {
    render(<table><tbody><StockRow stock={stock01} trades={trades}  index={0} setStockInStore={jest.fn()} handleTrade= {jest.fn()} /></tbody></table>)
    const buybtn = screen.getByTestId("stock-buy-0");
    const sellbtn = screen.getByTestId("stock-sell-0");
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    fireEvent.blur(screen.getByTestId("stock-price-0"), { target: { value: "223" }});
    fireEvent.change(screen.getByTestId("stock-quantity-0"), { target: { value: "2" }});
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    expect(screen.getByTestId("stock-type-0")).toHaveTextContent("Common");
    expect(screen.getByTestId("stock-quantity-0")).toHaveValue(2);
    expect(screen.getByTestId("stock-price-0")).toHaveValue(223);
    expect(screen.getByTestId("stock-symbol-0")).toBeTruthy();
    expect(screen.getByTestId("stock-symbol-0")).toHaveTextContent("AER");
    expect(screen.getByTestId("stock-lastdivident-0")).toHaveTextContent("2");
    expect(screen.getByTestId("stock-fixeddividend-0")).toHaveTextContent("2%");
    expect(screen.getByTestId("stock-parvalue-0")).toHaveTextContent("100");
    fireEvent.click(buybtn);
    expect(screen.getByTestId("stock-dividentyield-0")).toHaveTextContent("0.55");
    expect(screen.getByTestId("stock-peratio-0")).toHaveTextContent("404.30"); 
    expect(screen.getByTestId("stock-vwsprice-0")).toHaveTextContent("14.29"); 
  });

  it("should validate stock rows with type preferred", () => {
    const stock02 = {
      ...stock01,
      type: "Preferred"
    };
    render(<table><tbody><StockRow stock={stock02} trades={trades} index={0} setStockInStore={jest.fn()} handleTrade= {jest.fn()} /></tbody></table>)
    const buybtn = screen.getByTestId("stock-buy-0");
    const sellbtn = screen.getByTestId("stock-sell-0");
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    fireEvent.blur(screen.getByTestId("stock-price-0"), { target: { value: "223" }});
    fireEvent.change(screen.getByTestId("stock-quantity-0"), { target: { value: "2" }});
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    expect(screen.getByTestId("stock-type-0")).toHaveTextContent("Preferred");
    expect(screen.getByTestId("stock-quantity-0")).toHaveValue(2);
    expect(screen.getByTestId("stock-price-0")).toHaveValue(223);
    expect(screen.getByTestId("stock-symbol-0")).toBeTruthy();
    expect(screen.getByTestId("stock-symbol-0")).toHaveTextContent("AER");
    expect(screen.getByTestId("stock-lastdivident-0")).toHaveTextContent("2");
    expect(screen.getByTestId("stock-fixeddividend-0")).toHaveTextContent("2%");
    expect(screen.getByTestId("stock-parvalue-0")).toHaveTextContent("100");
    fireEvent.click(buybtn);
    expect(screen.getByTestId("stock-dividentyield-0")).toHaveTextContent("0.90");
    expect(screen.getByTestId("stock-peratio-0")).toHaveTextContent("248.64"); 
    expect(screen.getByTestId("stock-vwsprice-0")).toHaveTextContent("14.29"); 
  });

  it("should validate stock rows with type preferred", () => {
    const stock03 = {
      symbol: "AER",
      type: "Common",
      parValue: 100,
      price: 100,
      quantity: 1
    };
    render(<table><tbody><StockRow stock={stock03} trades={trades} index={0} setStockInStore={jest.fn()} handleTrade= {jest.fn()} /></tbody></table>)
    const buybtn = screen.getByTestId("stock-buy-0");
    const sellbtn = screen.getByTestId("stock-sell-0");
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    fireEvent.blur(screen.getByTestId("stock-price-0"), { target: { value: "223" }});
    fireEvent.change(screen.getByTestId("stock-quantity-0"), { target: { value: "2" }});
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    expect(screen.getByTestId("stock-type-0")).toHaveTextContent("Common");
    expect(screen.getByTestId("stock-quantity-0")).toHaveValue(2);
    expect(screen.getByTestId("stock-price-0")).toHaveValue(223);
    expect(screen.getByTestId("stock-symbol-0")).toBeTruthy();
    expect(screen.getByTestId("stock-symbol-0")).toHaveTextContent("AER");
    expect(screen.getByTestId("stock-lastdivident-0")).toHaveTextContent("-");
    expect(screen.getByTestId("stock-fixeddividend-0")).toHaveTextContent("-");
    expect(screen.getByTestId("stock-parvalue-0")).toHaveTextContent("100");
    fireEvent.click(buybtn);
    expect(screen.getByTestId("stock-dividentyield-0")).toHaveTextContent("");
    expect(screen.getByTestId("stock-peratio-0")).toHaveTextContent(""); 
    expect(screen.getByTestId("stock-vwsprice-0")).toHaveTextContent("14.29"); 
  });
});

