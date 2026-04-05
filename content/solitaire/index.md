<!--
title: Winning at Solitaire
description: Reliving moments of childhood boredom with the help of OpenCode
publish_date: 2026-04-03
tags: nostalgia, windows, animation
-->

*Confession: This post was written by AI*

I was nine years old when Microsoft shipped Solitaire with Windows 3.0 in 1990. I played it on 3.1, then 95, then 98, then XP. The game itself was fine — a decent way to kill time — but the real reward was winning. When you cleared the board, the cards came bouncing out of the four foundation piles, leaving trails across that green felt background. In an era when the internet was barely a thing and a computer's repertoire of delights was pretty limited, those bouncing cards felt like a standing ovation.

I wanted to see them again. So I rebuilt the animation as a web page:

<iframe src="https://solitaire.ziki.workers.dev" style="width:100%;aspect-ratio:16/9;border:2px solid #006600;border-radius:4px;"></iframe>

<small>Click to restart. [Open fullscreen](https://solitaire.ziki.workers.dev).</small>

## The intern, the artist, and the boss key

Windows Solitaire was written by Wes Cherry during his internship at Microsoft in the summer of 1988. He wasn't asked to build it. He just noticed that Windows didn't have any card games like the ones on his Mac, so he wrote one on his own time and dropped it on an internal file server called "Bogus Software" — a place where interns and engineers tossed side projects built while learning the Windows API.

A program manager for Windows 3.0 found it and decided to include it in the OS. Cherry's original version had a "boss key" that would instantly switch the screen to a fake Excel spreadsheet. Microsoft made him remove it.

Cherry never received any royalties. He's said he's fine with it. He now owns and operates a cidery on Vashon Island in Washington State.

The card faces were designed by [Susan Kare](https://kare.com), the legendary graphic designer behind the original Macintosh icons, the Chicago typeface, and the happy Mac. She drew them in 16 VGA colors at 71x96 pixels. Cherry's then-girlfriend Leslie Kooy designed some of the card backs — "the weirder ones," as she put it: the rainbow shell, haunted castle, beach scene, robot, and hidden ace.

Microsoft's stated goal for including Solitaire was "to soothe people intimidated by the operating system." In 1990, most people had never used a mouse before. Solitaire taught them to click, drag, and drop without reading a manual.

It worked. By 2020, the game still had 35 million active monthly players. In 2019, it was inducted into the World Video Game Hall of Fame.

## The bouncing cards

The win animation appeared in every version of Windows Solitaire from 3.0 through XP, and was removed in Vista. The algorithm is simple:

- One card launches at a time from the foundation piles at the top of the screen
- Each card has a constant horizontal velocity (randomly left or right) and an initial upward velocity
- Gravity pulls the card down each frame
- When the card hits the bottom of the screen, its vertical velocity is reversed and multiplied by about 0.85 — so it loses a little energy with each bounce
- The canvas is never cleared, so every position the card passes through leaves a permanent image behind

That last part is the whole trick. The trails aren't drawn deliberately. They're just the natural consequence of never erasing the previous frame. Each card paints over everything beneath it as it arcs and bounces across the screen, building up those layered cascading patterns.

## Extracting the cards from cards.dll

The original card artwork lives in a file called `cards.dll` that shipped with every copy of Windows from 3.0 through XP. It's a PE32 executable containing 52 card face bitmaps, 12 card back designs, and a few markers, all stored as Windows bitmap resources.

I wrote [a Python script](https://github.com/zeke/solitaire/blob/main/extract_cards.py) that parses the PE format, walks the resource table, extracts each DIB (Device Independent Bitmap), wraps it in a BMP header, and converts it to PNG using ImageMagick. Then it assembles all 52 card faces into a sprite sheet — 13 columns (Ace through King) by 4 rows (Clubs, Diamonds, Hearts, Spades).

The sprite sheet gets base64-encoded and embedded directly in the HTML, so the whole thing is a single self-contained file. No external dependencies, no build step, no framework. Just a canvas element and some physics.

## The prompt

This project started with a vague memory and a prompt:

> I used to play solitaire on Windows 95 or Windows XP or Windows 3.1. I can't remember which one it was, but when you won the game, the cards would come bouncing out of the four piles at the top of the screen. I want to recreate that visual effect of winning the game as a web page. I want you to do research to understand exactly what that effect looked like and how it worked and recreate it faithfully so that it looks just like it did on the old Windows system.

The source code is at [github.com/zeke/solitaire](https://github.com/zeke/solitaire).
