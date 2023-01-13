export const projectQuery = `{
  ...,
  "slug": slug.current,
  "tags": tags[]->{
    ...,
    "slug": slug.current
  },
  "client": client->{
    ...,
    "logo": logo.asset->{
      "type": 'image',
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height
    }
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
    _type == 'mux.video' => {
      _key,
      "type": 'mux',
      "playbackId": @.asset->playbackId
    },
  }
}`;