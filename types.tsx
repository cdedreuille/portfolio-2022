export interface ProjectProps {
  _id: string;
  name: string;
  client: string;
  type: string;
  published_at: string;
  blocks?: {
    _key: string;
    _type: string;
    assets?: AssetProps[];
  }[];
  description?: string;
  slug: string;
}

export interface AssetProps {
  _key: string;
  type: "image" | "mux";
  url?: string;
  width?: number;
  height?: number;
  playbackId?: string;
}

export interface ClientProps {
  _id: string;
  name: string;
}
