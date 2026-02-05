<!--
title: The Corn Bed
description: A rejuvenating full-body experience
publish_date: 2010-05-15
kind: project
-->

As a kid growing up in New Mexico, I loved visiting the State Fair every year. My favorite attraction was the giant box of dried corn kernels in a quiet corner of the agricultural building, beside the prizing-winning fruits and vegetables. Everyone was welcome to climb into the box and roll around in the corn to their heart's content. It was the full-body equivalent of dipping your hands into the bulk beans at the grocery store.

Lying in corn is profoundly relaxing and energizing. As the corn shifts to form a mold around your body, it creates a sensation of weightlessness. It's like floating in water without the latent fear of drowning.

Even as a young adult, I would relax among the kernels as little children played all around me with toy dump trucks, shovels, and buckets. I vowed to one day make myself a personal corn bed, and in 2010 I finally got around to doing it.

{% for photo in page.data.photos %}
  <figure>
    <a href="{{ photo.sizes.original.source | default: photo.url }}" title={{photo.title}}>
      <img src="{{photo.sizes.large.source}}" alt="{{photo.title}}" />
    </a>
    <figcaption>{{photo.title}}</figcaption>
  </figure>
{% endfor %}

<figure>
  <a href="https://www.youtube.com/watch?v=mmllotLUU38">
    <img src="/corn-bed/amelie-sac-de-grain.jpg" alt="Amélie's fingers in the grain" />
  </a>
  <figcaption>Amélie knows what I'm talking about</figcaption>
</figure>
