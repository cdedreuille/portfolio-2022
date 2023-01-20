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
    start?: number;
    width?: number;
  }[];
  description?: string;
  slug: string;
  tags?: TagProps[];
  backgroundColor?: ColorProps;
  primaryColor?: ColorProps;
  secondaryColor?: ColorProps;
  preview?: {
    type?: "image" | "video";
    image?: ImageProps;
    video?: VideoProps;
  };
  cover?: {
    type?: "image" | "video";
    image?: ImageProps;
    video?: VideoProps;
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

export interface VideoProps {
  _type: "mux.video";
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
