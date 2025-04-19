import type { GetStaticProps, NextPage } from "next";

import Hero from "@/components/Home/Hero";
import Projects from "@/components/Home/Projects";
import OpenSource from "@/components/Home/OpenSource";
import BlogPosts from "@/components/Home/BlogPosts";
import Contact from "@/components/Home/Contact";

import hashnodeData from "@/data/hashnode.json";
import mediumData from "@/data/medium.json";
import getPreviewImageUrl from "@/utils/getPreviewImageURL";
import { HashnodePostWithPlaceHolderImage } from "types/hashnode";
import { MediumPostWithPlaceholderImage } from "types/medium";

interface HomePageProps {
  blogPosts: {
    hashnode: {
      posts: HashnodePostWithPlaceHolderImage[];
      domain: string;
    };
    medium: {
      posts: MediumPostWithPlaceholderImage[];
      username: string;
    };
  };
}

const HomePage: NextPage<HomePageProps> = ({ blogPosts }) => {
  return (
    <>
      <Hero />
      <Projects />
      <OpenSource />
      <BlogPosts hashnode={blogPosts.hashnode} medium={blogPosts.medium} />
      <Contact />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Hashnode data processing
  const hashPosts = hashnodeData.posts;
  const hashnodePostsWithPlaceholerImages = [];

  for (const post of hashPosts) {
    const previewUrl = await getPreviewImageUrl(post.coverImage);
    hashnodePostsWithPlaceholerImages.push({
      ...post,
      placeholderImage: previewUrl,
    });
  }
  
  // Medium data processing
  const mediumPosts = mediumData.posts;
  const mediumPostsWithPlaceholderImages = [];
  
  for (const post of mediumPosts) {
    // Safely handle the thumbnail URL
    let previewUrl;
    try {
      previewUrl = await getPreviewImageUrl(post.thumbnail);
    } catch (error) {
      // In case there's an issue with the thumbnail URL, provide a fallback
      previewUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    }
    
    mediumPostsWithPlaceholderImages.push({
      ...post,
      placeholderImage: previewUrl,
    });
  }

  return {
    props: { 
      blogPosts: {
        hashnode: {
          posts: hashnodePostsWithPlaceholerImages,
          domain: hashnodeData.domain || "blog.example.com"
        },
        medium: {
          posts: mediumPostsWithPlaceholderImages,
          username: mediumData.username
        }
      }
    },
  };
};

export default HomePage;
