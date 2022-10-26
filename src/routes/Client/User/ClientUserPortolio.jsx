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
  Loader,
  Center,
} from '@mantine/core';
import { USER_PORTFOLIO_ENDPOINT } from '../../../services/constants/portfolioEndpoints';
import {
  STOCK_INFO_ENDPOINT,
  SELL_STOCK_INFO_ENDPOINT,
} from '../../../services/constants/stocksEndpoints';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { showCurrency } from '../../../services/utilities/showCurrency';
import { axiosGet, axiosPost } from '../../../services/utilities/axios';
import { getCookie } from '../../../services/utilities/cookie';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../../../components/Notification';

const ClientUserPortolio = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };

  const [opened, setOpened] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockPrice, setStockPrice] = useState(0);
  const [stockLogo, setStockLogo] = useState('');
  const [stocksOwned, setStocksOwned] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    setVisible(true);
    setIsDoneLoading(false);
    axiosGet(USER_PORTFOLIO_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setPortfolio(response.data.sort((x, y) => y.id - x.id));
        setVisible(false);
        setIsDoneLoading(true);
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

  const checkQuantity = () => {
    if (quantity <= 0) {
      showErrorNotification('Invalid quantity.');
      setError(true);
      setQuantity('');
    } else if (parseFloat(stocksOwned) < parseFloat(quantity)) {
      showErrorNotification('Invalid quantity.');
      setError(true);
      setQuantity('');
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (checkQuantity()) {
      const formData = new FormData();

      formData.append('stock_quantity', quantity);

      setIsButtonLoading(true);
      axiosPost(
        `${SELL_STOCK_INFO_ENDPOINT}${stockSymbol}`,
        formData,
        headers
      ).then((response) => {
        if (response.status === 200) {
          setIsButtonLoading(false);
          showSuccessNotification('Stock sold successfully!');
          resetModalContent();
        } else {
          setIsButtonLoading(false);
          showErrorNotification('Transaction failed.');
          resetModalContent();
        }
      });
    }
  };

  const getModalContent = () => {
    if (!isModalLoading) {
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
          <TextInput
            label="Quantity"
            type="number"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
            onChange={(event) => setQuantity(parseFloat(event.target.value))}
            value={quantity}
            error={error}
          />
          <Group position="right">
            <Button
              color="violet"
              mt={32}
              onClick={handleSubmit}
              loading={isButtonLoading}
            >
              Submit
            </Button>
          </Group>
        </>
      );
    } else {
      return (
        <Center>
          <Loader color="violet" />
        </Center>
      );
    }
  };

  const getStockInfo = (symbol) => {
    setIsModalLoading(true);
    axiosGet(`${STOCK_INFO_ENDPOINT}${symbol}`, headers).then((response) => {
      setStockLogo(
        `https://storage.googleapis.com/iex/api/logos/${response.data.company.symbol}.png`
      );
      setStockSymbol(response.data.company.symbol);
      setStockName(response.data.company.company_name);
      setStockPrice(response.data.quote.latest_price);
      setIsModalLoading(false);
    });
  };

  const displayTable = () => {
    if (isDoneLoading) {
      return (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Owned</th>
              <th style={{ textAlign: 'center' }}>Action</th>
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
      );
    }
  };

  const portfolioRows = portfolio.map((column, index) => {
    const { stock_symbol, stock_name, stocks_owned_quantity } = column;

    const disableSell = () => parseInt(stocks_owned_quantity) === 0;

    return (
      <tr key={index}>
        <td>{stock_symbol}</td>
        <td>{stock_name}</td>
        <td>{stocks_owned_quantity}</td>
        <td style={{ textAlign: 'center' }}>
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
      <Title pl="md">Portfolio</Title>
      <Group px="md" py="md" grow>
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>{displayTable()}</ScrollArea>
        </Paper>
      </Group>
      <Modal opened={opened} onClose={resetModalContent} title="Sell" centered>
        {getModalContent()}
      </Modal>
    </>
  );
};

export default ClientUserPortolio;
