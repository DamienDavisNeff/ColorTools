const http = require('http');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');

const getAverageRGB = async (url) => {
    const img = await loadImage(url);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }
    const pixels = data.length / 4;
    const avgR = Math.round(r / pixels);
    const avgG = Math.round(g / pixels);
    const avgB = Math.round(b / pixels);
    return `rgb(${avgR},${avgG},${avgB})`;
}
const  getAverageHex = async (url) => {
    const RGB = await getAverageRGB(url);
    const HEX = await convertToHex(RGB);
    return HEX;
}
const getMedianRGB = async (url) => {
    const img = await loadImage(url);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const colors = [];

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgb = `rgb(${r},${g},${b})`;
        colors.push(rgb);
    }

    // Sort the colors array
    colors.sort();

    // Find the median color
    const medianIndex = Math.floor(colors.length / 2);
    const medianColor = colors[medianIndex];

    return medianColor;
}
const getMedianHex = async (url) => {
    const RGB = await getMedianRGB(url);
    const HEX = await convertToHex(RGB);
    return HEX;
}

const convertToHex = async (rgb) => {
    // extract values
    var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if(!match) return null;
    // convert
    var r = parseInt(match[1], 10);
    var g = parseInt(match[2], 10);
    var b = parseInt(match[3], 10);
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
const convertToRGB = async (hex) => {
    hex = hex.replace("#","");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r},${g},${b})`;
}

module.exports = {
    getAverageRGB,
    getAverageHex,
    getMedianRGB,
    getMedianHex,
    convertToHex,
    convertToRGB
};
