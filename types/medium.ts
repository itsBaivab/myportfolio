import { ReadTimeResults } from "reading-time";

export interface MediumPost {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  categories: string[];
  content: string;
  readingTime: ReadTimeResults;
  wordCount: number;
  thumbnail: string;
  description: string;
}

export interface MediumPostWithPlaceholderImage extends MediumPost {
  placeholderImage: string;
}

export interface MediumData {
  posts: MediumPost[];
  username: string;
}