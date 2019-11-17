<!--
title: Portfolio
description: A scrapbook of design ephemera, from 2001 to present day
-->

<div class="column-3">
  {% for photo in page.data.flickr_photos %}
    <a class="portfolio-piece" href="{{photo.url}}" title={{photo.title}}>
      <div class="aspect-ratio-shim" style="padding-top:{{photo.heightAsPercentageOfWidth}}%"></div>
      <img class="portfolio-piece-image" src="{{photo.sizes.medium.source}}" alt="{{photo.title}}" />
    </a>
  {% endfor %}
</div>