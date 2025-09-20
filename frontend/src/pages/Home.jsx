import React from "react";
import Carousel from "../components/home/Carousel";
// import Header from "../components/common/Header";
import ArvindProfile from "../components/home/ArvindProfile";
import NewsCarousel from "../components/home/NewsCarousel";
import PromisesScroll from "../components/home/PromisesScroll";
import Gallery from "../components/home/Gallery";
import VolunteerDashboard from "../components/home/VolunteerDashboard";
import ArvindFoundationCarousel from "../components/home/ArvindFoundationCarousel";
import EventCalendar from "../components/home/EventCalendar";
import DonationSection from "../components/home/DonationSection";
import FeedbackForm from "../components/home/FeedbackForm";
import Footer from "../components/common/footer";
import FullWidthImage from "../components/home/FullWidthImage";
import ShopSection from "../components/home/ShopSection";
import SocialSection from "../components/home/SocialSection";
import ArvindArmyCard from "../components/home/ArvindArmyCard";



function Home() {
    return (
        <div className="relative w-full h-screen">
              {/* Header overlays at the very top */}
      {/* <Header /> */}

      {/* Carousel behind header */}
      <Carousel />

            {/* -----------------Rest of Home Page Sections--------------- */}

           {/*arvind profile */}
           <ArvindProfile></ArvindProfile>
           <NewsCarousel></NewsCarousel>
           <PromisesScroll></PromisesScroll>
        <Gallery></Gallery>
        <VolunteerDashboard></VolunteerDashboard>
        <ArvindFoundationCarousel></ArvindFoundationCarousel>
        <EventCalendar></EventCalendar>
        <DonationSection></DonationSection>
        <ArvindArmyCard></ArvindArmyCard>
        <FeedbackForm></FeedbackForm>
        <SocialSection></SocialSection>
        <ShopSection></ShopSection>
        <FullWidthImage></FullWidthImage>
        <Footer></Footer>
        </div>
    );
}

export default Home;
