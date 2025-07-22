<!--
title: Zeke Sikelianos
description: visual designer, natural language programmer, educator
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

  <h2>Projects</h2>
  <ul class="chronological-list">
    {% for page in projectPages %}
        <li class="chronological-item">
          <span class="chronological-date" data-date="{{ page.publish_date }}" data-format="%Y %b %d">{{ page.publish_date }}</span>
          <a class="chronological-link" href="{{ page.href }}">{{ page.title }}</a>
          <div class="chronological-description">{{ page.description }}</div>
        </li>
    {% endfor %}
  </ul>

  <h2>Talks</h2>
  <ul class="chronological-list">
    {% for talk in talks %}
      <li class="chronological-item">
        <span class="chronological-date" data-date="{{ talk.publish_date }}" data-format="%Y %b %d">{{ talk.publish_date }}</span>
        <a class="chronological-link" href="{{ talk.href }}">{{ talk.title }}{% if talk.venue %} ({{ talk.venue }}){% endif %}</a>
      </li>
    {% endfor %}
  </ul>

## Posts

<ul class="chronological-list">
  {% for post in posts %}
    <li class="chronological-item">
      <span class="chronological-date" data-date="{{ post.publish_date }}" data-format="%Y %b %d">{{ post.publish_date }}</span>
      <a class="chronological-link" href="{{ post.href }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

</div>
