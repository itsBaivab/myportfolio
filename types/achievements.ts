export interface CleanedAchievement {
  id: string;
  title: string;
  date?: string;
  proof?: Proof;
  content: string;
  imagePath?: string; // Path to the achievement image
}

export interface Proof {
  title: string;
  url: string;
}
