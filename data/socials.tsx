import { ReactNode } from "react";

import {
  DevToLogo,
  GitHubLogo,
  HashnodeLogo,
  Twitterlogo,
  YouTubeLogo,
} from "@/components/Shared/Icons";

interface Social {
  id: string;
  name: string;
  url: string;
  icon: ReactNode;
}

const socials: Social[] = [
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/baivabhere",
    icon: <Twitterlogo color="#1DA1F2" />,
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/itsBaivab",
    icon: <GitHubLogo />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/itsbaivab/",
    icon: <GitHubLogo />, // Ideally replace with LinkedIn icon
  },
  {
    id: "medium",
    name: "Medium",
    url: "https://medium.com/@baivabmukhopadhyay",
    icon: <HashnodeLogo color="#000000" />, // Ideally replace with Medium icon
  },
  {
    id: "leetcode",
    name: "LeetCode",
    url: "https://leetcode.com/u/mukhopadhyaybaivab77/",
    icon: <DevToLogo color="#f0f0f0" />, // Ideally replace with LeetCode icon
  },
];

export default socials;
