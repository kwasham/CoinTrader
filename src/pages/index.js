import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as MarketingLayout } from 'src/layouts/marketing';
import { HomeCta } from 'src/sections/home/home-cta';
import { HomeFaqs } from 'src/sections/home/home-faqs';
import { HomeFeatures } from 'src/sections/home/home-features';
import { HomeHero } from 'src/sections/home/home-hero';
import { HomeReviews } from 'src/sections/home/home-reviews';
import TopTenTable from 'src/sections/home/top-ten-table';

const Page = ({topTenData}) => {
  usePageView();

  return (
    <>
      <Seo />
      <main>
        {/* <TopTenTable data={topTenData} /> */}
        <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs />
      </main>
    </>
  );
};

Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;

export default Page;

// export async function getServerSideProps() {
//   try {
//     console.log("Fetching top ten data...");
//     const response = await fetch("https://416e-24-27-36-117.ngrok-free.app/api/get-top-ten");
//     const data = await response.json();
//     console.log("Here is the top ten data: ", data);
//     return {
//       props: {
//         topTenData: data,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         topTenData: [],
//       },
//     };
//   }
// }