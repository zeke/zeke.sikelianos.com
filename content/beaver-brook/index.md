<!--
title: Beaver Brook
location: Port Jervis, NY
description: A building school in Upstate New York
website: http://beaverbrook.com/
publish_date: 2013-08-26
kind: project
-->


Beaver Brook is an architectural design and building school in the woods of upstate New York. I was a student in its inaugural year. Our ten-person group built a sauna.

{% for photo in page.data.photos %}
  <figure>
    <a href="{{ photo.sizes.original.source | default: photo.url }}" title={{photo.title}}>
      <img src="{{photo.sizes.large.source}}" alt="{{photo.title}}" />
    </a>
    <figcaption>{{photo.title}}</figcaption>
  </figure>
{% endfor %}

<figure>
  <a href="http://beaver.zeke.sikelianos.com/">
    <img src="/beaver-brook/sauna.jpg" alt="Beaver Brook Sauna" />
  </a>
  <figcaption>The Completed Sauna</figcaption>
</figure>

## See Also

- [My application to Beaver Brook](http://beaver.zeke.sikelianos.com)
- [The Beaver Brook website](http://beaverbrook.com)
- [All my photos on Flickr](https://www.flickr.com/photos/sikelianos/collections/72157635269715529/)
