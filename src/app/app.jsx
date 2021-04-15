import React from "react";
import { CarouselApp } from "./carousel.jsx";
import defaultProps from "./default.jsx";

export default class App extends React.Component {
  render() {
    const config = {
      ...defaultProps,
      carouselElementWidth: 100,
      carouselElementMargin: 2,
      carouselElementHeight: 100,
    };
    const config2 = {
      ...defaultProps,
      carouselElementWidth: 200,
      carouselElementMargin: 10,
      carouselElementHeight: 200,
      carouselElementShown: 3,
    };
    return (
      <React.Fragment>
        <CarouselApp config={config}>
          <ul>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/100x100&text=some%20text" />
            </li>
          </ul>
        </CarouselApp>
        <CarouselApp config={config2}>
          <ul>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
            <li>
              <img src="https://dummyimage.com/200x200&text=some%20text" />
            </li>
          </ul>
        </CarouselApp>
      </React.Fragment>
    );
  }
}
