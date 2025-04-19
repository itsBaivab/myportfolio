import BlogPostCard from "@/components/Blog/BlogPostCard";
import Link from "@/components/Shared/Link";
import { ArrowRight } from "react-feather";
import { HashnodePostWithPlaceHolderImage } from "types/hashnode";
import { MediumPostWithPlaceholderImage } from "types/medium";
import { format, parseISO } from "date-fns";

interface BlogPostsProps {
  hashnode: {
    posts: HashnodePostWithPlaceHolderImage[];
    domain: string;
  };
  medium?: {
    posts: MediumPostWithPlaceholderImage[];
    username: string;
  };
}

const BlogPosts = ({ hashnode, medium }: BlogPostsProps): JSX.Element => {
  // Combine and sort posts from both platforms by date
  const allPosts = [
    ...hashnode.posts.map(post => ({
      id: post._id,
      title: post.title,
      image: post.coverImage,
      placeholderImage: post.placeholderImage,
      date: post.dateAdded,
      readingTime: post.readingTime.text,
      url: `https://${hashnode.domain}/${post.slug}`,
      source: "Hashnode"
    })),
    ...(medium?.posts?.map(post => ({
      id: post.id,
      title: post.title,
      image: post.thumbnail,
      placeholderImage: post.placeholderImage,
      date: post.pubDate,
      readingTime: post.readingTime.text,
      url: post.link,
      source: "Medium"
    })) || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">Blog Posts</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {allPosts.slice(0, 4).map(post => (
          <BlogPostCard
            key={post.id}
            title={post.title}
            image={post.image}
            placeholderImage={post.placeholderImage}
            date={post.date}
            readingTime={post.readingTime}
            url={post.url}
            source={post.source}
          />
        ))}
      </div>
      <Link
        href="/blog"
        className="group mt-8 flex items-center justify-start space-x-2 text-xl font-medium"
      >
        <span>View All Blog Posts</span>
        <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
      </Link>
    </>
  );
};

export default BlogPosts;
