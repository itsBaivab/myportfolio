import MDXComponents from "@/components/Common/MDXComponents";
import Link from "@/components/Shared/Link";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { CleanedAchievement } from "types/achievements";
import Image from "next/image";

const AchievementCard = ({
  title,
  date,
  proof,
  content,
  imagePath,
}: Omit<CleanedAchievement, "id">): JSX.Element => {
  const AchievementMDX = useMDXComponent(content);

  return (
    <div className="group relative flex flex-col md:flex-row gap-6 rounded-xl border-[1px] border-tertiary bg-secondary/50 py-4 px-6 transition-all duration-300 hover:scale-[1.02] hover:border-accent">
      <div className="flex-1 flex flex-col space-y-4">
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        <div className="max-w-full my-4 leading-8 prose">
          <AchievementMDX components={{ ...MDXComponents }} />
        </div>
        {proof && (
          <Link href={proof.url} noHighlight className="font-semibold">
            {proof.title}
          </Link>
        )}
        <div className="flex flex-row justify-between">
          {date && (
            <p className="text-gray-300">{format(parseISO(date), "PPP")}</p>
          )}
        </div>
      </div>
      
      {imagePath && (
        <div className="md:w-1/3 self-center relative min-h-[200px] overflow-hidden rounded-lg">
          <Image 
            src={imagePath} 
            alt={title} 
            width={400}
            height={300}
            className="object-cover w-full h-full transition-all duration-500 filter grayscale group-hover:grayscale-0"
          />
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
