<!--
title: Melitsa Sikelianos
description: Collected works of my late aunt
keywords: [painting, color, family, art]
publish_date: 2011-08-29
kind: project
-->

{% for photo in page.data.photos %}
  <figure>
    <a href="{{ photo.sizes.original.source | default: photo.url }}">
      <img src="{{photo.sizes.large.source}}">
    </a>
  </figure>
{% endfor %}
