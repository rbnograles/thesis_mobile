import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Svg, { RadialGradient, Defs, Rect, Stop } from 'react-native-svg';
import { Button } from 'react-native-elements';
import { buttonOrientation } from '../styles/Screens';
const { width, height } = Dimensions.get('screen');
const SIZE = width - 75;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 50,
    paddingTop: 150,
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}

const Slide = ({ slide: { picture, color, title, description } }: SlideProps) => {
  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      {/* content */}
      <View style={styles.container}>
        <Image source={picture} style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {title === 'Location History' && (
          <View style={buttonOrientation.landingButtonOrientation}>
            <Button title="Continue" buttonStyle={buttonOrientation.featurebutton} />
          </View>
        )}
      </View>
    </>
  );
};

export default Slide;
