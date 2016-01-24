(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var x;
var y;
var l = [];
var r = [];
var s = [0.5, 1, 2];

function setup(e) {
  var layer0 = document.getElementById('layer0');
  var layer1 = document.getElementById('layer1');
  var layer2 = document.getElementById('layer2');
};

document.onmousemove = function (e) {
  x = e.x;
  y = e.y;

  l[0] = x * s[0];
  l[1] = x * s[1];
  l[2] = x * s[2];

  r[0] = y * s[0];
  r[1] = y * s[1];
  r[2] = y * s[2];

  layer0.style.backgroundPosition = '' + l[0] + 'px ' + r[0] + 'px';
  layer1.style.backgroundPosition = '' + l[1] + 'px ' + r[1] + 'px';
  layer2.style.backgroundPosition = '' + l[2] + 'px ' + r[2] + 'px';
};

},{}]},{},[1]);
