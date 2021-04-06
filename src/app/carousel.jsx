import React, { Component } from "react";

export default class CarouselApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      carouselElement: [],
      curPos: 0,
      stoptAnimation: false,
      timeout: null,
      shiftX: 0,
      error_msg: "",
    };

    this.goToRef = React.createRef();
    this.carouselRef = React.createRef();
  }

  tsX;

  componentDidMount() {
    let children = this.props.children.props.children;

    this.setState({
      carouselElement: [...children].map((el) => el.props.children),
    });
  }

  clearTimeout = () => {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: null });
    }
  };

  shownElementCount(elemWidth) {
    return Math.ceil(
      (window.innerWidth - this.state.carouselElementMargin * 2) / elemWidth
    );
  }

  carouselWidth(elemWidth, mShownElementCount, elementcount) {
    if (elementcount < mShownElementCount) {
      return elementcount * elemWidth;
    } else if (
      this.state.carouselElementShown >= mShownElementCount ||
      this.state.carouselElementShown === 0
    ) {
      return "auto";
    } else {
      return this.state.carouselElementShown * elemWidth;
    }
  }

  stepLeft = () => {
    this.clearTimeout();
    const isOverflow = this.state.curPos - 1 < 0;

    if (isOverflow) {
      this.setState({
        curPos: this.state.carouselElement.length,
        stoptAnimation: true,
        timeout: setTimeout(() => this.stepLeft(), 50),
      });
    } else {
      this.setState({
        curPos: this.state.curPos - 1,
        stoptAnimation: false,
      });
    }
  };

  stepRight = () => {
    this.clearTimeout();
    const isOverflow =
      this.state.curPos + 1 > this.state.carouselElement.length - 1;

    if (isOverflow) {
      this.setState({
        curPos: -1,
        stoptAnimation: true,
        timeout: setTimeout(() => this.stepRight(), 50),
      });
    } else {
      this.setState({
        curPos: this.state.curPos + 1,
        stoptAnimation: false,
      });
    }
  };

  changeShift = (event) => {
    const eleWidth =
      this.state.carouselElementMargin * 2 + this.state.carouselElementWidth;

    if (event.type === "touchstart") {
      this.tsX = event.touches[0].clientX;
    } else if (event.type === "touchmove") {
      let moveDir = event.touches[0].clientX - this.tsX;

      this.setState({
        shiftX: moveDir,
      });
    } else {
      let shiftChange = this.state.shiftX / eleWidth;
      let curPos = this.state.curPos;
      let newPos = curPos - Math.ceil(shiftChange);
      let carouselElementCount = this.state.carouselElement.length;

      if (newPos < 0) {
        newPos = newPos + carouselElementCount;
      } else if (newPos > carouselElementCount - 1) {
        newPos = newPos - carouselElementCount;
      }

      this.setState({
        curPos: newPos,
        shiftX: 0,
      });
    }
  };

  goToPos = () => {
    const inputVal = this.goToRef.current.value;
    const elementCount = this.state.carouselElement.length;

    if (inputVal.length > 0 && !isNaN(inputVal)) {
      if (inputVal <= elementCount && inputVal > 0) {
        this.setState({
          curPos: inputVal - 1,
          error_msg: "",
        });
      } else {
        this.setState({
          error_msg: "Number is not in range",
        });
      }
    } else {
      this.setState({
        error_msg: "Wrong value, should be a positive number",
      });
    }
  };

  setXPos() {
    return (
      -(this.state.curPos + 1) *
        (this.state.carouselElementWidth +
          this.state.carouselElementMargin * 2) +
      this.state.shiftX
    );
  }

  render() {
    let carouselElement = this.state.carouselElement;

    if (carouselElement.length > 0) {
      let transition;
      let mNewElementList = [...carouselElement];
      const elemWidth =
        this.state.carouselElementMargin * 2 + this.state.carouselElementWidth;
      const mShownElementCount = this.shownElementCount(elemWidth);
      const isOverSized = carouselElement.length >= mShownElementCount;

      if (isOverSized) {
        for (let i = 0; i < mShownElementCount; i++) {
          mNewElementList.push(carouselElement[i]);
        }
        mNewElementList.unshift(carouselElement[carouselElement.length - 1]);

        transition = "translateX(" + this.setXPos() + "px)";
      } else {
        transition = "translateX(0px)";
      }

      const mWSize = this.carouselWidth(
        elemWidth,
        mShownElementCount,
        mNewElementList.length
      );

      return (
        <div className="carousel-wrap">
          <div
            className="carousel"
            style={{
              width: mWSize,
            }}
          >
            <ul
              ref={this.carouselRef}
              className={this.state.stoptAnimation ? "no-animation" : ""}
              style={{
                height: this.state.carouselHeight,
                width: mNewElementList.length * elemWidth,
                transform: transition,
              }}
              onTouchStart={this.changeShift}
              onTouchMove={this.changeShift}
              onTouchEnd={this.changeShift}
            >
              {mNewElementList.map((element, index) => (
                <li
                  key={index.toString()}
                  style={{
                    width: this.state.carouselElementWidth,
                    height: this.state.carouselElementHeight,
                    margin: this.state.carouselElementMargin,
                  }}
                >
                  {element}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="carousel-nav"
            style={{
              display: isOverSized ? "block" : "none",
            }}
          >
            <button className="button-left" onClick={this.stepLeft}>
              move left
            </button>
            <button className="button-right" onClick={this.stepRight}>
              move right
            </button>

            <p className="curposinfo">
              Curent position {this.state.curPos + 1} of{" "}
              {carouselElement.length} elements
            </p>
            <p className="error">{this.state.error_msg}</p>
            <input type="text" ref={this.goToRef} />

            <button onClick={this.goToPos}>Move to</button>
          </div>
        </div>
      );
    } else {
      return <div>Rendering</div>;
    }
  }
}
