'use strict';

// build sass
require('./scss/main.scss');

// require node modules
const path = require('path'); 

// require npm modules
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// require angualr modules
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');
const uiBootstrap = require('angular-ui-bootstrap');

// create angular module
const demoApp = angular.module('demoApp', [ngTouch, ngAnimate, uiRouter, uiBootstrap, ngFileUpload]);

// load config
let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( key => {
  demoApp.config(context(key));
});

// load view controllers
context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));   // name of file
  let module = context(key);                          // value of module.exports
  demoApp.controller(name, module);
});

// load services 
context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  demoApp.service(name, module);
});

// load components 
context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  demoApp.component(name, module);
});
