import React from 'react';
import Image from 'next/image';

interface SleeperLogoProps {
  avatar?: string | null;
  username?: string;
  width: number;
}

const SleeperLogo: React.FC<SleeperLogoProps> = ({ avatar = '/images/sleeper.png', username = 'User', width }) => {
  return (
    <Image
      src={avatar && avatar !== '' ? avatar : '/images/sleeper.png'}
      alt={username}
      width={width}
      height={width}
      className="rounded-full"
    />
  );
};

export default SleeperLogo;
