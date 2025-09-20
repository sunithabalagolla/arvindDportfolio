import React from "react";
import heroImage from "../../assets/images/about/timeline/timeline1.jpg";
import history1 from "../../assets/images/about/timeline/history1.jpg";
import history2 from "../../assets/images/about/timeline/history2.jpg";
import history3 from "../../assets/images/about/timeline/history3.jpg";
import history4 from "../../assets/images/about/timeline/history4.jpg";

const historyData = [
  {
    id: 1,
    description:
      "Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.Aravind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's family belongs to the Munnuru Kapu community, which is categorised as an Other Backward Class by the Indian government.",
    image: history1,
  },
  {
    id: 2,
    description:
      "Arvind began his political career by joining the BJP in September 2017[11] and in 2019 contested as a BJP candidate from Nizamabad in the Lok Sabha elections.His focus on education, healthcare, and employment opportunities helped him Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.Aravind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's family belongs to the Munnuru Kapu community, which is categorised as an Other Backward Class by the Indian government.gain recognition among the people.",
    image: history2,
  },
  {
    id: 3,
    description:
      "He emerged as a strong leader within BJP, with a vision for inclusive and transparent governance.Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.Aravind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's family belongs to the Munnuru Kapu community, which is categorised as an Other Backward Class by the Indian government.",
    image: history3,
  },
  {
    id: 4,
    description:
      "Arvind continues to work towards sustainable development and long-term progress for Telangana and the nation.Arvind Dharmapuri is an Indian politician who is the current Member of Parliament in the Lok Sabha from Nizamabad, Telangana. He was born on 25th August 1976. He is the youngest of two sons of D. Srinivas who served as a three-time Congress MLA from Nizamabad.Aravind's father D. Srinivas served as a Member of Parliament (Rajya Sabha) and a minister for the state of Andhra Pradesh. His father also served as the president of the Andhra Pradesh Congress Committee. His grandfather Dharmapuri Venkatram was a member of Jan Sangh. Arvind's family belongs to the Munnuru Kapu community, which is categorised as an Other Backward Class by the Indian government.",
    image: history4,
  },
];

const Time = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-screen flex items-center bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale-[40%] saturate-75 contrast-110"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-end justify-between px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="text-white max-w-xl mb-8 sm:mb-10 lg:mb-20 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Journey of <br /> Arvind Dharmapuri
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
              Stay updated with the latest press releases, media coverage,
              exclusive interviews, and important announcements
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-left text-gray-900 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            History
          </h2>

          {historyData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            >
              {/* Mobile: Always image first, then text */}
              <div className="lg:hidden">
                <div className="border-3 sm:border-4 border-orange-500 rounded-lg shadow-lg overflow-hidden mb-4 sm:mb-6">
                  <img
                    src={item.image}
                    alt={`History ${item.id}`}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </div>
                <div className="text-center px-2">
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Desktop: Alternating layout */}
              <div className="hidden lg:contents">
                {index % 2 === 0 ? (
                  <>
                    {/* Even index: Image left, Text right */}
                    <div className="border-4 border-orange-500 rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={`History ${item.id}`}
                        className="w-full h-64 xl:h-80 2xl:h-96 object-cover"
                      />
                    </div>
                    <div className="text-left pl-0 xl:pl-6">
                      <p className="text-gray-700 text-base lg:text-lg xl:text-xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Odd index: Text left (left-aligned), Image right */}
                    <div className="text-left pr-0 xl:pr-6">
                      <p className="text-gray-700 text-base lg:text-lg xl:text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="border-4 border-orange-500 rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={`History ${item.id}`}
                        className="w-full h-64 xl:h-80 2xl:h-96 object-cover"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Time;