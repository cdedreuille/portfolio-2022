export interface ProjectProps {
  _id: string;
  name: string;
  client: ClientProps;
  type: string;
  published_at: string;
  content?: {
    _key: string;
    _type: "imageBlock";
    title?: string;
    image?: ImageProps;
  }[];
  description?: string;
  slug: string;
  tags?: TagProps[];
  backgroundColor?: ColorProps;
  primaryColor?: ColorProps;
  secondaryColor?: ColorProps;
  preview?: {
    type?: "image" | "video";
    image?: AssetProps;
    video?: AssetProps;
  };
}

export interface ColorProps {
  _id: string;
  hex: string;
}

export interface ImageProps {
  _type: "image";
  url?: string;
  width?: number;
  height?: number;
  extension?: string;
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
  logo?: ImageProps;
  logoList?: ImageProps;
  logoWidth?: number;
  logoHeight?: number;
  logoWidthList?: number;
  logoHeightList?: number;
}

export interface TagProps {
  _id: string;
  name: string;
  slug: string;
}
