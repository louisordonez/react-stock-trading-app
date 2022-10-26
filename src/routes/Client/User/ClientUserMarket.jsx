import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Paper,
  Group,
  ScrollArea,
  Stack,
  Button,
  Image,
  Modal,
  TextInput,
  Loader,
  Center,
  Select,
} from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { USER_PORTFOLIO_ENDPOINT } from '../../../services/constants/portfolioEndpoints';
import { SHOW_WALLET_ENDPOINT } from '../../../services/constants/walletEndpoints';
import {
  SYMBOLS_ENDPOINT,
  MOST_ACTIVE_ENDPOINT,
  STOCK_INFO_ENDPOINT,
  BUY_STOCK_INFO_ENDPOINT,
} from '../../../services/constants/stocksEndpoints';
import { axiosGet, axiosPost } from '../../../services/utilities/axios';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import { showCurrency } from '../../../services/utilities/showCurrency';
import {
  showSuccessNotification,
  showErrorNotification,
} from '../../../components/Notification';

const ClientUserMarket = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: accessToken,
  };

  const [opened, setOpened] = useState(false);
  const [symbolsList, setSymbolsList] = useState([]);
  const [mostActiveList, setMostActiveList] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState('');
  const [stockLogo, setStockLogo] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stockPrice, setStockPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    axiosGet(SYMBOLS_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setSymbolsList(
          response.data.symbols.map((item) => {
            return {
              value: item.symbol,
              label: `${item.symbol} | ${item.name}`,
            };
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    setVisible(true);
    setIsDoneLoading(false);
    axiosGet(MOST_ACTIVE_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setMostActiveList(response.data.most_active);
        setVisible(false);
        setIsDoneLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    axiosGet(USER_PORTFOLIO_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setPortfolio(response.data);
      }
    });

    if (search !== '') {
      axiosGet(`${STOCK_INFO_ENDPOINT}${search}`, headers).then((response) => {
        setStockLogo(
          `https://storage.googleapis.com/iex/api/logos/${response.data.company.symbol}.png`
        );
        setStockSymbol(response.data.company.symbol);
        setStockName(response.data.company.company_name);
        setStockPrice(response.data.quote.latest_price);
        setIsModalLoading(false);
      });
    }
  }, [opened]);

  const checkQuantity = () => {
    const total = parseFloat(quantity) * parseFloat(stockPrice);

    if (parseFloat(quantity) <= 0 || quantity === '') {
      showErrorNotification('Invalid quantity.');
      setError(true);
      setQuantity('');
    } else if (total > parseFloat(balance)) {
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
        `${BUY_STOCK_INFO_ENDPOINT}${stockSymbol}`,
        formData,
        headers
      ).then((response) => {
        if (response.status === 200) {
          setIsButtonLoading(false);
          showSuccessNotification('Stock bought successfully!');
          resetModalContent();
        } else {
          setIsButtonLoading(false);
          showErrorNotification('Transaction failed.');
          resetModalContent();
        }
      });
    }
  };

  const getStocksOwned = (symbol) => {
    const findSymbol = portfolio.find((item) => item.stock_symbol === symbol);

    return findSymbol !== undefined ? findSymbol.stocks_owned_quantity : 0;
  };

  const getStockInfo = (symbol) => {
    setIsModalLoading(true);
    axiosGet(SHOW_WALLET_ENDPOINT, headers).then((response) => {
      setBalance(parseFloat(response.data.wallet.balance));
    });
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

  const displayContent = () => {
    if (isDoneLoading) {
      return search ? displaySearch() : displayMostActive();
    }
  };

  const handleSearch = (event) => {
    if (event !== null) {
      setSearch(event);
      setVisible(true);
      setIsDoneLoading(false);
      axiosGet(SHOW_WALLET_ENDPOINT, headers).then((response) => {
        setBalance(parseFloat(response.data.wallet.balance));
      });
      axiosGet(`${STOCK_INFO_ENDPOINT}${event}`, headers).then((response) => {
        // setStockLogo(response.data.logo.url);
        setStockLogo(
          `https://storage.googleapis.com/iex/api/logos/${response.data.company.symbol}.png`
        );
        setStockSymbol(response.data.company.symbol);
        setStockName(response.data.company.company_name);
        setStockPrice(response.data.quote.latest_price);
        setVisible(false);
        setIsDoneLoading(true);
      });
    } else {
      setSearch('');
      displayContent();
    }
  };

  const displaySearch = () => {
    return (
      <Group grow mb="md">
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <Group>
              <div style={{ width: 150 }}>
                <Image radius="md" src={stockLogo} />
              </div>
              <Stack>
                <Text>{search}</Text>
                <Text>{stockName}</Text>
                <Text>{showCurrency(stockPrice)}</Text>
                <Text>Owned: {getStocksOwned(search)}</Text>
              </Stack>
            </Group>
          </ScrollArea>
          <Group position="right">
            <Button
              color="violet"
              onClick={() => {
                setOpened((opened) => !opened);
                getStockInfo(search);
              }}
            >
              Buy
            </Button>
          </Group>
        </Paper>
      </Group>
    );
  };

  const displayMostActive = () => {
    return mostActiveList.map((column, index) => {
      const { symbol, company_name, latest_price } = column;

      return (
        <Group grow mb="md" key={index}>
          <Paper p="xl" radius="md" shadow="md" withBorder>
            <ScrollArea>
              <Group>
                <div style={{ width: 150 }}>
                  <Image
                    radius="md"
                    src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`}
                  />
                </div>
                <Stack>
                  <Text>{symbol}</Text>
                  <Text>{company_name}</Text>
                  <Text>{showCurrency(latest_price)}</Text>
                  <Text>Owned: {getStocksOwned(symbol)}</Text>
                </Stack>
              </Group>
            </ScrollArea>
            <Group position="right">
              <Button
                color="violet"
                onClick={() => {
                  setOpened((opened) => !opened);
                  getStockInfo(symbol);
                }}
              >
                Buy
              </Button>
            </Group>
          </Paper>
        </Group>
      );
    });
  };

  const resetModalContent = () => {
    setStockSymbol('');
    setStockName('');
    setStockLogo('');
    setQuantity('');
    setStockPrice(0);
    setBalance(0);
    setError(false);
    setOpened(false);
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
              <Text>Owned: {getStocksOwned(stockSymbol)}</Text>
            </div>
          </Group>
          <Text mb="md">Balance: {showCurrency(balance)}</Text>
          <TextInput
            label="Quantity"
            type="number"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
            onChange={(event) => setQuantity(event.target.value)}
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

  return (
    <>
      <Title pl="md">Market</Title>
      <Group px="md" pt="md" grow>
        <Stack>
          <Select
            icon={
              symbolsList.length !== 0 ? (
                <TbSearch />
              ) : (
                <Loader color="violet" />
              )
            }
            searchable
            clearable
            placeholder="Search"
            nothingFound="Nothing found"
            size="xl"
            data={symbolsList}
            limit={20}
            maxDropdownHeight={160}
            onChange={(event) => handleSearch(event)}
          />
          <Title order={3}>{search ? search : 'Most Active'}</Title>
          {displayContent()}
        </Stack>
      </Group>
      <Modal opened={opened} onClose={resetModalContent} title="Buy" centered>
        {getModalContent()}
      </Modal>
    </>
  );
};

export default ClientUserMarket;
