
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetail from "@/components/projects/ProjectDetail";

import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,

    openGraph: {
      title: `${project.title} | Aether Lab`,
      description: project.description,
      type: "website",
      siteName: "Aether Lab",
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aether Lab`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
