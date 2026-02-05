<!--
title: Portfolio
description: A scrapbook of my design work from 2001 to present day
kind: project
publish_date: 2001-01-01
-->

<div class="column-3">
  {% for photo in page.data.photos %}
    <a class="portfolio-piece" href="{{ photo.sizes.original.source | default: photo.url }}" title={{photo.title}}>
      <div class="aspect-ratio-shim" style="padding-top:{{photo.heightAsPercentageOfWidth}}%"></div>
      <img class="portfolio-piece-image" src="{{photo.sizes.medium.source}}" alt="{{photo.title}}" />
    </a>
  {% endfor %}
</div>
