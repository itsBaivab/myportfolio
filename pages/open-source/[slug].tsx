import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";

import { allProjects, Project } from "contentlayer/generated";
import MDXComponents from "@/components/Common/MDXComponents";
import IconFactory from "@/components/Shared/Icons/IconFactory";
import Link from "@/components/Shared/Link";
import { ExternalLink, GitHub } from "react-feather";
import CustomGiscus from "@/components/Shared/CustomGiscus";
import getLastEditedDate from "@/utils/getLastEditedDate";
import { NextSeo } from "next-seo";

interface OpenSourcePageProps {
  project: Project;
  lastEditedDate: string;
}

const OpenSourcePage: NextPage<OpenSourcePageProps> = ({
  project,
  lastEditedDate,
}) => {
  const MDXContent = useMDXComponent(project.body.code);

  return (
    <>
      <NextSeo
        title={`${project.name} | Baivab Mukhopadhyay`}
        description={project.description}
      />
      <div className="flex flex-col">
        <div className="mb-8 flex max-w-fit flex-col space-y-8 self-center rounded-xl border-[1px] border-tertiary bg-secondary/40 p-4 shadow-md md:flex-row md:items-center md:space-x-8 md:space-y-0 md:p-8">
          <IconFactory
            name={project.iconName}
            className="h-32 w-32 rounded-xl bg-tertiary p-2 shadow-md"
          />
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-md text-gray-200">{project.description}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              {project.link && (
                <Link href={project.link} noGradientUnderline>
                  <div className="flex items-center space-x-1 rounded-md border-[1px] border-tertiary bg-tertiary px-2 py-1 text-sm font-medium shadow-md transition duration-200 hover:bg-tertiary/60">
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit</span>
                  </div>
                </Link>
              )}
              {project.githubLink && (
                <Link href={project.githubLink} noGradientUnderline>
                  <div className="flex items-center space-x-1 rounded-md border-[1px] border-tertiary bg-tertiary px-2 py-1 text-sm font-medium shadow-md transition duration-200 hover:bg-tertiary/60">
                    <GitHub className="h-4 w-4" />
                    <span>GitHub</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="text-md leading-relaxed text-gray-200">
          <MDXContent components={MDXComponents} />
        </div>
        <div className="text-right">
          <span className="text-sm italic text-gray-600">
            Last updated: {lastEditedDate}
          </span>
        </div>
        <CustomGiscus term={`Open Source: ${project.name}`} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allProjects
    .filter(project => project.slug === "meshery" || project.slug === "opentelemetry")
    .map(project => ({ params: { slug: project.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = allProjects.find(
    project => project.slug === params?.slug
  );

  if (!project) {
    return {
      notFound: true,
    };
  }

  const lastEditedDate = await getLastEditedDate(
    `data/projects/${project.slug}.mdx`
  );

  return {
    props: {
      project,
      lastEditedDate,
    },
  };
};

export default OpenSourcePage;