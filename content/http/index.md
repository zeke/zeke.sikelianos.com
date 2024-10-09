<!--
title: Life in HTTP
description: Events in my life as HTTP status codes
website: http://zeke.sikelianos.com/http
keywords: [http, twitter, absurdism]
layout: false
publish_date: 2011-08-08
end: 2011-08-08
-->

<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <title>http response codes</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css" media="screen">
    body {
      font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
      font-size: 12px;
      padding: 20px;
    }
    body > p {
      margin: 80px 0 20px 0;
      padding: 0;
      color: black;
      color: #999;
    }
    body > p > a {
      margin: 0;
      padding: 0;
      background-color: red;
      color: white;
      text-decoration: none;
      padding: 3px 3px 3px 3px;
    }
    body > p > a > span {
      color: pink;
    }
    body > p > a:hover {
      background-color: black;
    }
    body > ul {
      display: block;
      float: none;
      clear: both;
      margin: 30px 0 0 0;
      padding: 0;
      list-style: none;
    }
    body > ul > li {
      margin: 0;
      padding: 0;
      display: block;
      float: left;
      border-top: 5px solid black;
      width: 240px;
      margin-right: 20px;
    }
    body > ul > li > ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    body > ul > li > ul > li {
      font-size: 10px;
      padding: 2px 0 2px 0;
    }
    body > ul > li > ul > li:first-child {
      padding: 3px 0 10px 0;
    }
  </style>
</head>

<body>
  <p>
    <a href="http://twitter.com/zeke_in_http"><span>@</span>zeke_in_http</a>
    status code reference
  </p>

  <ul>
    <li>
      <ul>
        <li>Informational</li>
        <li>100 Continue</li>
        <li>101 Switching Protocols</li>
        <li>102 Processing</li>
        <li>103 Early Hints</li>
      </ul>
    </li>
    <li>
      <ul>
        <li>Success</li>
        <li>200 OK</li>
        <li>201 Created</li>
        <li>202 Accepted</li>
        <li>203 Non-Authoritative Information</li>
        <li>204 No Content</li>
        <li>205 Reset Content</li>
        <li>206 Partial Content</li>
        <li>207 Multi-Status</li>
        <li>208 Already Reported</li>
        <li>226 IM Used</li>
      </ul>
    </li>
    <li>
      <ul>
        <li>Redirection</li>
        <li>300 Multiple Choices</li>
        <li>301 Moved Permanently</li>
        <li>302 Found</li>
        <li>303 See Other</li>
        <li>304 Not Modified</li>
        <li>305 Use Proxy</li>
        <li>306 (Unused)</li>
        <li>307 Temporary Redirect</li>
        <li>308 Permanent Redirect</li>
      </ul>
    </li>
    <li>
      <ul>
        <li>Client Error</li>
        <li>400 Bad Request</li>
        <li>401 Unauthorized</li>
        <li>402 Payment Required</li>
        <li>403 Forbidden</li>
        <li>404 Not Found</li>
        <li>405 Method Not Allowed</li>
        <li>406 Not Acceptable</li>
        <li>407 Proxy Authentication Required</li>
        <li>408 Request Timeout</li>
        <li>409 Conflict</li>
        <li>410 Gone</li>
        <li>411 Length Required</li>
        <li>412 Precondition Failed</li>
        <li>413 Payload Too Large</li>
        <li>414 URI Too Long</li>
        <li>415 Unsupported Media Type</li>
        <li>416 Range Not Satisfiable</li>
        <li>417 Expectation Failed</li>
        <li>418 I'm a teapot</li>
        <li>419 Page Expired</li>
        <li>420 Enhance Your Calm</li>
        <li>421 Misdirected Request</li>
        <li>422 Unprocessable Entity</li>
        <li>423 Locked</li>
        <li>424 Failed Dependency</li>
        <li>425 Too Early</li>
        <li>426 Upgrade Required</li>
        <li>428 Precondition Required</li>
        <li>429 Too Many Requests</li>
        <li>430 HTTP Status Code</li>
        <li>431 Request Headers Too Large</li>
        <li>440 Login Time-Out</li>
        <li>444 No Response</li>
        <li>449 Retry With</li>
        <li>450 Blocked by Parental Controls</li>
        <li>451 Unavailable For Legal Reasons</li>
        <li>460 Connection Closed Prematurely</li>
        <li>463 Too Many Forwarded IP Addresses</li>
        <li>464 Incompatible Protocol</li>
        <li>494 Request Header Too Large</li>
        <li>495 SSL Certificate Error</li>
        <li>496 SSL Certificate Required</li>
        <li>497 HTTP Request to HTTPS Port</li>
        <li>498 Invalid Token</li>
        <li>499 Token Required</li>
      </ul>
    </li>
    <li>
      <ul>
        <li>Server Error</li>
        <li>500 Internal Server Error</li>
        <li>501 Not Implemented</li>
        <li>502 Bad Gateway</li>
        <li>503 Service Unavailable</li>
        <li>504 Gateway Timeout</li>
        <li>505 HTTP Version Not Supported</li>
        <li>506 Variant Also Negotiates</li>
        <li>507 Insufficient Storage</li>
        <li>508 Loop Detected</li>
        <li>510 Not Extended</li>
        <li>511 Network Authentication Required</li>
        <li>530 Site is frozen</li>
        <li>509 Bandwidth Limit Exceeded</li>
        <li>520 Web Server Returning Unknown Error</li>
        <li>521 Web Server Is Down</li>
        <li>522 Connection Timed Out</li>
        <li>523 Origin Is Unreachable</li>
        <li>524 A Timeout Occurred</li>
        <li>525 SSL Handshake Failed</li>
        <li>526 Invalid SSL Certificate</li>
        <li>527 Railgun Listener to Origin</li>
        <li>529 The Service Is Overloaded</li>
        <li>561 Unauthorized</li>
        <li>598 Network Read Timeout Error</li>
        <li>599 Network Connect Timeout Error</li>
      </ul>
    </li>
  </ul>
</body>
