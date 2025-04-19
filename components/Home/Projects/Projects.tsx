import { allProjects } from ".contentlayer/generated";
import Link from "@/components/Shared/Link";
import { ArrowRight } from "react-feather";

const Projects = (): JSX.Element => {
  // Filter out open source projects
  const filteredProjects = allProjects.filter(
    project => project.slug !== "meshery" && project.slug !== "opentelemetry"
  );

  return (
    <div className="my-16 flex flex-col">
      <h2 className="mb-8 text-3xl font-bold">Projects</h2>
      <div className="flex flex-col space-y-8">
        {filteredProjects.slice(0, 3).map((project, index) => (
          <div
            key={project._id}
            className="group relative rounded-xl border-[1px] border-tertiary bg-secondary/50 p-4 transition duration-200 hover:border-accent md:hover:scale-[1.01]"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex flex-col space-y-2"
            >
              <h3 className="text-lg font-semibold">
                {project.name}
              </h3>
              <p className="text-md text-gray-300">{project.description}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/projects"
        className="group mt-8 flex items-center justify-start space-x-2 text-xl font-medium"
      >
        <span>View All Projects</span>
        <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default Projects;
