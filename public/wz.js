/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.10
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.meta.demos\packages\wizzi-heroku\.wizzi\public\wz.js.ittf
*/
'use strict';
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    ;
}
(function() {
    var wz = window.wz = {};
    var rclass = /[\n\t\r]/g;
    var rnotwhite = (/\S+/g);
    class wz_EventTarget {
        constructor() {
            this.handlers = {};
        }
        __is_Event(name) {
            return Array.isArray(this.events) == false || this.events.indexOf(name) > -1;
        }
        emit(name) {
            var args = [].slice.call(arguments, 1);
            // log 'wz_EventTarget.emit.args', arguments, args
            if (this.__is_Event(name)) {
                if (this.handlers[name] instanceof Array) {
                    var i, i_items=this.handlers[name], i_len=this.handlers[name].length, handle;
                    for (i=0; i<i_len; i++) {
                        handle = this.handlers[name][i];
                        // log 'handle.context', handle.context
                        handle.callback.apply(handle.context, args);
                    }
                }
            }
            else {
                throw new Error(name + ' event cannot be found on TreeView.');
            }
        }
        on(name, callback, scope) {
            // log 'EventTarget.on.name,scope', name, scope
            if (this.__is_Event(name)) {
                if (!this.handlers[name]) {
                    this.handlers[name] = [];
                }
                this.handlers[name].push({
                    callback: callback, 
                    context: scope
                 })
            }
            else {
                throw new Error(name + ' is not supported by TreeView.');
            }
        }
        off(name, callback) {
            var index,
                found = false;
            if (this.handlers[name] instanceof Array) {
                this.handlers[name].forEach(function(handle, i) {
                    index = i;
                    if (handle.callback === callback && !found) {
                        found = true;
                    }
                })
                if (found) {
                    this.handlers[name].splice(index, 1);
                }
            }
        }
    }
    wz.EventTarget = wz_EventTarget;
    class wz_global  extends  wz.EventTarget {
        constructor() {
            super();
        }
    }
    wz.global = new wz_global();
    (function() {
        if (document.addEventListener) {
            window.addEvent = function(elem, type, handler, useCapture) {
                elem.addEventListener(type, handler, !(!(useCapture)));
                return handler;
            }
            ;
            window.removeEvent = function(elem, type, handler, useCapture) {
                elem.removeEventListener(type, handler, !(!(useCapture)));
                return true;
            }
            ;
        }
        else if (document.attachEvent) {
            window.addEvent = function(elem, type, handler) {
                type = ("on" + type);
                var boundedHandler = function() {
                    return handler.apply(elem, arguments);
                };
                elem.attachEvent(type, boundedHandler);
                return boundedHandler;
            }
            ;
            window.removeEvent = function(elem, type, handler) {
                type = ("on" + type);
                elem.detachEvent(type, handler);
                return true;
            }
            ;
        }
    })();
    wz.isString = function(test) {
        return test !== null && typeof(test) === 'string';
    }
    ;
    wz.isEmpty = function(test) {
        return wz.isString(test) == false || test.length == 0;
    }
    ;
    wz.isObject = function(test) {
        if (test === null || typeof(test) === 'undefined') {
            return false;
        }
        return {}.toString.call(test) === '[object Object]';
    }
    ;
    wz.isArray = function(test) {
        if (test === null || typeof(test) === 'undefined') {
            return false;
        }
        if (Array.isArray) {
            return Array.isArray(test);
        }
        return {}.toString.call(test) === '[object Array]';
    }
    ;
    wz.clone = function(obj) {
        if (wz.isArray(obj)) {
            var ret = [];
            var i, i_items=obj, i_len=obj.length, item;
            for (i=0; i<i_len; i++) {
                item = obj[i];
                var value = clone(item);
                if (value !== null) {
                    ret.push(value);
                }
            }
            return ret;
        }
        else if (wz.isObject(obj)) {
            var ret = {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    ret[prop] = clone(obj[prop]);
                }
            }
            return ret;
        }
        else {
            return obj;
        }
    }
    ;
    wz.replace = function(text, find, replace) {
        if (wz.isEmpty(text)) {
            return text;
        }
        return text.replace(new RegExp(wz.escapeRegExp(find), 'g'), replace);
    }
    ;
    wz.escapeRegExp = function(text) {
        if (wz.isEmpty(text)) {
            return text;
        }
        return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    ;
    wz.element = function(element) {
        if (typeof element === 'string') {
            var e = document.querySelector(element);
            if (!e) {
                try {
                    e = document.querySelector("#" + element);
                } 
                catch (ex) {
                    return null;
                } 
            }
            return e;
        }
        else {
            return element;
        }
    }
    ;
    wz.hide = function(element) {
        var e = wz.element(element);
        e.style.display = 'none';
    }
    ;
    wz.show = function(element) {
        var e = wz.element(element);
        e.style.display = 'block';
    }
    ;
    wz.hasClass = function(element, selector) {
        var e = wz.element(element);
        if ((" " + e.className + " ").replace(rclass, " ").indexOf(" " + selector + " ") > -1) {
            return true;
        }
        return false;
    }
    ;
    wz.addClass = function(element, value, options) {
        var e = wz.element(element);
        var classes, cur, finalValue;
        if (options && options.removeOnClass) {
            var elements = document.getElementsByClassName(options.removeOnClass);
            Array.from(elements).forEach(function(element) {
                wz.removeClass(element, value);
            })
        }
        if (value && typeof value === "string") {
            classes = ( value || "" ).match( rnotwhite ) || [];
            if (!e.className && classes.length === 1) {
                e.className = value;
            }
            else {
                cur = " " + e.className + " ";
                var i, i_items=classes, i_len=classes.length, clazz;
                for (i=0; i<i_len; i++) {
                    clazz = classes[i];
                    if (cur.indexOf( " " + clazz + " " ) < 0) {
                        cur += clazz + " ";
                    }
                }
                finalValue = cur.trim();
                if (e.className !== finalValue) {
                    e.className = finalValue;
                }
            }
        }
    }
    ;
    wz.removeClass = function(element, value) {
        var e = wz.element(element);
        var classes, cur, finalValue;
        if (value && typeof value === "string") {
            classes = ( value || "" ).match( rnotwhite ) || [];
            cur = e.className ? ( " " + e.className + " " ).replace( rclass, " " ) : "";
            var i, i_items=classes, i_len=classes.length, clazz;
            for (i=0; i<i_len; i++) {
                clazz = classes[i];
                while (cur.indexOf( " " + clazz + " " ) >= 0) {
                    cur = cur.replace( " " + clazz + " ", " " );
                }
            }
            finalValue = cur.trim();
            if (e.className !== finalValue) {
                e.className = finalValue;
            }
        }
    }
    ;
    wz.toggleClass = function(element, value) {
        if (wz.hasClass(element, value)) {
            wz.removeClass(element, value);
        }
        else {
            wz.addClass(element, value);
        }
    }
    ;
    wz.attribute = function(element, name, value) {
        var e = wz.element(element);
        if (typeof value === 'undefined') {
            return e.getAttribute(name);
        }
        else {
            e.setAttribute(name, value);
        }
    }
    ;
    wz.style = function(element, name, value) {
        var e = wz.element(element);
        if (typeof value === 'undefined') {
            return e.style[name];
        }
        else {
            e.style[name] = value;
        }
    }
    ;
    wz.text = function(element, value) {
        var e = wz.element(element);
        if (typeof value === 'undefined') {
            return e.textContent;
        }
        else if (e.textContent !== value) {
            e.textContent = value;
        }
    }
    ;
    wz.html = function(element, html) {
        var saveElementForLog = element;
        if (typeof element === "string") {
            element = wz.element(element);
        }
        if (!element) {
            console.log('element', saveElementForLog, __filename);
            throw new Error('In wz.html the element parameter must be an html element or the id of an html element. Received: ' + saveElementForLog);
        }
        if (typeof html === 'undefined') {
            return element.innerHTML;
        }
        else {
            element.innerHTML = html;
        }
    }
    ;
    wz.htmlEscaped = function(element, html) {
        wz.html(element, wz.escapeHtml(html))
    }
    ;
    wz.replaceChildren = function(element, nodes) {
        var saveElementForLog = element;
        if (typeof element === "string") {
            element = wz.element(element);
        }
        if (!element) {
            console.log('element', saveElementForLog, __filename);
            throw new Error('In wz.replaceChildren the element parameter must be an html element or the id of an html element. Received: ' + saveElementForLog);
        }
        element.innerHTML = '';
        if (nodes.length) {
            var i, i_items=nodes, i_len=nodes.length, node;
            for (i=0; i<i_len; i++) {
                node = nodes[i];
                element.appendChild( node );
            }
        }
        else {
            element.appendChild( nodes );
        }
    }
    ;
    wz.value = function(element, value) {
        var saveElementForLog = element;
        if (typeof element === "string") {
            element = wz.element(element);
        }
        if (!element) {
            console.log('element', saveElementForLog, __filename);
            throw new Error('In wz.value the element parameter must be an html element or the id of an html element. Received: ' + saveElementForLog);
        }
        if (typeof value === 'undefined') {
            return element.value;
        }
        else if (element.value !== value) {
            element.value = value;
        }
    }
    ;
    wz.val = wz.value;
    wz.click = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'click', handler, useCapture)
    }
    ;
    wz.clickClass = function(classname, handler, useCapture) {
        var elements = document.getElementsByClassName(classname);
        Array.from(elements).forEach(function(element) {
            wz.click(element, handler, useCapture)
        })
    }
    ;
    wz.unclick = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'click', handler, useCapture)
    }
    ;
    wz.blur = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'blur', handler, useCapture)
    }
    ;
    wz.unblur = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'blur', handler, useCapture)
    }
    ;
    wz.change = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'change', handler, useCapture)
    }
    ;
    wz.unchange = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'change', handler, useCapture)
    }
    ;
    wz.contextmenu = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'contextmenu', handler, useCapture)
    }
    ;
    wz.uncontextmenu = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'contextmenu', handler, useCapture)
    }
    ;
    wz.keypress = function(element, handler, useCapture) {
        window.addEvent(wz.element(element), 'keypress', handler, useCapture)
    }
    ;
    wz.unkeypress = function(element, handler, useCapture) {
        window.removeEvent(wz.element(element), 'keypress', handler, useCapture)
    }
    ;
    wz.contentLoaded = function(fn) {
        // from Diego Perini https://raw.githubusercontent.com/dperini/ContentLoaded/master/src/contentloaded.js
        var done = false,
            top = true,
            doc = window.document,
            root = doc.documentElement,
            modern = doc.addEventListener,
            add = modern ? 'addEventListener' : 'attachEvent',
            rem = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',
            init = function(e) {
                if ((e.type == 'readystatechange') && (doc.readyState != 'complete')) {
                    return ;
                }
                (e.type == 'load' ? window : doc)[rem](pre + e.type, init, false)
                if (!(done) && (done = true)) {
                    fn.call(window, (e.type || e));
                }
            },
            poll = function() {
                try {
                    root.doScroll('left');
                } 
                catch (e) {
                    setTimeout(poll, 50);
                    return ;
                } 
                init('poll');
            };
        if (doc.readyState == 'complete') {
            fn.call(window, 'lazy');
        }
        else {
            if (!(modern) && root.doScroll) {
                try {
                    top = !(window.frameElement);
                } 
                catch (e) {
                } 
                if (top) {
                    poll();
                }
            }
            doc[add](pre + 'DOMContentLoaded', init, false)
            doc[add](pre + 'readystatechange', init, false)
            window[add](pre + 'load', init, false)
        }
    }
    ;
    wz.loaded = wz.contentLoaded;
    var entityMap = {
        '&': '&amp;', 
        '<': '&lt;', 
        '>': '&gt;', 
        '"': '&quot;', 
        "'": '&#39;', 
        '/': '&#x2F;', 
        '`': '&#x60;', 
        '=': '&#x3D;'
     };
    wz.escapeHtml = function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
                return entityMap[s];
            });
    }
    ;
    wz.unescapeHtml = function(string) {
        return wz.replace(wz.replace(wz.replace(string, '&lt;', '<'), '&gt;', '>'), '&amp;', '&');
    }
    ;
})();
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}
;
