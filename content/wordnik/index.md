<!--
title: Wordnik
location: San Mateo, CA
description: A home for all the words
position: Neolexicographer
website: http://wordnik.com
keywords: [language, reference, english, ruby]
publish_date: 2011-01-01
-->

[Wordnik.com](http://wordnik.com) is an online English dictionary and language resource that provides dictionary and thesaurus content, some of it based on print dictionaries such as the Century Dictionary, the American Heritage Dictionary, WordNet, and the Collaborative International Dictionary of English. Wordnik has collected a corpus of billions of words which it uses to display example sentences, allowing it to provide information on a much larger set of words than a typical dictionary.

In 2011 and 2012, I designed, built, and maintained the high-traffic wordnik.com website, and also created [Swagger](/projects/swagger), a specification and tool for documenting, visualizing, and generating client SDKs for HTTP webservices.

{% for photo in page.data.photos %}
  <figure>
    <a href="{{ photo.sizes.original.source | default: photo.url }}" title={{photo.title}}>
      <img src="{{photo.sizes.large.source}}" alt="{{photo.title}}" />
    </a>
    <figcaption>{{photo.title}}</figcaption>
  </figure>
{% endfor %}
