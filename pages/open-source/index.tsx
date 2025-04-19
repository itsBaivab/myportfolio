import { GetStaticProps, NextPage } from "next";

import ProjectCard from "@/components/Projects/ProjectCard";

import { allProjects, Project } from "contentlayer/generated";
import Link from "@/components/Shared/Link";
import { ArrowRight } from "react-feather";
import getPreviewImageUrl from "@/utils/getPreviewImageURL";
import { NextSeo } from "next-seo";

export interface ProjectWithPlaceholderImage extends Project {
  placeholderImage: string;
}

interface OpenSourcePageProps {
  openSourceProjectsWithPlaceholderImages: ProjectWithPlaceholderImage[];
}

const OpenSourcePage: NextPage<OpenSourcePageProps> = ({
  openSourceProjectsWithPlaceholderImages,
}) => {
  return (
    <>
      <NextSeo
        title="Open Source | Baivab Mukhopadhyay"
        description="Open Source projects contributed by Baivab Mukhopadhyay"
      />
      <h1 className="mb-8 text-2xl font-bold">Open Source Contributions</h1>
      <div className="flex-col space-y-8">
        {openSourceProjectsWithPlaceholderImages.map((project, index) => (
          <ProjectCard
            key={project._id}
            name={project.name}
            description={project.description}
            link={project.link}
            githubLink={project.githubLink}
            slug={project.slug}
            image={project.image}
            placeholderImage={project.placeholderImage}
          />
        ))}
      </div>
      <Link
        href="https://github.com/mukhopadhyaybaivab"
        className="group mt-8 flex flex-row items-center justify-start space-x-2 text-xl font-medium"
        noExternalLinkIcon
      >
        <span>View more on GitHub</span>
        <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
      </Link>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Filter only Open Source projects (Meshery and OpenTelemetry)
  const openSourceProjects = allProjects.filter(
    project => project.slug === "meshery" || project.slug === "opentelemetry"
  );

  const openSourceProjectsWithPlaceholderImages = [];

  for (const project of openSourceProjects) {
    const previewUrl = await getPreviewImageUrl(project.image.url);

    openSourceProjectsWithPlaceholderImages.push({
      ...project,
      placeholderImage: previewUrl,
    });
  }

  return {
    props: { openSourceProjectsWithPlaceholderImages },
  };
};

export default OpenSourcePage;