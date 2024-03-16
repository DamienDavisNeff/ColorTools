# ColorTools
A custom node library that allows me to do various things with colors such as finding the average color, median color, and convert between rgb &amp; hex.

#### Use
1. Download `index.js` and put it in a folder named something like `ColorTools`
2. Use the following code
```js
const ColorTools = require('../ColorTools');
ColorTools.getAverageRGB(IMAGE_URL);
ColorTools.getAverageHex(IMAGE_URL);
ColorTools.getMedianRGB(IMAGE_URL);
ColorTools.getMedianHex(IMAGE_URL);
ColorTools.convertToRGB(HEX_COLOR);
ColorTools.convertToHex(rgb(red,green,blue));
```
