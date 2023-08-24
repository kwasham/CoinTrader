import { useState } from 'react';
import { Container, Typography, Stack, Box } from '@mui/material';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import AdvancedBuilder from '../../sections/dashboard/backtest/advancedbuilder';
import Strategies from '../../sections/dashboard/backtest/strategies';
import SignalsAndSelectors from '../../sections/dashboard/backtest/signalsandselectors';
import PositionSize from '../../sections/dashboard/backtest/positionsize';
import EntryInPositionMethods from '../../sections/dashboard/backtest/entryinpositionmethods';
import EntryInPositionRules from '../../sections/dashboard/backtest/entryinpositionrules';
import Indicators from '../../sections/dashboard/backtest/indicators';
import AdjustPositionRules from '../../sections/dashboard/backtest/adjustpositionrules';
import StrategySettings from '../../sections/dashboard/backtest/strategysettings';
import BacktestStats from '../../sections/dashboard/backtest/backteststats';
import BacktestResults from '../../sections/dashboard/backtest/backtestresults';
import TradingViewWidget from '../components/tradingview';
import BacktestTrades from '../../sections/dashboard/backtest/backtesttrades';


const Page = () => {
  const settings = useSettings();
  const [backtestResults, setBacktestResults] = useState(null);


  usePageView();

  return (
    <>
      <Seo title="Dashboard: Backtest" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Typography
            variant="h2"
            gutterBottom
          >
            Backtesting Platform
          </Typography>
          <Stack
            paddingBottom={3}
            direction={'row'}
            spacing={3}
            justifyContent="space-between"
          >
            <Box sx={{ flexGrow: 1 }}>
              <Strategies />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <AdvancedBuilder />
            </Box>
            <Stack
              flexGrow={1}
              spacing={2}
            >
              <SignalsAndSelectors />
              <PositionSize />
            </Stack>

            <Stack
              flexGrow={1}
              spacing={2}
            >
              <EntryInPositionMethods />
              <EntryInPositionRules />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            justifyContent="space-between"
            paddingBottom={3}
          >
            <Box flexGrow={1}>
              <Indicators />
            </Box>
            <Box flexGrow={1}>
              <AdjustPositionRules />
            </Box>
            <Box flexGrow={1}>
              <StrategySettings onBacktestComplete={setBacktestResults}/>
            </Box>
          </Stack>
            <Stack direction="row"
            spacing={3}
            justifyContent="space-between"
            paddingBottom={3}>
          <BacktestStats />
          <BacktestResults results={backtestResults}/>
          </Stack>
          <TradingViewWidget />
          <BacktestTrades />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
