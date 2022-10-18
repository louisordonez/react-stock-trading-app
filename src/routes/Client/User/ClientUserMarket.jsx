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
  MultiSelect,
  TextInput,
  Loader,
  Center,
} from '@mantine/core';
import { TbSearch } from 'react-icons/tb';
import { USER_PORTFOLIO_ENDPOINT } from '../../../services/constants/portfolioEndpoints';
import {
  SYMBOLS_ENDPOINT,
  MOST_ACTIVE_ENDPOINT,
  STOCK_INFO_ENDPOINT,
} from '../../../services/constants/stocksEndpoints';
import { axiosGet } from '../../../services/utilities/axios';
import { accessTokenCookie } from '../../../services/constants/cookies';
import { getCookie } from '../../../services/utilities/cookie';
import { showCurrency } from '../../../services/utilities/showCurrency';

const ClientUserMarket = ({ setVisible }) => {
  const accessToken = getCookie(accessTokenCookie);
  const headers = { Authorization: accessToken };

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
  const [stocksOwned, setStocksOwned] = useState(0);
  const [error, setError] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    setVisible(true);
    setIsDoneLoading(false);

    axiosGet(USER_PORTFOLIO_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setPortfolio(response.data);
      }
    });

    axiosGet(MOST_ACTIVE_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setMostActiveList(response.data.most_active);
      }
    });

    axiosGet(SYMBOLS_ENDPOINT, headers).then((response) => {
      if (response.status === 200) {
        setVisible(false);
        setIsDoneLoading(true);
        setSymbolsList(
          response.data.symbols.map((item) => {
            return { value: item.symbol, label: `${item.symbol} | ${item.name}` };
          })
        );
      }
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event[0]);
    console.log(event[0]);
  };

  const getStocksOwned = (symbol) => {
    const findSymbol = portfolio.find((item) => item.stock_symbol === symbol);

    return findSymbol !== undefined ? findSymbol.stocks_owned_quantity : 0;
  };

  const getStockInfo = (symbol) => {
    setIsModalLoading(true);
    axiosGet(`${STOCK_INFO_ENDPOINT}${symbol}`, headers).then((response) => {
      setStockLogo(`https://storage.googleapis.com/iex/api/logos/${response.data.company.symbol}.png`);
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

  const displaySearch = () => {
    return (
      <Group grow mb="md">
        <Paper p="xl" radius="md" shadow="md" withBorder>
          <ScrollArea>
            <Group>
              <div style={{ width: 150 }}>
                <Image radius="md" src={`https://storage.googleapis.com/iex/api/logos/${search}.png`} />
              </div>
              <Stack>
                <Text>{search}</Text>
                <Text>{stockName}</Text>
                <Text>{showCurrency(stockPrice)}</Text>
              </Stack>
            </Group>
          </ScrollArea>
          <Group position="right">
            <Button color="violet" onClick={() => setOpened((opened) => !opened)}>
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
                  <Image radius="md" src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`} />
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
    setStockPrice(0);
    setStockLogo('');
    setStocksOwned(0);
    setQuantity('');
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
            <Button color="violet" mt={32}>
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
          <MultiSelect
            icon={<TbSearch />}
            searchable
            placeholder="Search"
            nothingFound="Nothing found"
            size="xl"
            data={symbolsList}
            limit={20}
            maxDropdownHeight={160}
            maxSelectedValues={1}
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
