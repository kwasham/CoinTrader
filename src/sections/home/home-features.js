import { useState } from 'react';
import LinkExternal01Icon from '@untitled-ui/icons-react/build/esm/LinkExternal01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const features = [
  {
    id: 'experts',
    title: 'Backtesting Strategies',
    description:
      'Test your trading strategies on historical data for optimized outcomes. Use our backtesting engine to simulate your strategy on historical data to fine-tune your strategy.',
    imageDark: '/assets/home-features-experts-dark.png',
    imageLight: '/assets/home-features-experts-light.png',
  },
  {
    id: 'figma',
    title: 'Automated Trading Bots',
    description:
      "Let our advanced bot handle your trades, ensuring you never miss an opportunity. Our bots are designed to help you execute your trading strategy 24/7. They can place trades even when you're asleep.",
    imageDark: '/assets/home-features-figma-dark.png',
    imageLight: '/assets/home-features-figma-light.png',
  },
  {
    id: 'tech',
    title: 'OpenAI ChatGPT Integrations',
    description:
      'Have questions? Get real-time financial strategy insights powered by OpenAI. Our chatbot is powered by OpenAI and can answer your questions about trading strategies, market trends, and more.',
    imageDark: '/assets/home-features-tech-dark.png',
    imageLight: '/assets/home-features-tech-light.png',
  },
  {
    id: 'customize',
    title: 'Social Community',
    description:
      'Join a thriving community. Follow top traders and discover recommended crypto projects. Our community is a great place to learn and share your trading strategies.',
    imageDark: '/assets/home-features-customize-dark.png',
    imageLight: '/assets/home-features-customize-light.png',
  },
  {
    id: 'productive',
    title: 'Flashloan Service',
    description:
      'Leverage our flashloan service for quick, uncollateralized loans in the crypto space. Our flashloan service is a great way to get quick access to capital for your trading strategies.',
    imageDark: '/assets/home-features-nextjs-dark.png',
    imageLight: '/assets/home-features-nextjs-light.png',
  },
];

export const HomeFeatures = () => {
  const theme = useTheme();
  const [activeFeature, setActiveFeature] = useState(0);
  const feature = features[activeFeature];
  const image = theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight;

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'common.white',
        py: '120px',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: 8 }}
        >
          <Typography
            align="center"
            color="inherit"
            variant="h3"
          >
            Everything you need to run your project.
          </Typography>
          <Typography
            align="center"
            color="inherit"
            variant="subtitle2"
          >
            Not just a set of tools, the package includes ready-to-deploy conceptual application.
          </Typography>
        </Stack>
        <Grid
          alignItems="center"
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={6}
          >
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index;

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: 'neutral.400',
                      cursor: 'pointer',
                      p: 3,
                      transition: (theme) =>
                        theme.transitions.create(['background-color, box-shadow', 'color'], {
                          easing: theme.transitions.easing.easeOut,
                          duration: theme.transitions.duration.enteringScreen,
                        }),
                      ...(isActive && {
                        backgroundColor: 'primary.alpha12',
                        boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                        color: 'common.white',
                      }),
                      '&:hover': {
                        ...(!isActive && {
                          backgroundColor: 'primary.alpha4',
                          boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
                          color: 'common.white',
                        }),
                      },
                    }}
                  >
                    <Typography
                      color="inherit"
                      sx={{ mb: 1 }}
                      variant="h6"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      color="inherit"
                      variant="body2"
                    >
                      {feature.description}
                    </Typography>
                    {/* {feature.id === 'figma' && (
                      <Box sx={{ mt: 3 }}>
                        <Button
                          color="success"
                          component="a"
                          endIcon={
                            <SvgIcon fontSize="small">
                              <LinkExternal01Icon />
                            </SvgIcon>
                          }
                          href="https://www.figma.com/file/xrx6uDljzsWuDZiuz3ITCp/Devias-Kit-Pro-UI-6.0-Master"
                          size="small"
                          target="_blank"
                          variant="contained"
                        >
                          Preview in Figma
                        </Button>
                      </Box>
                    )} */}
                  </Box>
                );
              })}
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={6}
          >
            <Box
              sx={{
                '& img': {
                  width: '100%',
                },
              }}
            >
              <img src={image} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
