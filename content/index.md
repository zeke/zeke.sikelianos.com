<!--
title: Zeke Sikelianos
description: Designer, Programmer, Educator
noIndex: true
-->

<div class="main-column">
  <ul class="cards">
    {% for page in pages %}
      {% unless page.noIndex %}
        <li class="card">
          <div class="card-inner">
            <a class="card-thumbnail" href="{{ page.href }}">
              <img src="{{ page.images.thumbnail.href }}">
            </a>
            <div class="card-bottom">
              <div class="card-details">
                <a class="card-details-title" href="{{ page.href }}">{{ page.title }}</a>
                <div class="card-details-description">{{ page.description }}</div>
              </div>
            </div>
          </div>
        </li>
      {% endunless %}
    {% endfor %}
  </ul>

  <h2>Projects</h2>
  <ul class="chronological-list">
    {% for page in projectPages %}
        <li class="chronological-item">
          <span class="chronological-date" data-date="{{ page.publish_date }}" data-format="%Y %b %d">{{ page.publish_date }}</span>
          <a class="chronological-link" href="{{ page.href }}">{{ page.title }}</a>
          <div class="chronological-description">{{ page.description }}</div>
        </li>
    {% endfor %}
  </ul>

  <h2>Talks</h2>
  <ul class="chronological-list">
    {% for talk in talks %}
      <li class="chronological-item">
        <span class="chronological-date" data-date="{{ talk.publish_date }}" data-format="%Y %b %d">{{ talk.publish_date }}</span>
        <a class="chronological-link" href="{{ talk.href }}">{{ talk.title }}</a>
        <div class="chronological-description">{{ talk.description }}</div>
      </li>
    {% endfor %}
  </ul>

## Posts

- [Introducing LoRA: A faster way to fine-tune Stable Diffusion](https://replicate.com/blog/lora-faster-fine-tuning-of-stable-diffusion)
- [Train and deploy a DreamBooth model on Replicate](https://replicate.com/blog/dreambooth-api)
- [Run Stable Diffusion with an API](https://replicate.com/blog/run-stable-diffusion-with-an-api)
- [How we open sourced docs.github.com](https://github.blog/2020-10-14-how-we-open-sourced-docs-github-com/) (2020)
- [Easier AutoUpdating for Open-Source Apps](https://www.electronjs.org/blog/autoupdating-electron-apps) (2018)
- [Functional programming with lodash.chain](https://zeke.sikelianos.com/chain/) (2017)
- [Electron's New Internationalized Website](https://www.electronjs.org/blog/new-website) (2017)
- [Announcing TypeScript support in Electron](https://www.electronjs.org/blog/typescript) (2017)
- [Electron Simple Samples](https://www.electronjs.org/blog/simple-samples) (2017)
- [Electron Userland](https://www.electronjs.org/blog/userland) (2016)
- [Electron's API Docs as Structured Data](https://www.electronjs.org/blog/api-docs-json-schema) (2016)
- [npm install electron](https://www.electronjs.org/blog/npm-install-electron) (2016)
- [The Sweet Sensation of Automation](https://zeke.sikelianos.com/npm-and-github-automation-with-heroku/)
- [CSS from the future](https://zeke.sikelianos.com/css-from-the-future/) (2016)
- [What's new in Electron 0.37](https://www.electronjs.org/blog/electron-37) (2016)
- [nicely presented markup](http://blog.npmjs.org/post/109508231330/nicely-presented-markup) (2015)
- [npm has a new website](http://blog.npmjs.org/post/104856015780/npm-has-a-new-website) (2014)
- [Twenty Years with JavaScript](http://zeke.sikelianos.com/posts/twenty-years-with-javascript) (2014)
- [The Most Popular npm Packages on Heroku](https://github.com/zeke/popular-npm-packages-on-heroku/blob/master/blog-post.md) (2014)
- [10 Habits of a Happy Node Hacker](https://blog.heroku.com/archives/2014/3/11/node-habits) (2014)
- [Announcing a new and improved Node.js Buildpack](https://blog.heroku.com/archives/2013/12/10/new-node-buildpack) (2014)
- [Introducing Heroku's Europe Region](https://blog.heroku.com/archives/2013/4/24/europe-region) (2013)
- [Presenting the New Heroku Add-ons Site](https://blog.heroku.com/archives/2012/12/4/new-addons-site) (2012)

## Apps

- [Scribble Diffusion](https://scribblediffusion.com)
- [TileMaker](https://tilemaker.app)
- [Paint by Text](https://paintbytext.chat)
- [Inpainter](https://inpainter.vercel.app)

</div>
