import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import image1 from "assets/images/image1.jpg";
import image2 from "assets/images/image2.jpg";
import image3 from "assets/images/image3.jpg";
import styles from 'css/components/ticketManager.scss';
import classNames from "classnames/bind";
import { Grid } from "@material-ui/core";
var cx = classNames.bind(styles);
class CustomCarousel extends Component {
    render() {
        return (
            <Grid container style={{minHeight: "80vh"}} direction="column" alignContent="center" justifyContent="center">
            <Grid item>
                <div style={{height:"400px", width: "550px"}}>
            <Carousel className={cx("customCarousel")}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1}
      alt="First slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image2}
      alt="Second slide"
    />

    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image3}
      alt="Third slide"
    />

    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>
</Grid>
</Grid>
        );
    }
}

export {CustomCarousel};
