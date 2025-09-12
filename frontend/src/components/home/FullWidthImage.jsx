import React from "react";
import banner from '../../assets/images/singleFrame/banner.png';

export default function FullWidthImage() {
  return (
    <div className="w-full">
      <img
        src={banner}
       
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
