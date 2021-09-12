import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
interface IpropsOpen {
  opening: boolean;
}

interface IPropsColor {
  value: number;
}
export const GlobalStyle = createGlobalStyle`
    *{
       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  body {
    margin:0px;
    padding:0px;
  }
  p{
      font-size:25px;
      color:black;

  }
  a{
    text-decoration:none;
    color:black;
  }
`;

export const ParentProperty = styled.div`
  width: 650px;
  position: relative;
  left: -60px;
`;

export const Paragrahp = styled.div`
  text-align: center;
  display: grid;
  color: #000;
  margin-top: 15px;
`;
export const AccordionWrapper = styled.div`
  display: ${(props: IpropsOpen) => (props.opening ? 'block' : 'none')};
  border-bottom: 1px solid rgba(201, 76, 76, 0.3);
  padding: 5px;
`;

export const MyCoinList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid rgba(201, 76, 76, 0.3);
`;

export const Badge = styled.div`
  margin-right: 10px;
  width: 100px;
  height: 25px;
  border-radius: 5px;
  color: black;
  background-color: ${(props: IPropsColor) =>
    props.value > 0 ? '#18b118' : '#b84444'};
  text-align: center;
  font-weight: 600;
`;
export const GreyBadge = styled.div`
  width: 50px;
  background-color: grey;
  height: 25px;
  border-radius: 5px;
  position: relative;
  left: 15px;
  text-align: center;
`;

export const YellowButton = styled.button`
  width: 200px;
  font-weight: 700;
  height: 50px;
  border: none;
  background-color: yellow;
  color: black;
  font-size: 15px;
`;

export const Property = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TableRow = styled.span`
  color: #5d4f4f;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 700;
`;
