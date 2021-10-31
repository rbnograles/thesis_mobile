import React, { useState } from 'react';

import Slider from '../modules/liquid-slider/Slider';
import Slide from '../modules/liquid-slider/Slide';

const slides = [
  {
    color: '#F2A1AD',
    lighterColor: '#e6cace6c',
    title: 'Dessert Recipes',
    description: 'Hot or cold, our dessert recipes can turn an average meal into a memorable event',
    picture: require('../assets/1.png'),
  },
  {
    color: '#0090D6',
    lighterColor: '#e6cace6c',
    title: 'Healthy Foods',
    description: 'Discover healthy recipes that are easy to do with detailed cooking instructions from top chefs',
    picture: require('../assets/5.png'),
  },
  {
    color: '#FB3A4D',
    lighterColor: '#e6cace6c',
    title: '10000+ Recipes',
    description: 'Browse thousands of curated recipes from top chefs, each with detailled cooking instructions',
    picture: require('../assets/2.png'),
  },
  {
    color: '#F2AD62',
    lighterColor: '#e6cace6c',
    title: 'Video Tutorials',
    description: 'Browse our best themed recipes, cooking tips, and how-to food video & photos',
    picture: require('../assets/3.png'),
  },
];

export const assets = slides.map(({ picture }) => picture);

const LiquidSwipe = () => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]!} />
    </Slider>
  );
};

export default LiquidSwipe;
