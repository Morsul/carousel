import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app.jsx';
import './css/carousel.css';


function FirstCarousel(){
    const setting = {
        carouselElementWidth: 100,
        carouselElementMargin: 2,
        carouselElementHeight: 100,
    };
    return(
        <App {...setting}>
            <ul >
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/100x100&text=some%20text"/></li>
            </ul>
        </App>
    );
}


ReactDOM.render(
    <FirstCarousel/>,
    document.getElementById('test')
);


function FirstCarousel2(){
    const setting = {
        carouselElementWidth: 200,
        carouselElementMargin: 2,
        carouselElementHeight: 200,
        carouselElementShown: 3
    };
    return(
        <App {...setting}>
            <ul >
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
                <li><img src="https://dummyimage.com/200x200&text=some%20text"/></li>
            </ul>
        </App>
    );
}


ReactDOM.render(
    <FirstCarousel2/>,
    document.getElementById('test2')
);
