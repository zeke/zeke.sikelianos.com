<!--
title: Melitsa Sikelianos
description: Collected works of my late aunt
keywords: [painting, color, family, art]
publish_date: 2011-08-29
-->

{% for photo in page.data.flickr_photos %}
  <figure>
    <a href="{{photo.url}}">
      <img src="{{photo.sizes.large.source}}">
    </a>
  </figure>
{% endfor %}
