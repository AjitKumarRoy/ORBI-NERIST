import Image from 'next/image';
import { Button } from './Button';

// Define the shape of the project data
interface Project {
  id: string;
  title: string;
  image: string;
  link: string;
  fields: string[];
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 p-4 bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] transition-all duration-300 hover:border-cyan-400/50 flex flex-col group">
      <div className="relative mb-4 h-56 w-full overflow-hidden rounded-lg">
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {/* Fields overlaid at the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-2 bg-gradient-to-t from-black/80 to-transparent">
          {project.fields.map((field) => (
            <span key={field} className="rounded bg-cyan-900/80 px-2 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
              {field}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="mb-4 text-lg font-bold text-white line-clamp-2">{project.title}</h3>
      </div>
      <div className="mt-auto">
        <Button href={project.link} variant="secondary" className="inline-flex w-full justify-center">
          Read More
        </Button>
      </div>
    </div>
  );
};