import axios from "axios";
import lqip from "lqip-modern";
import fs from "fs";
import path from "path";

const getPreviewImageUrl = async (url: string): Promise<string> => {
  try {
    // Check if the URL is a local path (starts with /)
    if (url.startsWith("/")) {
      // For local files, read directly from the filesystem
      const filePath = path.join(process.cwd(), "public", url);
      
      try {
        const data = fs.readFileSync(filePath);
        const previewImage = await lqip(data);
        return previewImage.metadata.dataURIBase64;
      } catch (error) {
        console.error(`Error reading local file ${filePath}:`, error);
        // Return a fallback blur data URL
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7gQRQAAAABJRU5ErkJggg==";
      }
    } else {
      // For external URLs, use axios as before
      const { data } = await axios.get(url, { responseType: "arraybuffer" });
      const previewImage = await lqip(data);
      return previewImage.metadata.dataURIBase64;
    }
  } catch (error) {
    console.error(`Error generating preview for ${url}:`, error);
    // Return a fallback blur data URL
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7gQRQAAAABJRU5ErkJggg==";
  }
};

export default getPreviewImageUrl;
