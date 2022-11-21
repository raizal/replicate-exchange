import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { priceFormatHelper } from '@/helper';
import type { CurrencyPrice } from '@/types/Currency';

// import styles from './Table.module.scss';

interface THProps {
  children?: string;
  className?: string;
}
const TH = ({ children, className }: THProps) => {
  return (
    <th
      scope="col"
      className={clsx(
        'rounded-tl-lg p-2 text-left text-base font-semibold text-[#979797] lg:px-6 lg:py-4',
        className
      )}
    >
      {children}
    </th>
  );
};

interface FRowProps extends CurrencyPrice {
  activePeriod?: string;
}

const FRow = ({
  name,
  logo,
  currencySymbol,
  priceInfo,
  color,
  activePeriod = 'day',
}: FRowProps) => {
  const [isError, setError] = useState(false);

  const priceChangePercentage = useMemo(() => {
    switch (activePeriod || 'day') {
      case 'day':
        return Number(priceInfo.day);
      case 'week':
        return Number(priceInfo.week);
      case 'month':
        return Number(priceInfo.month);
      case 'year':
        return Number(priceInfo.year);
      default:
        return 0;
    }
  }, [activePeriod]);

  return (
    <div className="flex w-full flex-row items-center border-b p-4">
      <div className={`items-center `}>
        {!isError && (
          <ReactSVG
            src={logo}
            style={{
              color,
              width: 32,
              height: 32,
            }}
            fallback={() => {
              if (!isError) {
                setError(true);
              }
              return (
                <Image
                  src={logo}
                  width={32}
                  height={32}
                  alt={name}
                  color={color}
                  style={{
                    color,
                  }}
                />
              );
            }}
            beforeInjection={(svg) => {
              svg.setAttribute('width', '32px');
              svg.setAttribute('height', '32px');
            }}
          />
        )}
        {isError && (
          <Image
            src={logo}
            width={32}
            height={32}
            alt={name}
            color={color}
            style={{
              color,
            }}
          />
        )}
      </div>
      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex flex-row">
          <span className="flex-1 text-left">{name}</span>
          <span className="text-right text-base font-bold text-gray-900">
            {priceFormatHelper(Number(priceInfo.latestPrice))}
          </span>
        </div>
        <div className="flex flex-row whitespace-nowrap ">
          <span className="flex-1 text-left text-base font-light text-neutral-400">
            {currencySymbol}
          </span>
          <span
            className={clsx(
              'text-right text-sm font-medium',
              priceChangePercentage > 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {priceChangePercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

const FRowComponent = React.memo(FRow);

const TRow = ({
  name,
  logo,
  currencySymbol,
  priceInfo,
  color,
}: CurrencyPrice) => {
  const [isError, setError] = useState(false);
  return (
    <tr className="border-b">
      <td className="overflow-hidden whitespace-nowrap p-5 text-sm font-bold text-gray-900">
        <div className={`flex flex-row items-center`}>
          {!isError && (
            <ReactSVG
              src={logo}
              style={{
                color,
                width: 32,
                height: 32,
              }}
              fallback={() => {
                if (!isError) {
                  setError(true);
                }
                return <Image src={logo} width={32} height={32} alt={name} />;
              }}
              beforeInjection={(svg) => {
                svg.setAttribute('width', '32px');
                svg.setAttribute('height', '32px');
              }}
            />
          )}
          {isError && (
            <Image
              src={logo}
              width={32}
              height={32}
              alt={name}
              color={color}
              style={{
                color,
              }}
            />
          )}
          <p className="ml-4 flex-1 break-words text-left lg:ml-8">{name}</p>
        </div>
      </td>
      <td className="hidden whitespace-nowrap p-2 text-left text-sm font-light text-gray-900 lg:table-cell lg:px-6 lg:py-4">
        {currencySymbol}
      </td>
      <td className="whitespace-nowrap p-2 text-left text-sm font-medium text-gray-900 lg:px-6 lg:py-4">
        {priceFormatHelper(Number(priceInfo.latestPrice))}
      </td>
      <td
        className={clsx(
          'hidden whitespace-nowrap p-2 text-left text-sm font-medium md:table-cell lg:px-6 lg:py-4',
          parseFloat(priceInfo.day) > 0 ? 'text-green-500' : 'text-red-500'
        )}
      >
        {parseFloat(priceInfo.day) || 0}%
      </td>
      <td
        className={clsx(
          'hidden whitespace-nowrap p-2 text-left text-sm font-medium md:table-cell lg:px-6 lg:py-4',
          parseFloat(priceInfo.week) > 0 ? 'text-green-500' : 'text-red-500'
        )}
      >
        {parseFloat(priceInfo.week) || 0}%
      </td>
      <td
        className={clsx(
          'hidden whitespace-nowrap p-2 text-left text-sm font-medium md:table-cell lg:px-6 lg:py-4',
          parseFloat(priceInfo.month) > 0 ? 'text-green-500' : 'text-red-500'
        )}
      >
        {parseFloat(priceInfo.month) || 0}%
      </td>
      <td
        className={clsx(
          'hidden whitespace-nowrap p-2 text-left text-sm font-medium md:table-cell lg:px-6 lg:py-4',
          parseFloat(priceInfo.year) > 0 ? 'text-green-500' : 'text-red-500'
        )}
      >
        {parseFloat(priceInfo.year) || 0}%
      </td>
    </tr>
  );
};

const TRowComponent = React.memo(TRow);

interface CryptoTableProps {
  currencies: CurrencyPrice[];
}

const CryptoTable = ({ currencies }: CryptoTableProps) => {
  const [priceChangePeriod, setPriceChangePeriod] = useState<string>('day');
  const pricePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceChangePeriod(event.target.value);
  };

  return (
    <div className="flex flex-col border border-gray-200 lg:rounded-lg">
      <div className="flex w-full flex-col items-center border-b md:hidden">
        <div className="flex w-full flex-row items-center border-b p-4 md:hidden">
          <p className="text-sm font-semibold text-neutral-900">CRYPTO</p>
          <div className="flex-1" />
          <select
            className="rounded-sm border p-1 text-xs"
            value={priceChangePeriod}
            onChange={pricePeriodChange}
          >
            <option value="day">24 JAM</option>
            <option value="week">1 MGG</option>
            <option value="month">1 BLN</option>
            <option value="year">1 THN</option>
          </select>
        </div>
        <div className="flex w-full flex-col">
          {(currencies || []).map((currency) => (
            <FRowComponent
              {...currency}
              activePeriod={priceChangePeriod}
              key={currency.priceInfo.pair}
            />
          ))}
        </div>
      </div>
      <table className="hidden min-w-full text-center md:table">
        <thead className="hidden border-b md:table-header-group">
          <tr>
            <TH>CRYPTO</TH>
            <TH className=" hidden lg:table-cell" />
            <TH>HARGA</TH>
            <TH>24 JAM</TH>
            <TH>1 MGG</TH>
            <TH>1 BLN</TH>
            <TH>1 THN</TH>
          </tr>
        </thead>
        <tbody>
          {(currencies || []).map((currency) => (
            <TRowComponent {...currency} key={currency.priceInfo.pair} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
