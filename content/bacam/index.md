<!--
title: Bay Area Cultural Asset Map
description: Arts fundraising intelligence for the Hewlett Foundation
keywords: [maps, design, cartography, census, geodata]
publish_date: 2010-02-02
kind: project
-->

Fractured Atlas, a national non-profit arts organization, was awarded a $350,000 contract
from The William and Flora Hewlett Foundation to develop the Bay Area Cultural Asset Map (BACAM), a collection of web applications designed to aggregate, analyze and publicize data on the Bay Area cultural sector.

BACAM was built to enable the cultural sector, funding community, policymakers and the
general public to easily see who is making art, who is engaging with it, where is it happening, and
how is it being funded.

{% for photo in page.data.photos %}
  <figure>
    <a href="{{ photo.sizes.original.source | default: photo.url }}" title={{photo.title}}>
      <img src="{{photo.sizes.large.source}}" alt="{{photo.title}}" />
    </a>
    <figcaption>{{photo.title}}</figcaption>
  </figure>
{% endfor %}
