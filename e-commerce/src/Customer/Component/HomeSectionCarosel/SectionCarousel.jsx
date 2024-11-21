import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { ButtonBase } from "@mui/material";
import { boysuniformsData } from "../../../Data/Boys/Boysuniform";

const SectionCarousel = ({ sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // AliceCarousel responsive settings
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  // Flatten the uniforms data to pass each uniform item to HomeSectionCard
  const items = boysuniformsData[0]?.institutions.flatMap((institution) =>
    institution.uniforms.map((uniform) => (
      <HomeSectionCard product={uniform} key={`${institution.name}-${uniform.type}`} />
    ))
  ) || [];

  const slidePrev = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
  };

  return (
    <div className="relative px-4 lg:px-9 border">
      <h2 className="text-2xl font-bold py-5">{sectionName}</h2>
      <div className="relative p-2">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          autoPlay
          autoPlayInterval={2000}
          activeIndex={activeIndex}
          onSlideChanged={({ item }) => setActiveIndex(item)}
        />
        {/* Previous Button */}
        <ButtonBase
          variant="contained"
          className="z-50"
          sx={{
            position: "absolute",
            top: "10rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(-90deg)",
            opacity: activeIndex > 0 ? 1 : 0.5,
            pointerEvents: activeIndex > 0 ? 'auto' : 'none',
          }}
          aria-label="prev"
          onClick={activeIndex > 0 ? slidePrev : undefined}
        >
          {/* <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)" }} /> */}
        </ButtonBase>

        {/* Next Button */}
        <ButtonBase
          variant="contained"
          className="z-50"
          sx={{
            position: "absolute",
            top: "10rem",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
            opacity: activeIndex < items.length - 1 ? 1 : 0.5,
            pointerEvents: activeIndex < items.length - 1 ? 'auto' : 'none',
          }}
          aria-label="next"
          onClick={activeIndex < items.length - 1 ? slideNext : undefined}
        >
          {/* <KeyboardArrowRightIcon sx={{ transform: "rotate(0deg)" }} /> */}
        </ButtonBase>
      </div>
    </div>
  );
};

export default SectionCarousel;
