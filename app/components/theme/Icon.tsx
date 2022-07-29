import { createIconSet } from 'react-native-vector-icons';
import config from '../../assets/homefix.json';

const createSet = (fontFamily: string, fontFile?: string) => {
  const glyphMap = {};
  config.iconSets[0].selection.forEach(icon => {
    glyphMap[icon.name] = icon.code;
  });

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
};

export default createSet('homefix');
