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
  LoadingOverlay,
} from '@mantine/core';
import { USER_PORTFOLIO_ENDPOINT } from '../../../services/constants/portfolioEndpoints';
import { STOCK_INFO_ENDPOINT, SELL_STOCK_INFO_ENDPOINT } from '../../../services/constants/stocksEndpoints';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { axiosGet, axiosPost } from '../../../services/utilities/axios';
import { getCookie } from '../../../services/utilities/cookie';
import { showSuccessNotification, showErrorNotification } from '../../../components/Notification';

const ClientUserPortolio = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

  const [opened, setOpened] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState(0);
  const [stockLogo, setStockLogo] = useState('');
  const [stocksOwned, setStocksOwned] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setVisible(true);
    axiosGet(USER_PORTFOLIO_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setVisible(false);
        setPortfolio(response.data);
      }
    });
  }, [opened]);

  const resetModalContent = () => {
    setStockSymbol('');
    setStockName('');
    setStockPrice(0);
    setStockLogo('');
    setStocksOwned(0);
    setQuantity('');
    setError(false);
    setOpened(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('stock_quantity', quantity);

    if (quantity <= 0) {
      setError(true);
      showErrorNotification('Quantity must be greater than 0.');
    } else {
      setVisible(true);
      axiosPost(`${SELL_STOCK_INFO_ENDPOINT}${stockSymbol}`, formData, headers).then((response) => {
        if (response.status === 200) {
          setVisible(false);
          showSuccessNotification('Stock successfully sold!');
          setOpened(false);
        } else {
          setVisible(false);
          showErrorNotification('Transaction failed.');
          setOpened(false);
        }
      });
    }
  };

  const getModalContent = () => {
    return (
      <>
        <Group align="center" mb="md">
          <div style={{ width: 92 }}>
            <Image radius="md" src={`${stockLogo}`} />
          </div>
          <div>
            <Text>{stockSymbol}</Text>
            <Text>{stockName}</Text>
            <Text>{showCurrency(stockPrice)}</Text>
            <Text>Owned: {stocksOwned}</Text>
          </div>
        </Group>
      </>
    );
  };

  const getStockInfo = (symbol) => {
    setModalLoading(true);
    axiosGet(`${STOCK_INFO_ENDPOINT}${symbol}`, headers).then((response) => {
      setStockLogo(`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${response.data.company.symbol}.png`);
      setStockSymbol(response.data.company.symbol);
      setStockName(response.data.company.company_name);
      setStockPrice(response.data.quote.latest_price);
      setModalLoading(false);
    });
  };

  const portfolioRows = portfolio.map((column, index) => {
    const { stock_symbol, stock_name, stocks_owned_quantity } = column;

    const disableSell = () => {
      return parseInt(stocks_owned_quantity) === 0 ? true : false;
    };

    return (
      <tr key={index}>
        <td>{stock_symbol}</td>
        <td>{stock_name}</td>
        <td>{stocks_owned_quantity}</td>
        <td>
          <Button
            color="violet"
            compact
            onClick={() => {
              setOpened((opened) => !opened);
              setStocksOwned(stocks_owned_quantity);
              getStockInfo(stock_symbol);
            }}
            disabled={disableSell()}
          >
            Sell
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <LoadingOverlay visible={modalLoading} overlayBlur={2} loaderProps={{ color: 'violet' }} />
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
        <TextInput
          label="Quantity"
          type="number"
          onChange={(event) => setQuantity(parseFloat(event.target.value))}
          value={quantity}
          error={error}
        />
        <Group position="right">
          <Button color="violet" mt={32} onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ClientUserPortolio;
