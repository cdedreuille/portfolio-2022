export const imageQuery = `{
  _type,
  "url": @.asset->url,
  "width": @.asset->metadata.dimensions.width,
  "height": @.asset->metadata.dimensions.height,
  "extension": @.asset->extension,
}`;

export const videoQuery = `{
  _type,
  "playbackId": @.asset->playbackId,
}`;

export const projectQuery = `{
  ...,
  "slug": slug.current,
  "tags": tags[]->{
    ...,
    "slug": slug.current
  },
  "client": client->{
    ...,
    logo ${imageQuery},
    logoList ${imageQuery}
  },
  "preview": preview{
    ...,
    image ${imageQuery},
    video ${videoQuery}
  },
  "cover": cover{
    ...,
    image ${imageQuery},
    video ${videoQuery}
  },
  "content": content[]{
    ...,
    _type == 'image' => {
      _key,
      "type": 'image',
      "url": @.asset->url,
      "width": @.asset->metadata.dimensions.width,
      "height": @.asset->metadata.dimensions.height
    },
    _type == 'imageBlock' => {
      _key,
      image ${imageQuery}
    },
    _type == 'mux.video' => {
      _key,
      "type": 'mux',
      "playbackId": @.asset->playbackId
    },
  }
}`;
