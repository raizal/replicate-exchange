import { currencyListToMapped } from '@/helper/utils';

const data =
  '[{"currencyGroup":"ETH","color":"#9011FE","currencySymbol":"ETH","name":"Ethereum","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg","decimal_point":18,"listingDate":"2020-03-11T15:31:48.000Z"},{"currencyGroup":"COMP","color":"#00D395","currencySymbol":"COMP","name":"Compound","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_COMP.svg","decimal_point":18,"listingDate":"2020-09-25T00:09:12.000Z"},{"currencyGroup":"LINK","color":"#5664F5","currencySymbol":"LINK","name":"Chainlink","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_LINK.svg","decimal_point":18,"listingDate":"2020-09-25T00:08:41.000Z"},{"currencyGroup":"SNX","color":"#0CD0FE","currencySymbol":"SNX","name":"Synthetix","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_SNX.svg","decimal_point":18,"listingDate":"2020-09-25T00:08:17.000Z"}]';

const data2 =
  '[{"currencyGroup":"ETH","color":"#9011FE","currencySymbol":"ETH","name":"Ethereum","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg","decimal_point":18,"listingDate":"2020-03-11T15:31:48.000Z"},{"currencyGroup":"ETH","color":"#9011FE","currencySymbol":"ETH","name":"Ethereum","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg","decimal_point":18,"listingDate":"2020-03-11T15:31:48.000Z"},{"currencyGroup":"LINK","color":"#5664F5","currencySymbol":"LINK","name":"Chainlink","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_LINK.svg","decimal_point":18,"listingDate":"2020-09-25T00:08:41.000Z"},{"currencyGroup":"COMP","color":"#00D395","currencySymbol":"COMP","name":"Compound","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_COMP.svg","decimal_point":18,"listingDate":"2020-09-25T00:09:12.000Z"},{"currencyGroup":"SNX","color":"#0CD0FE","currencySymbol":"SNX","name":"Synthetix","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_SNX.svg","decimal_point":18,"listingDate":"2020-09-25T00:08:17.000Z"},{"currencyGroup":"SNX","color":"#0CD0FE","currencySymbol":"SNX","name":"Synthetix","logo":"https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_SNX.svg","decimal_point":18,"listingDate":"2020-09-25T00:08:17.000Z"}]';

describe('list to map for currency', () => {
  it('should mapped with cur-symbol as key', () => {
    const mapped = currencyListToMapped(JSON.parse(data));
    const shouldHave = ['SNX', 'LINK', 'COMP', 'ETH'];
    const missing = Object.keys(mapped).filter(
      (key) => shouldHave.indexOf(key) < 0
    );
    expect(missing).toHaveLength(0);
  });

  it('should not have duplicate key', () => {
    const mapped = currencyListToMapped(JSON.parse(data2));
    const shouldHave = ['SNX', 'LINK', 'COMP', 'ETH'];
    const missing = Object.keys(mapped).filter(
      (key) => shouldHave.indexOf(key) < 0
    );
    expect(missing).toHaveLength(0);
    expect(Object.keys(mapped)).toHaveLength(shouldHave.length);
  });
});
