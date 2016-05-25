<!--
title: my npm packages
description: A list of all the packages I've published to the npm registry
keywords: [npm, javascript, development, node, reference]
publish_date: 2016-05-23
-->

{{#each page.data.packages_by_zeke}}
  <p>
    <h3><a href="https://npmjs.org/{{name}}">{{name}}</a></h3>
    {{description}}
  </p>
{{/each}}
