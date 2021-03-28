import { render, screen, cleanup } from '@testing-library/react';
import Trades from './';

describe("Trades", () => {
  afterEach(cleanup);

  it('should take a snapshot', () => {
    const { asFragment } = render(<Trades />)
    expect(asFragment(<Trades />)).toMatchSnapshot()
  })
});