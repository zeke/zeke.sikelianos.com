<!--
title: Portugal
description: Trip planning map for Lisbon, May 2026.
publish_date: 2026-04-14
kind: project
-->

I'm heading to Lisbon in May 2026 for a Cloudflare work trip, with a few leisure days tacked on at the end. It's my first time in Portugal.

To plan the trip, I built an interactive map: [portugal.ziki.workers.dev](https://portugal.ziki.workers.dev)

## The map

The map is a single-page app with markers for everything I've been researching: neighborhoods, monuments, museums, viewpoints, fado venues, food spots, markets, beaches, and day trips. Each place has a description, category, and coordinates. Click a marker to see details and photos.

Some highlights:

- Alfama, the oldest neighborhood, with its narrow medieval streets and fado houses
- The miradouros (hilltop viewpoints) scattered across Lisbon's seven hills
- Belém, where the Tagus meets the Atlantic, home to Pastéis de Belém and the Jerónimos Monastery
- Sintra, a day trip to a hillside town with fairy-tale palaces and gardens
- LX Factory, an industrial complex turned creative market

## How it was built

I used [OpenCode](https://opencode.ai) to research places and build the app. The stack is [Hono](https://hono.dev/) on [Cloudflare Workers](https://workers.cloudflare.com/) with [Leaflet.js](https://leafletjs.com/) for the map. All the place data lives in a single TypeScript file (`src/data/places.ts`) with typed arrays for places, neighborhoods, and day trips.

Photos are fetched on demand from Google Images via [SerpAPI](https://serpapi.com/) and cached by the worker, so the map loads fast on repeat visits.

The whole thing is open source: [github.com/zeke/portugal](https://github.com/zeke/portugal)

## What's next

I'll update this page after the trip with photos and notes about what was worth visiting. For now, it's a planning tool.
