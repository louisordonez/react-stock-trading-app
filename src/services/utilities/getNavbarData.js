import {
  TbDeviceAnalytics,
  TbDashboard,
  TbWallet,
  TbFolder,
  TbReceipt,
  TbUsers,
} from 'react-icons/tb';
import {
  CLIENT_DASHBOARD_LINK,
  CLIENT_MARKET_LINK,
  CLIENT_WALLET_LINK,
  CLIENT_PORTFOLIO_LINK,
  CLIENT_USERS_LINK,
  CLIENT_TRANSACTIONS_LINK,
} from '../constants/links';

const userData = [
  { link: CLIENT_DASHBOARD_LINK, label: 'Dashboard', icon: TbDashboard },
  { link: CLIENT_MARKET_LINK, label: 'Market', icon: TbDeviceAnalytics },
  { link: CLIENT_WALLET_LINK, label: 'Wallet', icon: TbWallet },
  { link: CLIENT_PORTFOLIO_LINK, label: 'Portfolio', icon: TbFolder },
  { link: CLIENT_TRANSACTIONS_LINK, label: 'Transactions', icon: TbReceipt },
];

const adminData = [
  { link: CLIENT_DASHBOARD_LINK, label: 'Dashboard', icon: TbDashboard },
  { link: CLIENT_USERS_LINK, label: 'Users', icon: TbUsers },
  { link: CLIENT_TRANSACTIONS_LINK, label: 'Transactions', icon: TbReceipt },
];

export const getNavbarData = (role) => {
  return role === 'user' ? userData : adminData;
};
