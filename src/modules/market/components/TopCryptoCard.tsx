import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';

import { priceFormatHelper } from '@/helper';
import type { CurrencyPrice } from '@/types/Currency';

interface TopCryptoCardProps {
  crypto: CurrencyPrice;
}

const TopCryptoCard = ({
  crypto: { logo, name, priceInfo, color },
}: TopCryptoCardProps) => {
  const [isError, setError] = useState(false);
  return (
    <div className="flex max-w-none flex-1 flex-col p-4 hover:cursor-pointer hover:bg-slate-100/75 md:min-w-[128px] md:max-w-[188px]">
      <div className="mb-2 flex flex-row">
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
        <p className="ml-2 flex-1 text-xl font-bold text-neutral-900 line-clamp-1">
          {name}
        </p>
      </div>
      <p className="mb-2 text-sm text-neutral-400">
        {priceFormatHelper(Number(priceInfo.latestPrice))}
      </p>
      <div className="flex flex-row">
        <p
          className={clsx(
            'text-lg font-bold',
            parseFloat(priceInfo.day) > 0 ? 'text-green-500' : 'text-red-500'
          )}
        >
          {priceInfo.day}%
        </p>
      </div>
    </div>
  );
};

export default React.memo(TopCryptoCard);
