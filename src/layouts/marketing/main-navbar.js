import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Badge,
  Divider,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import PieChartIcon from '@mui/icons-material/PieChart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//import { SearchButton } from './widgets/buttons/search-button';
import { Menu as MenuIcon } from '../icons/menu';
import { Logo } from './logo';

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;

  return (
    <div>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          // display: "flex",
          // alignItems: "center",
          backgroundColor: 'background.paper',
          borderBottomColor: 'divider',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          color: 'text.secondary',
          //height: '52px',
        }}
      >
        <Container
          className="global-container"
          maxWidth="xl"
        >
          <Toolbar
            variant="dense"
            disableGutters
          >
            <Box
              className="inner-container"
              sx={{
                alignItems: 'center',
                display: {
                  md: 'flex',
                  xs: 'none',
                },
              }}
            >
              <Box
                className="stat-item"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: '11px' }}
                >
                  <span className="stat-label">Cryptos:</span>
                </Typography>
                <NextLink
                  href="/"
                  passHref
                >
                  <Link
                    color="rgb(97, 136, 255)"
                    underline="none"
                    variant="subtitle2"
                    sx={{ ml: 1, fontSize: '11px' }}
                  >
                    26,230
                  </Link>
                </NextLink>
              </Box>
              <Box
                className="stat-item"
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: '11px' }}
                >
                  <span className="stat-label">Exchanges:</span>
                </Typography>
                <NextLink
                  href="/"
                  passHref
                >
                  <Link
                    color="rgb(97, 136, 255)"
                    underline="none"
                    variant="subtitle2"
                    sx={{ ml: 1, fontSize: '11px' }}
                  >
                    642
                  </Link>
                </NextLink>
              </Box>
              <Box
                className="stat-item"
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: '11px' }}
                >
                  <span className="stat-label">Market Cap:</span>
                </Typography>
                <NextLink
                  href="/"
                  passHref
                >
                  <Link
                    color="rgb(97, 136, 255)"
                    underline="none"
                    variant="subtitle2"
                    sx={{ ml: 1, fontSize: '11px' }}
                  >
                    $1.18T
                  </Link>
                </NextLink>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowDropDownIcon
                    variant="small"
                    sx={{ color: red[500], fontSize: 15 }}
                  />
                  <Typography
                    sx={{ color: red[500], fontSize: '10px' }}
                    variant="subtitle2"
                  >
                    0.24%
                  </Typography>
                </Box>
              </Box>
              <Box
                className="stat-item"
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: '11px' }}
                >
                  <span className="stat-label">24h Vol:</span>
                </Typography>
                <NextLink
                  href="/"
                  passHref
                >
                  <Link
                    color="rgb(97, 136, 255)"
                    underline="none"
                    variant="subtitle2"
                    sx={{ ml: 1, fontSize: '11px' }}
                  >
                    $34.43B
                  </Link>
                </NextLink>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowDropDownIcon
                    variant="small"
                    sx={{ color: red[500], fontSize: 15 }}
                  />
                  <Typography
                    sx={{ color: red[500], fontSize: '10px' }}
                    variant="subtitle2"
                  >
                    16.53%
                  </Typography>
                </Box>
              </Box>
              <Box
                className="stat-item"
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: '11px' }}
                >
                  <span className="stat-label">Dominance:</span>
                </Typography>
                <NextLink
                  href="/"
                  passHref
                >
                  <Link
                    color="rgb(97, 136, 255)"
                    underline="none"
                    variant="subtitle2"
                    sx={{ ml: 1, fontSize: '11px' }}
                  >
                    BTC: 50.00% ETC: 19.1%
                  </Link>
                </NextLink>
              </Box>
              <Box
                className="stat-item"
                sx={{ display: 'flex', alignItems: 'center', ml: 2 }}
              >
                <LocalGasStationIcon sx={{ fontSize: 15 }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: '11px' }}
                >
                  <span className="stat-label">ETH Gas:</span>
                </Typography>

                <Tooltip
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">Current gas price: 32 Gwei</Typography>
                        <Typography variant="body2">Average gas price: 30 Gwei</Typography>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        sx={{ height: '50%' }}
                        flexItem
                      />
                      <Box
                        sx={{
                          height: '50%',
                          borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                          //margin: "0 8px",
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">Gas limit: 21000</Typography>
                        <Typography variant="body2">Block time: 15 seconds</Typography>
                      </Box>
                    </Box>
                  }
                  arrow
                >
                  <Typography
                    color="rgb(97, 136, 255)"
                    variant="subtitle2"
                    sx={{ ml: 1, fontSize: '11px', cursor: 'pointer' }}
                  >
                    32 Gwei
                    <KeyboardArrowDownIcon sx={{ fontSize: 15, verticalAlign: 'middle' }} />
                  </Typography>
                </Tooltip>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              component="a"
              href="/dashboard"
              size="small"
              sx={{ ml: 2 }}
              variant="contained"
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: 'background.paper',
          borderBottomColor: 'divider',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          color: 'text.secondary',
          top: '64px',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ minHeight: 64 }}
          >
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    display: {
                      md: 'inline',
                      xs: 'none',
                    },
                    height: 40,
                    width: 40,
                  }}
                />
              </a>
            </NextLink>
            <Box sx={{ display: 'flex', flexDirection: 'row', ml: 1 }}>
              <Typography sx={{ display: 'flex', flexDirection: 'row', ml: 1 }}>
                Coin Market Cap
              </Typography>
            </Box>

            <IconButton
              color="inherit"
              onClick={onOpenSidebar}
              sx={{
                display: {
                  md: 'none',
                },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            {/* <Box
              sx={{
                alignItems: "center",
                display: {
                  md: "flex",
                  xs: "none",
                },
              }}
            > */}
            <NextLink
              href="/dashboard"
              passHref
            >
              <Link
                color="textSecondary"
                sx={{ ml: 5 }}
                underline="none"
                variant="subtitle2"
              >
                Cryptocurrencies
                <Badge
                  color="secondary"
                  variant="dot"
                  overlap="circular"
                  sx={{ top: -4, right: -4 }}
                />
              </Link>
            </NextLink>
            <NextLink
              href="/browse"
              passHref
            >
              <Link
                color="textSecondary"
                sx={{ ml: 4 }}
                underline="none"
                variant="subtitle2"
              >
                Exchanges
                <Badge
                  color="primary"
                  variant="dot"
                  overlap="circular"
                  sx={{ top: -4, right: -4 }}
                />
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 4 }}
                underline="none"
                variant="subtitle2"
              >
                Community
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 4 }}
                underline="none"
                variant="subtitle2"
              >
                Products
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 4 }}
                underline="none"
                variant="subtitle2"
              >
                Learn
              </Link>
            </NextLink>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              component="a"
              href="/dashboard"
              size="small"
              sx={{ ml: 5, color: 'text.secondary' }}
              startIcon={<StarIcon sx={{ color: 'text.secondary', mr: -0.5 }} />}
              variant="text"
            >
              Watchlist
            </Button>
            <Button
              component="a"
              href="/dashboard"
              size="small"
              sx={{ color: 'text.secondary' }}
              startIcon={<PieChartIcon sx={{ color: 'text.secondary', mr: -0.5 }} />}
              variant="text"
            >
              Portfolio
            </Button>

            {/* </Box> */}

            {/* <SearchButton /> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
