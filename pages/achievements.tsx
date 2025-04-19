import AchievementCard from "@/components/Achievements/AchievementCard";
import { allAchievements } from "contentlayer/generated";
import { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { CleanedAchievement } from "types/achievements";

// Map achievement slugs to image paths
const achievementImages: Record<string, string> = {
  "devpod-hack4bengal": "/static/images/achievements/devpod-hack4bengal.jpeg",
  "jis-sanman-award": "/static/images/achievements/jis-sanman-award.jpg",
  "jistech-2023": "/static/images/achievements/jistech-2023.jpg",
  "microsoft-learn-student-ambassador": "/static/images/achievements/mlsa.png",
  "smart-india-hackathon": "/static/images/achievements/sih.jpeg"
};

interface AchievementPageProps {
  achievements: CleanedAchievement[];
}

const AchievementsPage: NextPage<AchievementPageProps> = ({ achievements }) => {
  return (
    <>
      <NextSeo
        title="Achievements | Anish De"
        description="Anish De's Achievements"
      />
      <h1 className="mb-8 text-2xl font-bold">Achievements</h1>
      <div className="flex flex-col space-y-8">
        {achievements.map(({ id, title, content, date, proof, imagePath }) => (
          <AchievementCard
            key={id}
            title={title}
            content={content}
            date={date}
            proof={proof}
            imagePath={imagePath}
          />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Filter out the achievements that need to be removed
  const filteredAchievements = allAchievements.filter(achievement => {
    const slug = achievement._id.split('/')[1].replace('.mdx', '');
    return !['medusa-hackathon', 'twnft-thirdweb-hashnode-hackathon', 'vaultacks-pointergg-stacks-hackathon'].includes(slug);
  });

  const cleanedAchievements = filteredAchievements.map(achievement => {
    // Extract the slug from the _id (format: "achievements/slug.mdx")
    const slug = achievement._id.split('/')[1].replace('.mdx', '');
    
    return {
      id: achievement._id,
      title: achievement.title,
      content: achievement.body.code,
      date: achievement.date ?? null,
      proof: achievement.proof ?? null,
      imagePath: achievementImages[slug] || null
    };
  });

  return {
    props: { achievements: cleanedAchievements },
  };
};

export default AchievementsPage;
