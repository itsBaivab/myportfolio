import { GetStaticProps, NextPage } from "next";

import hashnodeData from "@/data/hashnode.json";
import mediumData from "@/data/medium.json";
import BlogPostCard from "@/components/Blog/BlogPostCard";
import getPreviewImageUrl from "@/utils/getPreviewImageURL";
import { HashnodePostWithPlaceHolderImage } from "types/hashnode";
import { MediumPostWithPlaceholderImage } from "types/medium";
import { NextSeo } from "next-seo";

interface BlogPostsPageProps {
  hashnode: {
    posts: HashnodePostWithPlaceHolderImage[];
    domain: string;
  };
  medium: {
    posts: MediumPostWithPlaceholderImage[];
    username: string;
  };
}

const BlogPostsPage: NextPage<BlogPostsPageProps> = ({ hashnode, medium }) => {
  // Combine and sort all posts by date
  const allPosts = [
    ...hashnode.posts.map(post => ({
      id: post._id,
      title: post.title,
      image: post.coverImage,
      placeholderImage: post.placeholderImage,
      date: post.dateAdded,
      readingTime: post.readingTime.text,
      excerpt: post.brief,
      url: `https://${hashnode.domain}/${post.slug}`,
      source: "Hashnode"
    })),
    ...medium.posts.map(post => ({
      id: post.id,
      title: post.title,
      image: post.thumbnail,
      placeholderImage: post.placeholderImage,
      date: post.pubDate,
      readingTime: post.readingTime.text,
      excerpt: post.description,
      url: post.link,
      source: "Medium"
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <NextSeo
        title="Blog Posts | Baivab Mukhopadhyay"
        description="Articles written by Baivab Mukhopadhyay on Hashnode and Medium"
      />
      <h1 className="mb-8 text-2xl font-bold">Blog Posts</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {allPosts.map(post => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            image={post.image}
            placeholderImage={post.placeholderImage}
            date={post.date}
            readingTime={post.readingTime}
            excerpt={post.excerpt}
            url={post.url}
            source={post.source}
          />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Process Hashnode posts
  const hashPosts = hashnodeData.posts;
  const hashnodePostsWithPlaceholderImages = [];

  for (const post of hashPosts) {
    const previewUrl = await getPreviewImageUrl(post.coverImage);
    hashnodePostsWithPlaceholderImages.push({
      ...post,
      placeholderImage: previewUrl,
    });
  }

  // Process Medium posts
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
      hashnode: {
        posts: hashnodePostsWithPlaceholderImages,
        domain: hashnodeData.domain || "blog.example.com"
      },
      medium: {
        posts: mediumPostsWithPlaceholderImages,
        username: mediumData.username
      }
    },
  };
};

export default BlogPostsPage;
