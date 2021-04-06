import React from "react";
import CarouselApp from "./carousel.jsx";
import defaultProps from "./default.jsx";

export default function App(props) {
  let setting = { ...defaultProps, ...props };
  return <CarouselApp {...setting} />;
}
