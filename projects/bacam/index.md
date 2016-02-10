<!--
title: Bay Area Cultural Asset Map
description: Arts fundraising intelligence for the Hewlett Foundation
website: http://color-namer.org
keywords: [maps, design, cartography, census, geodata]
start: 2010-02-02
end: 2010-10-30
-->

Fractured Atlas, a national non-profit arts organization, was awarded a $350,000 contract
from The William and Flora Hewlett Foundation to develop the Bay Area Cultural Asset Map (BACAM), a collection of web applications designed to aggregate, analyze and publicize data on the Bay Area cultural sector.

BACAM was built to enable the cultural sector, funding community, policymakers and the
general public to easily see who is making art, who is engaging with it, where is it happening, and
how is it being funded.

{{#each page.data.flickr_photos}}
  <figure>
    <a href="{{url}}" title={{title}}>
      <img src="{{sizes.large.source}}" alt="{{title}}" />
    </a>
    <figcaption>{{title}}</figcaption>
  </figure>
{{/each}}
