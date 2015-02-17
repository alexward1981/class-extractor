/* global Modernizr:true */

// Namespacing
var Core = Core || {};

// 3rd party functions - ignored by JShint, use with caution and always cite sources
/* jshint ignore:start */

Core = {
    constructor: function () {
        // set global variables.
        this.bodyTag = $('body');
        this.viewportHeight = this.bodyTag.outerHeight(true);
        this.viewportWidth = this.bodyTag.outerWidth(true);
        this.devBar = $('<div class="js-devBar" />');
    },

    init: function () {
        var o = this;
        o.constructor();
        // First of all, let's make sure the stylesheet is loaded
        $('head').append('<link rel="stylesheet" href="http://localhost:3000/devTools.css" type="text/css" />');
        // Then add the developer bar
        o.addDeveloperBar();
        // Warn the user in the console that this is not meant for production
        console.warn('The developer bar is now active. It should not be allowed to run in a production environment');
    },

    addDeveloperBar: function () {
        var o = this,
            linkList = $('<ul />'),
            toolkit = ['responsiveLogger', 'outputModernizr', 'classExtractor', 'devBarConsole']; //This should be an array of objects so I can add friendly names
        o.devBar.prependTo('body');
        // Build the toolkit
        linkList.appendTo(o.devBar);
        for (var i = toolkit.length - 1; i >= 0; i--) {
            $('<li class="func_'+toolkit[i]+'">'+toolkit[i]+'</li>').appendTo(linkList);
        };
        o.initDevBar();
    },

    initDevBar: function () {
        var o = this;
        o.devBar.find('li').each( function() {
            var t = $(this),
                className = t.attr('class').replace('func_', '');
            t.bind('click', function (){
                eval('o.'+className+'()');
            })
        });
    },

    devBarConsole: function () {
        var o = this;
    },

    responsiveLogger: function(type) {
        //TODO: Add test to see if the function is already running

        // Function to output the screen width and/or height.
        var viewportWidth = null,
            viewportHeight = null,
            outputString = '',
            screenLogger = $('<div style="position:fixed;left:5px;top:5px;padding:10px;font-size:20px;background:rgba(0,0,0,0.8);color:#fff;z-index:10000;box-shadow:2px 2px 5px #000;"></div>').appendTo('body');
        setInterval(
            function() {
                viewportWidth = $('body').outerWidth(true);
                viewportHeight = $('body').outerHeight(true);
            switch (type) {
                case 'w' :
                    outputString = 'W: '+viewportWidth+'px';
                break;
                case 'h' :
                    outputString = 'H: '+viewportHeight+'px';
                break;
                default :
                case 'wh' :
                    outputString = 'W: '+viewportWidth+'px';
                    outputString += '&nbsp;&nbsp;|&nbsp;&nbsp;';
                    outputString += 'H: '+viewportHeight+'px';
                break;
            }
                screenLogger.html(outputString);
            }, 500
        );
    },

    outputModernizr: function() {
        //TODO: Add test to see if the function is already running

        // Function to display all the modernizr classes on the device.
        var tags = document.getElementsByTagName('html')[0].className,
            loc = alert("Please check the browser console for the results");

        //if (loc === 'console') {
            console.info(tags);
        // } else {
        //    screenLogger = $('<div style="position:relative;z-index:10000;padding:10px;font-size:16px;background:rgba(0,0,0,0.8);color:#fff;"></div>').prependTo('body').html(tags);
        // }
    },

    classExtractor: function() {

    }
};

$(document).ready( function() {
    Core.init();
});

