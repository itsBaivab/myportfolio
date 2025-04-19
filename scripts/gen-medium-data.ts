import axios from "axios";
import fs from "fs";
import { parseStringPromise } from "xml2js";
import readingTime from "reading-time";

const MEDIUM_DATA_FILE_PATH = "./data/medium.json";
// Try using the built-in RSS endpoint that's more stable
const MEDIUM_RSS_URL = "https://medium.com/feed/@baivabmukhopadhyay";
const MEDIUM_USERNAME = "baivabmukhopadhyay";

interface MediumRssItem {
  title?: string[];
  link?: string[];
  "content:encoded"?: string[];
  content?: string[];
  category?: string[];
  guid?: string[];
  pubDate?: string[];
  "dc:creator"?: string[];
  description?: string[];
}

interface ProcessedMediumPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  categories: string[];
  content: string;
  readingTime: ReturnType<typeof readingTime>;
  wordCount: number;
  thumbnail: string;
  description: string;
}

const extractThumbnail = (content: string): string => {
  // Look for the first image in the content
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  
  // Default image if none found
  return "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png";
};

const extractDescription = (content: string, description?: string[]): string => {
  // First try to extract a snippet from Medium's feed structure
  if (description && description.length > 0) {
    // Extract the snippet text from HTML structure
    const snippetMatch = description[0].match(/<p class="medium-feed-snippet">(.*?)<\/p>/);
    if (snippetMatch && snippetMatch[1]) {
      // Return the snippet text without HTML and without "By DevOps With Baivab" part
      let snippet = snippetMatch[1].replace(/^By DevOps With Baivab\s*/, '');
      // If snippet is empty after removing the byline, extract the title instead
      if (!snippet.trim()) {
        // Just return a simple message if no meaningful snippet
        return "Click to read this article on Medium";
      }
      return snippet;
    }
  }
  
  // Fallback: Strip HTML tags and get the first ~200 characters
  const strippedContent = content.replace(/<[^>]*>?/gm, '');
  return strippedContent.substring(0, 200) + (strippedContent.length > 200 ? '...' : '');
};

// If we can't fetch the real data, let's create sample data for demonstration
const createSampleData = () => {
  const samplePosts: ProcessedMediumPost[] = [
    {
      id: "sample-post-1",
      title: "Sample Medium Post 1",
      link: "https://medium.com/@baivabmukhopadhyay/sample-post-1",
      pubDate: new Date().toISOString(),
      creator: "Baivab Mukhopadhyay",
      categories: ["Technology", "Programming"],
      content: "<p>This is a sample Medium post content.</p>",
      readingTime: {
        text: "3 min read",
        minutes: 3,
        time: 180000,
        words: 600
      },
      wordCount: 600,
      thumbnail: "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png",
      description: "This is a sample Medium post for demonstration purposes."
    },
    {
      id: "sample-post-2",
      title: "Sample Medium Post 2",
      link: "https://medium.com/@baivabmukhopadhyay/sample-post-2",
      pubDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      creator: "Baivab Mukhopadhyay",
      categories: ["Web Development", "React"],
      content: "<p>This is another sample Medium post content.</p>",
      readingTime: {
        text: "5 min read",
        minutes: 5,
        time: 300000,
        words: 1000
      },
      wordCount: 1000,
      thumbnail: "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png",
      description: "This is another sample Medium post for demonstration purposes."
    }
  ];
  
  return samplePosts;
};

const main = async () => {
  try {
    console.log("Fetching Medium RSS feed...");
    
    // Add a user agent to make the request look more like a browser
    const { data } = await axios.get(MEDIUM_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    // For debugging, write the raw RSS data to a file
    fs.writeFileSync("./medium-rss-debug.json", JSON.stringify(data));
    console.log("Wrote raw RSS data to medium-rss-debug.json for inspection");
    
    const parsed = await parseStringPromise(data);
    
    // For debugging, write the parsed RSS data structure to a file
    fs.writeFileSync("./medium-parsed-debug.json", JSON.stringify(parsed, null, 2));
    console.log("Wrote parsed RSS data to medium-parsed-debug.json for inspection");
    
    // Add more robust checks for the RSS structure
    if (!parsed.rss || !parsed.rss.channel || !parsed.rss.channel[0] || !parsed.rss.channel[0].item) {
      throw new Error("RSS feed structure is not as expected");
    }
    
    const items = parsed.rss.channel[0].item as MediumRssItem[];
    
    console.log(`Found ${items.length} posts from Medium`);
    
    // Inspect the structure of the first item
    if (items.length > 0) {
      console.log("First item structure:", JSON.stringify(Object.keys(items[0])));
    }
    
    const processedPosts: ProcessedMediumPost[] = items
      .filter(item => {
        // Print each item structure for debugging
        console.log(`Item has title: ${!!item.title}, link: ${!!item.link}, content:encoded: ${!!item["content:encoded"]}, content: ${!!item.content}`);
        // Accept either content:encoded or content or description
        return item.title && item.link && (item["content:encoded"] || item.content || item.description);
      })
      .map(item => {
        // Try to get content from multiple possible fields
        const contentField = item["content:encoded"] || item.content || item.description || [];
        const content = contentField[0] || "";
        const rTime = readingTime(content);
        const wordCount = content.split(/\s+/gu).length;
        
        return {
          id: item.guid?.[0] || item.link?.[0] || `post-${Date.now()}`,
          title: item.title?.[0] || "Untitled Post",
          link: item.link?.[0] || "",
          pubDate: item.pubDate?.[0] || new Date().toISOString(),
          creator: item["dc:creator"]?.[0] || MEDIUM_USERNAME,
          categories: item.category || [],
          content: content,
          readingTime: rTime,
          wordCount,
          thumbnail: extractThumbnail(content),
          description: extractDescription(content, item.description)
        };
      });
    
    if (processedPosts.length === 0) {
      throw new Error("No valid posts found in the Medium RSS feed");
    }
    
    fs.writeFileSync(
      MEDIUM_DATA_FILE_PATH,
      JSON.stringify({ 
        posts: processedPosts, 
        username: MEDIUM_USERNAME 
      }, null, 2)
    );
    
    console.log(`Successfully wrote ${processedPosts.length} Medium posts to ${MEDIUM_DATA_FILE_PATH}`);
  } catch (error) {
    console.error("Error fetching Medium RSS feed:", error);
    console.log("Creating sample data for demonstration...");
    
    // If there's an error, create sample data
    const samplePosts = createSampleData();
    
    fs.writeFileSync(
      MEDIUM_DATA_FILE_PATH,
      JSON.stringify({ 
        posts: samplePosts, 
        username: MEDIUM_USERNAME 
      }, null, 2)
    );
    
    console.log(`Successfully wrote ${samplePosts.length} sample Medium posts to ${MEDIUM_DATA_FILE_PATH}`);
  }
};

main();