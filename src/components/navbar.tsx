import SearchIcon from './icons/search';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ICalc } from 'Redux/reducer';

const TopNavbar = () => {
  interface IProperty {
    myProperty: ICalc;
  }
  interface IRedux {
    reducer: IProperty;
  }
  const selector = useSelector((state: IRedux) => state.reducer);

  return (
    <Navbar>
      <h3>
        ${' '}
        {selector.myProperty.marketValue.toFixed(2) !== '0'
          ? selector.myProperty.marketValue.toFixed(2)
          : '0'}
        {selector.myProperty.marketValueChange.toFixed(2) === '0' ? (
          <span
            style={
              selector.myProperty.marketValue < 0
                ? { color: 'green', fontSize: '13px' }
                : { color: 'red', fontSize: '13px' }
            }
          >
            {selector.myProperty.marketValueChange.toFixed(2)} %{' '}
          </span>
        ) : null}
      </h3>
      <h2> FlyToMoon</h2>
      <h5>
        <a href="/coins">
          <SearchIcon />
        </a>{' '}
      </h5>
    </Navbar>
  );
};

const Navbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0px 0 5px -2px #888;
`;

export default TopNavbar;
