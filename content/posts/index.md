<!--
title: Posts
description: Words about programming, design, art, and other things.
kind: section
-->

<ul class="chronological-list">
  {% for post in posts %}
    <li class="chronological-item">
      <span class="chronological-date" data-date="{{ post.publish_date }}" data-format="%Y %b %d">{{ post.publish_date }}</span>
      <div class="chronological-content">
        <a class="chronological-link" href="{{ post.href }}">{{ post.title }}</a>
        <a class="domain-name" href="{{ post.href }}">
          {% if post.href contains 'http' %}
            {% assign url_parts = post.href | split: '//' %}
            {% assign domain_and_path = url_parts[1] | split: '/' %}
            {% assign domain = domain_and_path[0] %}
            {% if domain contains 'www.' %}
              {% assign domain_parts = domain | split: 'www.' %}
              {{ domain_parts[1] }}
            {% else %}
              {{ domain }}
            {% endif %}
          {% else %}
            zeke.sikelianos.com
          {% endif %}
        </a>
      </div>
    </li>
  {% endfor %}
</ul>
