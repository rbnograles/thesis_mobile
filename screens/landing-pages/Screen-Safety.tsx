import React, { useState } from 'react';
import Slider from '../../modules/liquid-slider/Slider';
import Slide from '../../modules/liquid-slider/Slide';

const slides = [
  {
    color: '#2A749F',
    title: 'Safety',
    description:
      'We want to assure you that your privacy is not sacrificed to ensure your safety. To overcome this pandemic, let us cooperate and help the nation by providing the corrent information',
    picture: require('../../assets/1.png'),
  },
  {
    color: '#054164',
    title: 'Scan QR Code',
    description: 'Scan QR code upon arriving to your destination',
    picture: require('../../assets/5.png'),
  },
  {
    color: '#3F718E',
    title: 'Location History',
    description:
      'Upon scanning, the log will be saved to your location history. Collected data will only be saved to your mobile device.',
    picture: require('../../assets/2.png'),
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
