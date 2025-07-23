<!--
title: Posts
description: Words about programming, design, art, and other things.
kind: section
-->

<ul class="chronological-list">
  {% for post in posts %}
    <li class="chronological-item">
      <span class="chronological-date" data-date="{{ post.publish_date }}" data-format="%Y %b %d">{{ post.publish_date }}</span>
      <a class="chronological-link" href="{{ post.href }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>