"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "../../Common/MDXComponents";
import { format, parseISO } from "date-fns";
import Link from "../../Shared/Link";
import Image from "next/image";
import { CleanedAchievement } from "../../../types/achievements";

// Local cn function to avoid import issues
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a consistent color based on the title
const getColorFromTitle = (title: string) => {
  const colors = [
    "#00C9A7", // teal
    "#FFB800", // amber
    "#FF3D71", // pink
    "#1E86FF", // blue
    "#8F69FC", // purple
    "#FF5630", // orange
  ];
  
  // Simple hash function to get consistent color for the same title
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const AchievementCard = ({
  title,
  date,
  proof,
  content,
  imagePath,
}: Omit<CleanedAchievement, "id">): JSX.Element => {
  const AchievementMDX = useMDXComponent(content);
  const color = getColorFromTitle(title);
  const icon = title.charAt(0); // First letter as icon

  return (
    <figure
      className={cn(
        "relative mx-auto w-full bg-white dark:bg-gray-900 overflow-hidden rounded-2xl p-4 mb-6",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        // dark mode styles
        "border border-gray-200 dark:border-gray-800",
        "shadow-sm hover:shadow-md"
      )}
    >
      <div className="flex flex-row items-start gap-4">
        {/* Left side icon/image */}
        <div
          className="flex min-w-[40px] h-10 items-center justify-center rounded-full flex-shrink-0"
          style={{
            backgroundColor: color,
          }}
        >
          {imagePath ? (
            <Image 
              src={imagePath} 
              alt={title} 
              width={24}
              height={24}
              className="object-cover"
            />
          ) : (
            <span className="text-sm text-white font-bold">{icon}</span>
          )}
        </div>
        
        {/* Main content */}
        <div className="flex flex-col overflow-hidden flex-1">
          {/* Title and date */}
          <div className="flex flex-row items-center flex-wrap">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
            {date && (
              <span className="text-xs text-gray-500 ml-2">
                {format(parseISO(date), "MMM d, yyyy")}
              </span>
            )}
          </div>
          
          {/* Content */}
          <div className="prose dark:prose-invert mt-1 text-gray-600 dark:text-gray-300 text-sm max-w-none">
            <AchievementMDX components={{ ...MDXComponents }} />
          </div>
          
          {/* Proof/link if available */}
          {proof && (
            <div className="mt-2">
              <Link href={proof.url} noHighlight className="text-xs font-medium text-blue-500 hover:text-blue-600">
                {proof.title} →
              </Link>
            </div>
          )}
        </div>
        
        {/* Optional right side image */}
        {imagePath && (
          <div className="ml-auto w-20 h-20 self-center flex-shrink-0 overflow-hidden rounded-lg hidden sm:block">
            <Image 
              src={imagePath} 
              alt={title} 
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    </figure>
  );
};

export default AchievementCard;
