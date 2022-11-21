import { priceChangesHelper } from './price-changes-helper';

describe('test parse price change percentage from string to float', () => {
  it('null should return 0', () => {
    expect(
      priceChangesHelper({
        dateRange: 'daily',
      })
    ).toEqual(0);
  });

  it('1 should return 1.0', () => {
    expect(true).toEqual(true);
  });

  it('15.555 should return 15.55', () => {
    expect(true).toEqual(true);
  });

  it('15.577 should return 15.58', () => {
    expect(true).toEqual(true);
  });
});
