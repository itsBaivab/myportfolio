import { allProjects } from ".contentlayer/generated";
import Link from "@/components/Shared/Link";
import { ArrowRight } from "react-feather";

const OpenSource = (): JSX.Element => {
  // Filter for only Open Source projects (Meshery and OpenTelemetry)
  const openSourceProjects = allProjects.filter(
    project => project.slug === "meshery" || project.slug === "opentelemetry"
  );

  return (
    <div className="my-16 flex flex-col">
      <h2 className="mb-8 text-3xl font-bold">Open Source Contributions</h2>
      <div className="flex flex-col space-y-8">
        {openSourceProjects.map((project, index) => (
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
        <span>View All Open Source Contributions</span>
        <ArrowRight className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default OpenSource;