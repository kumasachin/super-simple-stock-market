import { render, screen, cleanup } from '@testing-library/react';
import Stocks from './';

describe("Stocks", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Stocks />);
    expect(asFragment(<Stocks />)).toMatchSnapshot()
  })
});