import NextImage from "next/image";

import Link from "@/components/Shared/Link";
import { format, parseISO } from "date-fns";

interface BlogPostCardProps {
  url: string;
  title: string;
  image: string;
  placeholderImage: string;
  date: string;
  readingTime: string;
  excerpt?: string;
  source?: string;
}

const ProjectCard = ({
  url,
  title,
  image,
  placeholderImage,
  date,
  readingTime,
  excerpt,
  source,
}: BlogPostCardProps): JSX.Element => {
  // Parse the date string
  const formatDate = (dateString: string) => {
    try {
      if (dateString.includes("GMT")) {
        // Handle RSS date format (e.g., "Fri, 18 Apr 2025 10:51:25 GMT")
        return format(new Date(dateString), "PPP");
      } else {
        // Try ISO format for other dates
        return format(parseISO(dateString), "PPP");
      }
    } catch (error) {
      console.error("Date parsing error:", error);
      return "Invalid date";
    }
  };

  return (
    <article className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary bg-secondary/50 py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
      <Link href={url} noExternalLinkIcon noGradientUnderline>
        <div className="mt-8 flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-100 transition duration-200 hover:opacity-60">
            {title}
          </h2>
          {excerpt && <p style={{ wordBreak: "break-word" }}>{excerpt}</p>}
          <div className="flex flex-wrap items-center gap-1 text-gray-300">
            {formatDate(date)} / {readingTime}
            {source && <span> / <span className="text-blue-400">{source}</span></span>}
          </div>
        </div>
      </Link>
      <Link
        href={url}
        className="aspect-[16/9] overflow-hidden rounded-2xl drop-shadow-md"
        noExternalLinkIcon
        noGradientUnderline
      >
        <NextImage
          src={image}
          className="rounded-lg transition duration-200 hover:opacity-60"
          height={270}
          width={480}
          alt={title}
          placeholder="blur"
          blurDataURL={placeholderImage}
        />
      </Link>
    </article>
  );
};

export default ProjectCard;
