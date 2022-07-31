import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import config from '../../../resources/driveby.json';

// const createSet = (fontFamily: string, fontFile?: string) => {
//   const glyphMap = {};
//   config.iconSets[0].selection.forEach(icon => {
//     glyphMap[icon.name] = icon.code;
//   });

//   return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
// };

// export default createSet('driveby', 'driveby.ttf');
export default createIconSetFromIcoMoon(config, 'driveby');
