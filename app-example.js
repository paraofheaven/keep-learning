/**
 * app.js
 *
 * Copyright 2016 www.dfyoo.com
 *
 * @description
 * @author wangjinlong@tuniu.com
 * @create 2016-02-19
 */

'use strict';

// Module dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const compression = require('compression');
const Loader = require('loader');
const _ = require('lodash');
const loadRouter = require('express-load-router');
const staticServer = require('@dfyoo/static');
const MemcachedStore = require('connect-memcached')(session);

const config = require('./app/config/config');
global.config = config;
const base = require('./app/lib/base');
const routes = require('./app/routes/routes');

const app = express();

// production
process.env.NODE_ENV = 'production';

// Middleware
app.use(compression());
app.use(bodyParser.json({
  limit: '10mb',
}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '10mb',
}));

app.use(cookieParser('tda-crm'));
app.use(session({
  key: 'distribute-crm',
  secret: 'tda-crm',
  store: new MemcachedStore({
    hosts: [config.memcached.url],
  }),
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
}));

app.use(staticServer(path.join(__dirname, 'public')));
app.use(favicon(`${__dirname}/public/img/favicon.ico`));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// 设置默认 layout
app.locals._layoutFile = 'layouts/layout.html';

// 公用函数：检查用户是否有按钮权限


_.extend(app.locals, {
    config: config,
    Loader: Loader,
    checkBtn: function(code, allButtons, buttons){
        allButtons = allButtons || [];
        buttons = buttons || [];
        return allButtons.indexOf(code) == -1 || buttons.indexOf(code) != -1;
    }
});

// Routes
routes(app);
loadRouter(app, path.join(__dirname, 'app/controllers'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if(err.status == 404){
        return res.render('404');
    }
    res.render('error', {
        message: err.stack,
        error: err
    });
});
app.set('port', config.port);

app.listen(app.get('port'), () => {
  console.log('' +
    '███╗  █████╗█╗  █╗ ███╗  ███╗        ███╗ ████╗ █╗  █╗\n' +
    '█╔═█╗ █╔═══╝█║  █║█╬══█╗█╬══█╗      █╬══█╗█╔══█╗██╗██║\n' +
    '█║ ╚█╗█║    ╚█╗█╬╝█║  █║█║  █║      █║  ╚╝█║  █║█╔█╬█║\n' +
    '█║  █║███╗   ╚█╬╝ █║  █║█║  █║      █║    ████╬╝█║╚╝█║\n' +
    '█║  █║█╔═╝    █║  █║  █║█║  █║      █║    █╔█╔╝ █║  █║\n' +
    '█║ █╬╝█║      █║  █║  █║█║  █║      █║  █╗█║╚█╗ █║  █║\n' +
    '███╬╝ █║      █║  ╚███╬╝╚███╬╝      ╚███╬╝█║ ╚█╗█║  █║\n' +
    '╚══╝  ╚╝      ╚╝   ╚══╝  ╚══╝        ╚══╝ ╚╝  ╚╝╚╝  ╚╝' +
    '');
  console.log('Dfyoo(http://www.dfyoo.com) CRM started, enjoy it!');
});
