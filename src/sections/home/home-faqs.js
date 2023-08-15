import { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

const faqs = [
  {
    question: 'How does the backtesting feature work?',
    answer:
      'Our backtesting feature allows you to test your trading strategies on historical data for optimized outcomes. Use our backtesting engine to simulate your strategy on historical data to fine-tune your strategy.',
  },
  {
    question: 'What exchanges does the trading bot support?',
    answer:
      "Our trading bot supports Binance, Coinbase, and Kraken. We're working on adding support for more exchanges.",
  },
  {
    question: 'How secure is the flashloan service?',
    answer:
      'Our flashloan service is built on top of the Aave protocol, which is a decentralized, open-source, and non-custodial liquidity protocol on Ethereum. The Aave protocol is audited by OpenZeppelin and ConsenSys Diligence.',
  },
  {
    question: 'Can I connect with traders directly in the community?',
    answer:
      "Yes, you can connect with traders directly in the community. You can follow top traders and discover recommended crypto projects. Our community is a great place to learn and share your trading strategies.",
  },
  {
    question: 'How can I use the openAI chatGPT bot?',
    answer:
      'Our chatbot is powered by OpenAI and can answer your questions about trading strategies, market trends, and more. You can use the chatbot to get real-time financial strategy insights powered by OpenAI.',
  },
];

const Faq = (props) => {
  const { answer, question } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Stack
      onClick={() => setIsExpanded((prevState) => !prevState)}
      spacing={2}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="subtitle1">{question}</Typography>
        <SvgIcon>{isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}</SvgIcon>
      </Stack>
      <Collapse in={isExpanded}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {answer}
        </Typography>
      </Collapse>
    </Stack>
  );
};

Faq.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export const HomeFaqs = () => {
  return (
    <Box sx={{ py: '120px' }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={2}>
              <Typography variant="h3">Everything you need to know</Typography>
              <Typography
                color="text.secondary"
                variant="subtitle2"
              >
                Frequently asked questions
              </Typography>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={4}>
              {faqs.map((faq, index) => (
                <Faq
                  key={index}
                  {...faq}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
