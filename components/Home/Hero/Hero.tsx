import Socials from "@/components/Shared/Socials";
import NextImage from "next/image";
import AvatarJPG from "public/static/images/avatar.jpg";

const Hero = (): JSX.Element => {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between md:space-y-0">
      <div className="mt-8 flex flex-col justify-center space-y-4 md:mt-0 md:w-2/3">
        <h1 className="will-change-opacity text-5xl font-bold will-change-transform">
          Baivab Mukhopadhyay
        </h1>
        <h2 className="will-change-opacity text-lg font-medium text-gray-400 will-change-transform">
          MLOps Engineer • Go Developer • DevOps • Cloud Native Enthusiast
        </h2>
        <p className="text-md will-change-opacity text-lg text-gray-300 will-change-transform">
          A passionate MLOps Engineer building cloud native applications with GO and Python.
          I design scalable cloud-native infrastructure with Terraform, Kubernetes, and GitOps — 
          built for reliability and speed. I love breaking things to build better, exploring every 
          stack from cloud to code with zero fear and full throttle.
        </p>
        <Socials className="!mt-12" />
      </div>
      <div className="will-change-opacity relative h-32 w-32 overflow-hidden rounded-full will-change-transform">
        <NextImage
          src={AvatarJPG}
          layout="fill"
          placeholder="blur"
          alt="Baivab Mukhopadhyay"
        />
      </div>
    </div>
  );
};

export default Hero;
