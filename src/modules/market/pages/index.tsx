import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { dehydrate } from 'react-query';

import { Meta } from '@/components/layouts/Meta';
import {
  getPriceChanges,
  getSupportedCurrencies,
} from '@/modules/market/api/requests';
import CryptoTable from '@/modules/market/components/Table';
import TopCryptoCard from '@/modules/market/components/TopCryptoCard';
import { useMarket } from '@/modules/market/hooks/useMarket';
import { client } from '@/services/http';

const MarketPage: NextPage = () => {
  const { dailyTopCrypto, currencyPrices } = useMarket();
  return (
    <>
      <Meta
        title="Harga Crypto Hari Ini (IDR) | Pintu"
        description="Informasi grafik pergerakan harga Crypto dalam kurs Rupiah (IDR) hari ini secara real-time dan terupdate. Cek tren naik turun harga & ATH aset Crypto sekarang!"
      />
      <div className="container py-10 pt-4">
        <div className="mb-8 flex flex-row px-4">
          <h1 className="text-3xl font-bold">
            Harga Crypto dalam Rupiah Hari Ini
          </h1>
          <div className="flex-1" />
        </div>
        <div className="mb-4 flex flex-col">
          <div className="mb-2 flex flex-row px-4">
            <h2 className="text-lg font-bold">🔥 Top Movers (24 Jam)</h2>
          </div>
          <div className="flex flex-row overflow-x-auto lg:justify-between">
            {(dailyTopCrypto || []).map((crypto) => (
              <TopCryptoCard crypto={crypto} key={crypto.priceInfo.pair} />
            ))}
          </div>
        </div>
        <CryptoTable currencies={currencyPrices} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  await Promise.allSettled([getSupportedCurrencies(), getPriceChanges()]);

  return {
    props: {
      query,
      dehydratedState: dehydrate(client),
    },
  };
};

export default MarketPage;
