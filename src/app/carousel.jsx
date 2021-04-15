import React, { useEffect, useState } from "react";

export { CarouselApp };

function CarouselApp(props) {
  const setting = props.config;

  const [carouselState, chagneCarouselState] = useState({
    curPos: 0,
    stoptAnimation: false,
  });
  const [carouselElement, setCarouselElement] = useState([]);
  const goToElement = React.createRef();
  const errorGoTo = React.createRef();
  const carouselRef = React.createRef();

  const elemWidth =
    setting.carouselElementMargin * 2 + setting.carouselElementWidth;
  let transitionStartX = null;
  let shiftX = 0;

  useEffect(() => {
    const children = props.children.props.children;

    setCarouselElement([...children].map((el) => el.props.children));
  }, []);

  useEffect(() => {
    if (
      carouselState.curPos === carouselElement.length &&
      carouselState.stoptAnimation
    ) {
      chagneCarouselState({
        curPos: carouselState.curPos - 1,
        stoptAnimation: false,
      });
    } else if (carouselState.curPos < 0 && carouselState.stoptAnimation) {
      chagneCarouselState({
        curPos: carouselState.curPos + 1,
        stoptAnimation: false,
      });
    }
  });
  const getShownElementCount = () => {
    return Math.ceil(
      (window.innerWidth - setting.carouselElementMargin * 2) / elemWidth
    );
  };

  const carouselWidth = (mShownElementCount, elementCount) => {
    if (
      elementCount < mShownElementCount &&
      setting.carouselElementShown === 0
    ) {
      return elementCount * elemWidth;
    } else if (
      setting.carouselElementShown >= mShownElementCount ||
      setting.carouselElementShown === 0
    ) {
      return "auto";
    } else {
      return setting.carouselElementShown * elemWidth;
    }
  };

  const stepLeft = () => {
    const isOverflow = carouselState.curPos - 1 < 0;

    if (isOverflow) {
      chagneCarouselState({
        curPos: carouselElement.length,
        stoptAnimation: true,
      });
    } else {
      chagneCarouselState({
        curPos: carouselState.curPos - 1,
        stoptAnimation: false,
      });
    }
  };

  const stepRight = () => {
    const isOverflow = carouselState.curPos + 1 > carouselElement.length - 1;

    if (isOverflow) {
      chagneCarouselState({
        curPos: -1,
        stoptAnimation: true,
      });
    } else {
      chagneCarouselState({
        curPos: carouselState.curPos + 1,
        stoptAnimation: false,
      });
    }
  };

  const onShiftStart = (event) => {
    if (event.touches) {
      transitionStartX = event.touches[0].pageX;
      carouselRef.current.addEventListener("touchmove", onShift);
    } else {
      transitionStartX = event.clientX;
      carouselRef.current.addEventListener("mousemove", onShift);
      carouselRef.current.addEventListener("mouseleave", onShiftEnd);
    }
  };

  const onShift = (event) => {
    if (transitionStartX) {
      carouselRef.current.classList.add("swipe");
      !event.touches ? event.preventDefault() : null;
      const currentPositionX = event.touches
        ? event.touches[0].pageX
        : event.clientX;
      shiftX = currentPositionX - transitionStartX;
      carouselRef.current.style.transform = setXPos();
    }
  };

  const onShiftEnd = (event) => {
    const shiftChange = shiftX / elemWidth;
    carouselRef.current.classList.remove("swipe");

    if (event.touches) {
      carouselRef.current.removeEventListener("touchmove", onShift);
    } else {
      carouselRef.current.removeEventListener("mousemove", onShift);
      carouselRef.current.removeEventListener("mouseleave", onShiftEnd);
    }

    let newPos =
      carouselState.curPos -
      (shiftChange > 0 ? Math.ceil(shiftChange) : Math.floor(shiftChange));
    const carouselElementCount = carouselElement.length;

    if (newPos < 0) {
      newPos = newPos + carouselElementCount;
    } else if (newPos > carouselElementCount - 1) {
      newPos = newPos - carouselElementCount;
    }

    chagneCarouselState({
      ...carouselState,
      curPos: newPos,
    });
    transitionStartX = null;
    shiftX = 0;
  };

  const setXPos = () => {
    const currentX = -(carouselState.curPos + 1) * elemWidth + shiftX;
    return "translateX(" + currentX + "px)";
  };

  const goToPos = () => {
    const inputVal = goToElement.current.value;
    const elementCount = carouselElement.length;

    if (inputVal.length > 0 && !isNaN(inputVal)) {
      if (inputVal <= elementCount && inputVal > 0) {
        chagneCarouselState({
          ...carouselState,
          curPos: inputVal - 1,
        });
        errorGoTo.current.innerHTML = "";
      } else {
        errorGoTo.current.innerHTML = "Number is not in range";
      }
    } else {
      errorGoTo.current.innerHTML = "Wrong value, should be a positive number";
    }
  };

  const getOversized = () => {
    if (
      carouselElement.length < shownElementCount &&
      setting.carouselElementShown > carouselElement.length
    ) {
      return false;
    } else {
      return true;
    }
  };
  const shownElementCount = getShownElementCount();
  const isOverSized = getOversized();

  if (carouselElement.length > 0) {
    const newElementList = [...carouselElement];

    if (isOverSized) {
      for (let i = 0; i < shownElementCount; i++) {
        newElementList.push(carouselElement[i]);
      }
      newElementList.unshift(carouselElement[carouselElement.length - 1]);
    }

    const transition = isOverSized ? setXPos() : "translateX(0px)";
    const mWSize = carouselWidth(shownElementCount, newElementList.length);

    return (
      <div className="carousel-wrap">
        <div
          className="carousel"
          style={{
            width: mWSize,
          }}
        >
          <ul
            ref={carouselRef}
            className={carouselState.stoptAnimation ? "no-animation" : ""}
            style={{
              height: setting.carouselHeight,
              width: newElementList.length * elemWidth,
              transform: transition,
            }}
            onTouchStart={isOverSized ? onShiftStart : undefined}
            onMouseDown={isOverSized ? onShiftStart : undefined}
            onTouchEnd={isOverSized ? onShiftEnd : undefined}
            onMouseUp={isOverSized ? onShiftEnd : undefined}
          >
            {newElementList.map((element, index) => (
              <li
                key={index.toString()}
                style={{
                  width: setting.carouselElementWidth,
                  height: setting.carouselElementHeight,
                  margin: setting.carouselElementMargin,
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
          <button className="button-left" onClick={() => stepLeft()}>
            move left
          </button>
          <button className="button-right" onClick={() => stepRight()}>
            move right
          </button>

          <p className="curposinfo">
            Curent position {carouselState.curPos + 1} of{" "}
            {carouselElement.length} elements
          </p>
          <p className="error" ref={errorGoTo}></p>
          <input type="text" ref={goToElement} />

          <button onClick={() => goToPos()}>Move to</button>
        </div>
      </div>
    );
  } else {
    return <div>Rendering</div>;
  }
}
