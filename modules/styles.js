import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
} from 'ol/style';

const styles = {
  'route': new Style({
    stroke: new Stroke({
      width: 6,
      color: [237, 212, 0, 0.8],
    }),
  }),
  'BCN_icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png',
    }),
  }),
  'CAR_icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png',
    }),
  }),
  'LVP_icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png',
    }),
  }),
  'CDZ_icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png',
    }),
  }),
  'geoMarker': new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({color: 'black'}),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  }),
};

export default styles;

