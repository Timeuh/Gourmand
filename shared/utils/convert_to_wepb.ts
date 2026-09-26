import sharp from "sharp";

/**
 * Convert image buffer to webp format
 *
 * @param {Buffer} image the image buffer to convert
 *
 * @returns {Promise<Buffer>} the converted image buffer
 */
const convertToWebp = async (image: Buffer): Promise<Buffer> => {
  const convertedImage = await sharp(image).webp().toBuffer();

  return convertedImage;
};

export default convertToWebp;
