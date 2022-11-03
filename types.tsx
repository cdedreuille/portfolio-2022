export interface ProjectProps {
  _id: string;
  name: string;
  client: string;
  type: string;
  published_at: string;
  blocks?: {
    _key: string;
    _type: string;
    assets?: {
      _key: string;
      type: string;
      url: string;
      width: number;
      height: number;
    }[];
  }[];
}

export interface ClientProps {
  _id: string;
  name: string;
}
