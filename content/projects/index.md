<!--
title: Projects
description: Things I've built for work and play. Some are still alive, and others have succumbed to the sands of time.
kind: section
-->

<ul class="chronological-list project-list">
  {% for page in projectPages %}
      <li class="chronological-item project-item">
        <a href="{{ page.href }}" class="project-thumbnail">
          {% if page.images.thumbnail %}
            <img src="{{ page.images.thumbnail.href }}" alt="{{ page.title }}" />
          {% else %}
            <div class="project-thumbnail-placeholder"></div>
          {% endif %}
        </a>
        <div class="project-content">
          <a class="chronological-link" href="{{ page.href }}">{{ page.title }}</a>
          <div class="chronological-description">{{ page.description }}</div>
          <span class="chronological-date" data-date="{{ page.publish_date }}" data-format="%Y %b %d">{{ page.publish_date }}</span>
        </div>
      </li>
  {% endfor %}
</ul>