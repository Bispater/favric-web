export type ProjectCategory = "hardware" | "mobile" | "web";
export type DemoType = "video" | "iframe" | "image";

export interface ProjectMedia {
  thumbnail: string;
  demoType: DemoType;
  demoSource: string;
  gallery: string[];
}

export interface ProjectLinks {
  live: string | null;
  github: string | null;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  media: ProjectMedia;
  links: ProjectLinks;
}

export interface Portfolio {
  portfolio: Project[];
}
