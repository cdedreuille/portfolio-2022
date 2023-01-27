import { PortableTextBlock } from "sanity";

export interface ProjectProps {
  _id: string;
  name: string;
  client: ClientProps;
  published_at: string;
  content?: (
    | ImageBlockProps
    | VideoBlockProps
    | TitleBlockProps
    | ParagraphBlockProps
  )[];
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
  logo?: ImageProps;
  logoWidth?: number;
  logoHeight?: number;
}

export interface ImageBlockProps {
  _key: string;
  _type: "imageBlock";
  title?: string;
  image?: ImageProps;
  start?: number;
  width?: number;
}

export interface VideoBlockProps {
  _key: string;
  _type: "videoBlock";
  title?: string;
  video?: VideoProps;
  start?: number;
  width?: number;
  controls?: boolean;
}

export interface TitleBlockProps {
  _key: string;
  _type: "titleBlock";
  text?: string;
  start?: number;
  width?: number;
}

export interface ParagraphBlockProps {
  _key: string;
  _type: "paragraphBlock";
  text?: PortableTextBlock;
  start?: number;
  width?: number;
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
  logoHeight?: number;
  logoWidthList?: number;
  logoHeightList?: number;
}

export interface TagProps {
  _id: string;
  name: string;
  slug: string;
}
