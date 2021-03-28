import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from './App';

describe("App", () => {
  afterEach(cleanup);
  beforeEach(()=> render(<App />));
  it('should take a snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot()
  });

  it('should calculate no geomatricmean if all input are blank', async () => {
    const btnGetGeomatricMean = screen.getByTestId("btn-get-geomatric-mean");
    fireEvent.click(btnGetGeomatricMean);
    expect(screen.getByTestId("geo-matric-mean-container")).toHaveTextContent("");
  });

  it('should calculate geomatricmean', async () => {
    const pricefield = screen.getByTestId("stock-price-0");
    fireEvent.blur(pricefield, { target: { value: "123" }});
    const btnGetGeomatricMean = screen.getByTestId("btn-get-geomatric-mean");
    fireEvent.click(btnGetGeomatricMean);
    expect(screen.getByTestId("geo-matric-mean")).toHaveTextContent("Current Geomatric Mean = 123.00");
  });

  it('should calculate geomatricmean of more that 2 inputs', async () => {
    fireEvent.blur(screen.getByTestId("stock-price-0"), { target: { value: "223" }});
    fireEvent.blur(screen.getByTestId("stock-price-1"), { target: { value: "223" }});
    const btnGetGeomatricMean = screen.getByTestId("btn-get-geomatric-mean");
    fireEvent.click(btnGetGeomatricMean);
    expect(screen.getByTestId("geo-matric-mean")).toHaveTextContent("Current Geomatric Mean = 223.00");
  });

  it('should not default activate the buy and sell button', async () => {
    const buybtn = screen.getByTestId("stock-buy-0");
    const sellbtn = screen.getByTestId("stock-sell-0");
    expect(buybtn).not.toBeEnabled();
    expect(sellbtn).not.toBeEnabled();
  });

  it('should activate the buy and sell button', async () => {
    const buybtn = screen.getByTestId("stock-buy-0");
    const sellbtn = screen.getByTestId("stock-sell-0");
    expect(buybtn).not.toBeEnabled();
    expect(sellbtn).not.toBeEnabled();
  });

  it('should activate buy/ sell button and render trade rows for buy/sell', async () => {
    const buybtn = screen.getByTestId("stock-buy-0");
    const sellbtn = screen.getByTestId("stock-sell-0");
    expect(buybtn).not.toBeEnabled();
    expect(sellbtn).not.toBeEnabled();

    fireEvent.blur(screen.getByTestId("stock-price-0"), { target: { value: "223" }});
    fireEvent.blur(screen.getByTestId("stock-quantity-0"), { target: { value: "2" }});
    fireEvent.change(screen.getByTestId("stock-quantity-0"), { target: { value: "2" }});
    expect(buybtn).toBeEnabled();
    expect(sellbtn).toBeEnabled();
    expect(screen.getByTestId("geo-matric-mean-container")).toHaveTextContent("");
    
     waitFor(() => fireEvent.click(buybtn));
    expect(screen.getByTestId("trade-dateandtime-0")).toBeTruthy();
    expect(screen.getByTestId("trade-symbol-0")).toHaveTextContent("TEA");
    expect(screen.getByTestId("trade-quanity-0")).toHaveTextContent("2");
    expect(screen.getByTestId("trade-action-0")).toHaveTextContent('buy');
    expect(screen.getByTestId("trade-price-0")).toHaveTextContent('223.00');
    expect(screen.getByTestId("trade-totalprice-0")).toHaveTextContent('446.00'); 

    const buybtn02 = screen.getByTestId("stock-buy-2");
    const sellbtn02 = screen.getByTestId("stock-sell-2");
    expect(buybtn02).not.toBeEnabled();
    expect(sellbtn02).not.toBeEnabled();

    fireEvent.blur(screen.getByTestId("stock-price-2"), { target: { value: "12223" }});
    fireEvent.blur(screen.getByTestId("stock-quantity-2"), { target: { value: "12" }});
    fireEvent.change(screen.getByTestId("stock-quantity-2"), { target: { value: "12" }});
    expect(buybtn02).toBeEnabled();
    expect(sellbtn02).toBeEnabled();
    expect(screen.getByTestId("geo-matric-mean-container")).toHaveTextContent("");
    waitFor(() => fireEvent.click(sellbtn02));

    expect(screen.getByTestId("trade-dateandtime-1")).toBeTruthy();
    expect(screen.getByTestId("trade-symbol-1")).toHaveTextContent("ALE");
    expect(screen.getByTestId("trade-quanity-1")).toHaveTextContent("2");
    expect(screen.getByTestId("trade-action-1")).toHaveTextContent("sell");
    expect(screen.getByTestId("trade-price-1")).toHaveTextContent("223.00");
    expect(screen.getByTestId("trade-totalprice-1")).toHaveTextContent("146,676.00");
  });
});
