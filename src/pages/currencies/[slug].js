import React from 'react'
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { Container } from '@mui/system'
import { useRouter } from "next/router";


const Page = () => {
    usePageView();
    const router = useRouter();
    console.log("Here is the router: ", router)
    const symbol = router.query.symbol;
    console.log("Here is the symbol: ", symbol)


  return (
    <Seo />, 
    <Container maxWidth="xl" 
    sx={{height: "600px", mt: "24px"}}>
        <h1>{symbol}</h1>
    </Container>
  )
}

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page