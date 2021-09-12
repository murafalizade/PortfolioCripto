import { useState, useEffect } from 'react';
import Modal from 'components/modal';
import TopNavbar from '../../../components/navbar';
import DropdownIcon from 'components/icons/dropdown';
import axios from 'axios';
import RignArrow from 'components/icons/rightdown';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from 'Redux/action';
import { ICalc } from 'Redux/reducer';
import {
  GlobalStyle,
  ParentProperty,
  Paragrahp,
  AccordionWrapper,
  MyCoinList,
  Badge,
  GreyBadge,
  TableRow,
  Property,
  YellowButton,
} from 'Styles';

interface IProperty {
  myProperty: ICalc;
  openModal: boolean;
}
interface IRedux {
  reducer: IProperty;
}
interface IQuote {
  id: string;
  price: number;
  incremant: number;
}

const PortfolioListingPage = () => {
  interface ICoin {
    name: string;
    id: string;
    symbol: string;
  }

  const [coins, setCoins] = useState<ICoin>({
    name: '',
    id: '',
    symbol: '',
  });
  const [open, setOpen] = useState<boolean>(false);
  const [coinInfo, setCoinInfo] = useState<IQuote>({
    id: '',
    price: 0,
    incremant: 0,
  });
  const selector = useSelector((state: IRedux) => state.reducer);
  const dispatch = useDispatch();
  useEffect(() => {
    let coin: string | null = localStorage.getItem('coins');
    if (coin) {
      const coinPo: ICoin = JSON.parse(coin);
      setCoins({ name: coinPo.name, id: coinPo.id, symbol: coinPo.symbol });
      getQuoter(coinPo.id);
    }
  }, []);

  const getQuoter = async (id: string) => {
    const quoter = await axios.get(`/api/quotes?ids=${id}`);
    const usdData = quoter.data;
    const coinInfosPrice = usdData.data[id].quote.USD.price.toFixed(2);
    const coinInfosIncreament =
      usdData.data[id].quote.USD.percent_change_24h.toFixed(2);
    const coinInfos = {
      id: id,
      price: coinInfosPrice,
      incremant: coinInfosIncreament,
    };
    setCoinInfo(coinInfos);
  };

  return (
    <div>
      <GlobalStyle />
      <TopNavbar />
      {selector.openModal ? <Modal coinId={coinInfo.price} /> : null}
      {coins.id ? (
        <div key={coins.id}>
          <MyCoinList onClick={() => setOpen(!open)}>
            <div>
              <h4>
                <span>{!open ? <DropdownIcon /> : <RignArrow />}</span>
                <span>{coins.symbol}/USD </span>
                <span>({coins.name})</span>
              </h4>
            </div>
            <ParentProperty>
              <Property>
                <TableRow>Holdings</TableRow>
                <TableRow>Net Cost</TableRow>
                <TableRow>Market Value</TableRow>
                <TableRow>Profit</TableRow>
              </Property>
              <Property>
                <TableRow style={{ color: 'gold' }}>
                  {selector.myProperty.holdings}
                </TableRow>
                <TableRow style={{ color: 'black' }}>
                  $ {selector.myProperty.netCost.toFixed(2)}
                </TableRow>
                <TableRow style={{ color: 'black' }}>
                  <TableRow
                    style={
                      selector.myProperty.marketValue < 0
                        ? { color: 'green', fontSize: '15px' }
                        : { color: 'red', fontSize: '15px' }
                    }
                  >
                    {selector.myProperty.marketValueChange.toFixed(2)} %{' '}
                  </TableRow>
                  $ {selector.myProperty.marketValue.toFixed(2)}
                </TableRow>
                <TableRow style={{ color: 'black' }}>
                  $ {selector.myProperty.profit.toFixed(2)}
                </TableRow>
              </Property>
            </ParentProperty>
            <div style={{ display: 'flex' }}>
              <GreyBadge>
                <span>24h</span>
              </GreyBadge>
              <Badge value={coinInfo?.incremant}>
                <span>{coinInfo?.incremant} % </span>
              </Badge>
              <span>{coinInfo?.price}</span>
            </div>
          </MyCoinList>
          <AccordionWrapper opening={open}>
            <p>
              No transaction. Add a new transaction to update your portfolio
            </p>
            <YellowButton onClick={() => dispatch(openModal())}>
              Add Transaction
            </YellowButton>
          </AccordionWrapper>
        </div>
      ) : (
        <Paragrahp>
          <p>
            Welcome to crypto portfolio manager <br />
            Use search on the right to add coins to your profile
          </p>
        </Paragrahp>
      )}
    </div>
  );
};

export default PortfolioListingPage;
