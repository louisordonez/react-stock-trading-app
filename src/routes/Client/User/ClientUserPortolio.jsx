import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Paper,
  Group,
  ScrollArea,
  Button,
  Image,
  Modal,
  TextInput,
  Table,
  ActionIcon,
} from '@mantine/core';
import { TbEye } from 'react-icons/tb';
import { USER_PORTFOLIO_ENDPOINT } from '../../../services/constants/portfolioEndpoints';
import { STOCK_INFO_ENDPOINT } from '../../../services/constants/stocksEndpoints';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { axiosGet } from '../../../services/utilities/axios';
import { getCookie } from '../../../services/utilities/cookie';

const ClientUserPortolio = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

  const [opened, setOpened] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState(0);
  const [stockLogo, setStockLogo] = useState('');
  const [stockOwned, setStockOwned] = useState(0);

  useEffect(() => {
    setVisible(true);
    axiosGet(USER_PORTFOLIO_ENDPOINT, headers).then((response) => {
      setVisible(false);
      setPortfolio(response.data);
    });
  }, []);

  const resetModalContent = () => {
    setStockSymbol('');
    setStockName('');
    setStockPrice(0);
    setStockLogo('');
    setStockOwned(0);
  };

  const getModalContent = () => {
    return (
      <>
        <Group align="center" mb="md">
          <div style={{ width: 92 }}>
            {/* <Image radius="md" src={`${stockLogo}`} /> */}
            <Image radius="md" src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/MSFT.png`} />
          </div>
          <div>
            <Text>{stockSymbol}</Text>
            <Text>{stockName}</Text>
            <Text>{showCurrency(stockPrice)}</Text>
            <Text>Owned: {stockOwned}</Text>
          </div>
        </Group>
      </>
    );
  };

  const getStockInfo = (symbol) => {
    setVisible(true);
    axiosGet(`${STOCK_INFO_ENDPOINT}${symbol}`, headers).then((response) => {
      setVisible(false);
      setStockLogo(response.data.logo.url);
      setStockSymbol(response.data.company.symbol);
      setStockName(response.data.company.company_name);
      setStockPrice(response.data.quote.latest_price);
    });
  };

  const portfolioRows = portfolio.map((column, index) => {
    const { stock_symbol, stock_name, stocks_owned_quantity } = column;

    return (
      <tr key={index}>
        <td>{stock_symbol}</td>
        <td>{stock_name}</td>
        <td>{stocks_owned_quantity}</td>
        <td>
          <ActionIcon
            onClick={() => {
              setOpened((opened) => !opened);
              setStockOwned(stocks_owned_quantity);
              getStockInfo(stock_symbol);
            }}
          >
            <TbEye />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Title pl="md">Portfolio</Title>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <Table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Owned</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {portfolioRows.length > 0 ? (
                  portfolioRows
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <Text align="center">No portfolio</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Group>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          resetModalContent();
        }}
        title="Sell"
        centered
      >
        {getModalContent()}
        <TextInput label="Quantity" />
        <Group position="right">
          <Button color="violet" mt={32}>
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ClientUserPortolio;
