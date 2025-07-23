<!--
title: Zeke Sikelianos
description: designer, natural language programmer, educator
noIndex: true
-->

<div class="main-column">

  <ul class="cards">
    {% for page in pages %}
      {% unless page.noIndex %}
        <li class="card">
          <div class="card-inner">
            <a class="card-thumbnail" href="{{ page.href }}">
              <img src="{{ page.images.thumbnail.href }}">
            </a>
            <div class="card-bottom">
              <div class="card-details">
                <a class="card-details-title" href="{{ page.href }}">{{ page.title }}</a>
                <div class="card-details-description">{{ page.description }}</div>
              </div>
            </div>
          </div>
        </li>
      {% endunless %}
    {% endfor %}
  </ul>

</div>
