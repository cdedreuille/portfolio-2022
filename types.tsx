export interface ProjectProps {
  _id: string;
  name: string;
  client: ClientProps;
}

export interface ClientProps {
  _id: string;
  name: string;
}
