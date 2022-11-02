export interface ProjectProps {
  _id: string;
  name: string;
  client: string;
  type: string;
  published_at: string;
}

export interface ClientProps {
  _id: string;
  name: string;
}
