import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, updateProperty } from 'Redux/action';

interface ICoinId {
  coinId: number;
}

const Modal = ({ coinId }: ICoinId) => {
  interface ICalc {
    holdings: number;
    netCost: number;
    marketValue: number;
    marketValueChange: number;
    profit: number;
  }

  const [price, setPrice] = useState<number>(0);
  const dispatch = useDispatch();
  const [quoteInfo, setQuoteInfo] = useState<ICalc>({
    holdings: 0,
    netCost: 0,
    marketValue: 0,
    marketValueChange: 0,
    profit: 0,
  });

  const [quantity, setQuantity] = useState<number>(0);
  const Calculate = (prices: number, quantitys: number) => {
    const holdings = parseFloat((quoteInfo.holdings + quantitys).toString());
    const netCost = quoteInfo.netCost + prices * quantitys;
    const marketValue = holdings * coinId;
    const marketValueChange = (marketValue / netCost - 1) * 100;
    const profit = marketValue - netCost;
    setQuoteInfo({ holdings, netCost, marketValue, marketValueChange, profit });
    dispatch(
      updateProperty({
        holdings,
        netCost,
        marketValue,
        marketValueChange,
        profit,
      })
    );
    dispatch(closeModal());
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <LabelWrapepr>
          <h4>Price $</h4>
          <Input
            value={price}
            onChange={(e: any) => {
              setPrice(e.target.value);
            }}
          />
        </LabelWrapepr>

        <LabelWrapepr>
          <h4>Quantity</h4>
          <Input
            value={quantity}
            onChange={(e: any) => {
              setQuantity(e.target.value);
            }}
          />
        </LabelWrapepr>

        <YellowButton
          onClick={() => {
            Calculate(price, quantity);
          }}
        >
          Save Transaction
        </YellowButton>
      </ModalContent>
    </ModalWrapper>
  );
};

const YellowButton = styled.button`
  margin-left: 25%;
  font-weight: 700;
  margin-top: 15px;
  width: 200px;
  padding: 10px;
  height: 50px;
  border: none;
  background-color: yellow;
  color: black;
  font-size: 15px;
`;

const Input = styled.input`
  height: 20px;
  font-size: 15px;
  padding: 5px;
  margin: 5px;

  :focus { outline: none; }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  top: 40px;
  left: 400px;
  right: 40px;
  bottom: 40px;
  width: 450px;
  height: 300px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 5;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  padding: 15px;
`;
const LabelWrapepr = styled.div`
  margin-bottom: 15px;
  display: contents;
  text-align: left;
`;

export default Modal;
