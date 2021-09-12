import { GlobalStyle } from 'Styles';
import TopNavbar from '../../../components/navbar';
import { NextPage } from 'next';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CoinPage: NextPage = () => {
  interface ICoin {
    name: string;
    symbol: string;
    id: string;
  }
  useEffect(() => {
    const dataFetch = async () => {
      const data = await axios.get(`/api/coins`);
      setCoins(data.data.data);
    };
    dataFetch();
  }, []);
  const [coins, setCoins] = useState<ICoin[]>([]);
  const selectCoin = (coin: ICoin) => {
    let coinData = JSON.parse(JSON.stringify(coin));
    localStorage.setItem('coins', JSON.stringify(coinData));
  };

  return (
    <div>
      <GlobalStyle />
      <TopNavbar />
      {coins.map((coin) => (
        <List
          onClick={() => {
            selectCoin(coin);
          }}
          key={coin.id}
        >
          <h4>
            <a href="/">
              {coin.symbol} <span>({coin.name})</span>
            </a>
          </h4>
        </List>
      ))}
    </div>
  );
};

import styled from 'styled-components';
const List = styled.li`
  list-style: none;
  border-bottom: 1px solid rgba(201, 76, 76, 0.3);
  padding: 5px;
  margin-left: 15px;
`;

export default CoinPage;
