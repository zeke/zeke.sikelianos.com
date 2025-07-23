<!--
title: Projects
description: Things I've built for work and play. Some are still alive, and others have succumbed to the sands of time.
kind: section
-->

<ul class="chronological-list">
  {% for page in projectPages %}
      <li class="chronological-item">
        <span class="chronological-date" data-date="{{ page.publish_date }}" data-format="%Y %b %d">{{ page.publish_date }}</span>
        <a class="chronological-link" href="{{ page.href }}">{{ page.title }}</a>
        <div class="chronological-description">{{ page.description }}</div>
      </li>
  {% endfor %}
</ul>