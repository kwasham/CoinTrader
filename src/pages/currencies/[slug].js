import React from 'react';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { Container } from '@mui/system';
import { useRouter } from "next/router";
import TradingViewWidget from '../components/tradingview'; // Import the TradingViewWidget component

const Page = () => {
    usePageView();
    const router = useRouter();
    const symbol = router.query.symbol && router.query.symbol.toUpperCase(); // Convert to uppercase to match trading view symbols

    return (
        <>
            <Seo />
            <Container height={600}
            maxWidth="xl" 
            sx={{  mt: "24px" }}>
                <h1>{symbol}</h1>
                {/* Pass the symbol to the TradingViewWidget component */}
                <TradingViewWidget symbol={`COINBASE:${symbol}USDT`} />
            </Container>
        </>
    )
}

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;
