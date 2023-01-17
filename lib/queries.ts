export const imageQuery = `{
  _type,
  "url": @.asset->url,
  "width": @.asset->metadata.dimensions.width,
  "height": @.asset->metadata.dimensions.height,
  "extension": @.asset->extension,
},`;

export const projectQuery = `{
  ...,
  "slug": slug.current,
  "tags": tags[]->{
    ...,
    "slug": slug.current
  },
  "client": client->{
    ...,
    logo ${imageQuery}
    logoList ${imageQuery}
  },
  "preview": preview{
    ...,
    "image": image.asset->{
      "type": 'image',
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    },
    "video": video.asset->{
      "type": 'mux',
      playbackId
    }
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
