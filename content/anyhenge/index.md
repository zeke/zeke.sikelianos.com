<!--
title: Anyhenge
description: See what dates the sunset aligns with any street grid on Earth.
publish_date: 2026-03-13
kind: project
-->

<video autoplay muted loop playsinline>
  <source src="/anyhenge/anyhenge.mp4" type="video/mp4">
</video>

[Anyhenge](https://anyhenge.ziki.boo) is a website that shows the direction of sunset as a line through the center of a map. Pan to any street grid and drag the date slider to find when the sunset aligns with the streets.

Try it at [anyhenge.ziki.boo](https://anyhenge.ziki.boo)

## Background

There's a phenomenon called [Manhattanhenge](https://en.wikipedia.org/wiki/Manhattanhenge), named after Stonehenge, where the streets of Manhattan align with the setting sun on certain days of the year. It happens twice a year and draws huge crowds. The same phenomenon occurs on any east-west grid anywhere in the world — it just doesn't have a name.

Anyhenge lets you find that moment for any street, anywhere.

## How it works

A sunset azimuth line is drawn as an overlay through the center of the map. As you pan, the line recalculates based on the new latitude and longitude. Drag the date slider to find the day when the line aligns with the street grid you care about.

The stack is intentionally minimal: a single HTML file with no build step, using [Leaflet](https://leafletjs.com/) for the map and [SunCalc.js](https://github.com/mourner/suncalc) for sun position math. Deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

## Original prompt

Thanks to AI, this thing was pretty easy to build.

Here's the prompt I used to start building it with [OpenCode](https://opencode.ai):

> There's a phenomenon called Manhattanhenge, named after Stonehenge, where a certain street or set of streets in New York are aligned with the sun at sunset. This phenomenon occurs across many east-west streets around the world. And I would like to build a website that lets people explore the so-called henge times on various streets. To do this, I would like to use the following tools. SunCalc.js, which is a library for calculating the position of the sun at various times throughout the year and at different latitudes and longitudes. I would also like to use the Leaflet mapping library. And let's brainstorm some ways that this app could work. It could give the user two points to drag that are connected by a line, and it could be superimposed over a map to let people calculate a hinge date for any arbitrary human drawn line. Or the interface could be more like a timeline or a calendar of upcoming hinges of note in the area. The map should ask the user for their location and use the browser API to retrieve the location and center the map on their location with a nice dot marker. Let's do it all in a single page with CDN hosted libraries.

Source code: [github.com/zeke/anyhenge](https://github.com/zeke/anyhenge)
