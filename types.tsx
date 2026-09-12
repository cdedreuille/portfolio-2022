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
  caption?: string;
  image?: ImageProps;
  start?: number;
  width?: number;
}

export interface VideoBlockProps {
  _key: string;
  _type: "videoBlock";
  caption?: string;
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
  text?: PortableTextValue;
  start?: number;
  width?: number;
}

export type PortableTextValue = PortableTextBlock[];

export interface PortableTextSpan {
  _key?: string;
  _type: "span";
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _key?: string;
  _type: "block";
  children?: PortableTextSpan[];
  markDefs?: { _key: string; _type: string }[];
  style?: string;
}

export interface ColorProps {
  hex: string;
}

export interface ImageProps {
  url?: string;
  width?: number;
  height?: number;
}

export interface VideoProps {
  src?: string;
}

export interface ClientProps {
  _id: string;
  name: string;
  logoList?: ImageProps;
  logoWidthList?: number;
  logoHeightList?: number;
}

export interface TagProps {
  _id: string;
  name: string;
  slug: string;
}
