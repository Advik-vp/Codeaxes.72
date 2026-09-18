export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  technologies: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  overview: string
  features: string[]
  architecture: string
  challenges: string[]
  featured?: boolean
}

export interface ProjectFilters {
  keyword?: string
  technology?: string
  tag?: string
}
