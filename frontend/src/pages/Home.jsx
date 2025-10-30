import React from "react";
import Carousel from "../components/home/Carousel";
import ArvindProfile from "../components/home/ArvindProfile";
import NewsCarousel from "../components/home/NewsCarousel";
import PromisesScroll from "../components/home/PromisesScroll";
import GalleryPreview from '../components/home/Gallery';
import VolunteerDashboard from "../components/home/VolunteerDashboard";
import ArvindFoundationCarousel from "../components/home/ArvindFoundationCarousel";
import EventCalendar from "../components/home/EventCalendar";
import DonationSection from "../components/home/DonationSection";
import FeedbackForm from "../components/home/FeedbackForm";
import FullWidthImage from "../components/home/FullWidthImage";
import ShopSection from "../components/home/ShopSection";
import SocialSection from "../components/home/SocialSection";
import ArvindArmyCard from "../components/home/ArvindArmyCard";

function Home() {
    return (
        <>
            {/* Hero Carousel */}
            <section className="w-full ">
                <Carousel />
            </section>

            {/* All Home Sections */}
            <ArvindProfile />
            <NewsCarousel />
            <PromisesScroll />
            <GalleryPreview />
            <VolunteerDashboard />
            <ArvindFoundationCarousel />
            <EventCalendar />
            <DonationSection />
            <ArvindArmyCard />
            <FeedbackForm />
            <SocialSection />
            <ShopSection />
            <FullWidthImage />
        </>
    );
}

export default Home;