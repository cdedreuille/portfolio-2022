export interface ProjectProps {
  _id: string;
  name: string;
  client: string;
  type: string;
  published_at: string;
  content?: AssetProps[];
  description?: string;
  slug: string;
  tags?: TagProps[];
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

export interface TagProps {
  _id: string;
  name: string;
  slug: string;
}
