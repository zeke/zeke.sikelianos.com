<!--
title: Talks
description: Conferences, interviews, podcasts, screencasts, etc.
kind: section
-->


<ul class="chronological-list">
  {% for talk in talks %}
    <li class="chronological-item">
      <span class="chronological-date" data-date="{{ talk.publish_date }}" data-format="%Y %b %d">{{ talk.publish_date }}</span>
      <a class="chronological-link" href="{{ talk.href }}">{{ talk.title }}{% if talk.venue %} ({{ talk.venue }}){% endif %}</a>
    </li>
  {% endfor %}
</ul>
