"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimatedList } from "../magicui/animated-list";
import { CleanedAchievement } from "../../types/achievements";
import AchievementCard from "./AchievementCard/AchievementCard";

// Local cn function to avoid import issues
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AnimatedAchievementsList({
  achievements,
  className,
}: {
  achievements: CleanedAchievement[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full flex-col overflow-hidden",
        className,
      )}
    >
      <AnimatedList delay={2000} className="w-full max-w-3xl mx-auto pb-16">
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            title={achievement.title}
            content={achievement.content}
            date={achievement.date}
            proof={achievement.proof}
            imagePath={achievement.imagePath}
          />
        ))}
      </AnimatedList>

      {/* Simple gradient fade at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-primary to-transparent"></div>
    </div>
  );
}