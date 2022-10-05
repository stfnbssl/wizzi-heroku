/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi\packages\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.13
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi-heroku\.wizzi\public\wz.js.ittf
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
            if (this.__is_Event(name)) {
                if (this.handlers[name] instanceof Array) {
                    var i, i_items=this.handlers[name], i_len=this.handlers[name].length, handle;
                    for (i=0; i<i_len; i++) {
                        handle = this.handlers[name][i];
                        handle.callback.apply(handle.context, args);
                    }
                }
            }
            else {
                throw new Error(name + ' event cannot be found on TreeView.');
            }
        }
        on(name, callback, scope) {
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
            console.log("[31m%s[0m", 'Error, element', saveElementForLog);
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
        
        // loog 'element', saveElementForLog
        if (!element) {
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
            console.log("[31m%s[0m", 'element', saveElementForLog);
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
var AceEditor_mimemap = {
    js: 'javascript'
 };
var AceEditor_defaults = {
    key: 'ace', 
    editorElementId: 'aceEditor', 
    mode: 'text', 
    theme: 'monokai', 
    fontSize: '11pt'
 };
class AceEditor {
    constructor(options) {
        //
        this.options = Object.assign(AceEditor_defaults, options)
        ;
        this.elementId = this.options.editorElementId;
        this.key = this.options.key;
        this.editor = null;
        this.events = {};
    }
    getValue() {
        if (this.editor) {
            return this.editor.getValue();
        }
    }
    setValue(value) {
        if (!this.editor) {
            this.initialize();
        }
        this.editor.setValue(value, 1);
    }
    setMime(value) {
        this.setMode(AceEditor_mimemap[value] || value)
    }
    setMode(value) {
        if (this.editor) {
            this.editor.getSession().setMode("ace/mode/" + value)
        }
    }
    setTheme(value) {
        if (this.editor) {
            this.editor.setTheme("ace/theme/" + value)
        }
    }
    readOnly(value) {
        if (typeof value === 'undefined') {
            return this.editor.getReadOnly();
        }
        else {
            this.editor.setReadOnly(value);
        }
    }
    onChange(handler) {
        this.onChange = handler;
    }
    initialize() {
        if (this.editor) {
            return ;
        }
        // loog 'AceEditor.initialize start on', this.options.editorElementId
        if (typeof ace === 'undefined' || !ace.edit) {
            throw new Error('wz.ace initialize methods requires the `ace` component. Check that the ace script has been included.');
        }
        this.element = wz.element('#' + this.options.editorElementId);
        if (!this.element) {
            throw new Error('wz.ace initialize methods requires an existing `options.editorElementId` : ' + this.options.editorElementId + ' html element.');
        }
        wz.style(this.element, 'width', this.options.width);
        wz.style(this.element, 'height', this.options.height);
        this.editor = ace.edit(this.options.editorElementId)
        ;
        this.editor.setOptions({
            fontSize: this.options.fontSize
         })
        this.setMode(this.options.mode)
        this.setTheme(this.options.theme)
        var that = this;
        this.editor.getSession().on('change', function() {
            that.fire('change', [
                that.getValue()
            ])
        })
        // loog 'AceEditor.initialize end'
    }
    on(name, handler) {
        if (this.events.hasOwnProperty(name)) {
            this.events[name].push(handler);
        }
        else {
            this.events[name] =	[handler];
        }
    }
    off(name, handler) {
        if (!this.events.hasOwnProperty(name)) {
            return ;
        }
        var index = this.events[name].indexOf(handler);
        if (index != -1) {
            this.events[name].splice(index, 1);
        }
    }
    fire(name, args) {
        if (!this.events.hasOwnProperty(name)) {
            return ;
        }
        if (!args || !args.length) {
            args = [];
        }
        var i, i_items=this.events[name], i_len=this.events[name].length, ev;
        for (i=0; i<i_len; i++) {
            ev = this.events[name][i];
            ev.apply(null, args);
        }
    }
}
// Credit to Douglas Crockford for this bind method​
if (!(Function.prototype.bind)) {
    Function.prototype.bind = function(oThis) {
        if (typeof (this) !== "function") {
            throw new TypeError ("Function.prototype.bind - what is trying to be bound is not callable");
        }
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {
            },
            fBound = function() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP ();
        ;
        return fBound;
    }
    ;
}
if (!window.wz) {
    window.wz = {};
}
class wz_ContextMenu {
    constructor(options) {
        options = options || {};
        this.menusContainerId = options.menusContainerId || 'wz-menus-container';
        this.onClose = () => {
        
        }
        ;
    }
    create(meta) {
        this.meta = meta;
        var menusContainer = wz.element('#' + this.menusContainerId);
        if (!menusContainer) {
            menusContainer = document.createElement('div');
            menusContainer.setAttribute('id', this.menusContainerId);
            document.body.appendChild(menusContainer);
        }
        this.menuDiv = document.createElement("div");
        ;
        this.menuDiv.setAttribute('id', meta.menu.id);
        this.menuDiv.setAttribute('class', 'wz-context-menu');
        var itemsDiv = this._createMenuItemsDiv(meta.menu);
        menusContainer.appendChild(this.menuDiv)
        this.menuDiv.appendChild(itemsDiv)
        this.menuDiv.onclick = (event) => {
        
            var command = event.target.dataset['command'];
            if (meta.onClick) {
                meta.onClick({
                    command: command, 
                    payload: this.payload, 
                    event: event
                 })
            }
        }
        ;
        wz.click(document, () => 
        
            this.handleClose()
        )
        wz.global.on('wz.contextMenu.clear', function(target) {
            if (target !== meta.menu.id) {
                this.handleClose();
            }
        }, this)
    }
    replace(menuMeta) {
        // _createMenuItemsDiv removes the previous div
        var itemsDiv = this._createMenuItemsDiv(menuMeta);
        this.menuDiv.appendChild(itemsDiv)
    }
    _createMenuItemsDiv(menuMeta) {
        var hb = new wzHtmlBuilder();
        var hUl = hb.add('ul', {});
        var i, i_items=menuMeta.items, i_len=menuMeta.items.length, item;
        for (i=0; i<i_len; i++) {
            item = menuMeta.items[i];
            var hLi = hUl.add('li', {});
            hLi.add('a', {
                href: '#', 
                ['data-command']: item.command || item.label, 
                _text: item.label
             })
        }
        if (this.menuItemsDiv) {
            this.menuItemsDiv.parentNode.removeChild(this.menuItemsDiv);
        }
        this.menuItemsDiv = document.createElement("div");
        ;
        wz.html(this.menuItemsDiv, hb.toHtml('\n'))
        return this.menuItemsDiv;
    }
    handleRightClick(evt, payload) {
        wz.global.emit('wz.contextMenu.clear', this.meta.menu.id)
        this.payload = payload;
        evt = (evt) ? evt : ((event) ? event : null);
        var posnX = (evt.pageX) ? evt.pageX : ((evt.offsetX) ? evt.offsetX + 10 : null);
        var posnY = (evt.pageY) ? evt.pageY : ((evt.offsetY) ? evt.offsetY + 10 : null);
        var menu = wz.element('#' + this.meta.menu.id);
        menu.style.left = posnX + 'px';
        menu.style.top = posnY + 'px';
        menu.style.display = 'block';
        if (typeof evt.preventDefault != "undefined") {
            evt.preventDefault();
        }
        else {
            evt.returnValue = false;
        }
    }
    handleClose() {
        wz.hide('#' + this.meta.menu.id)
        this.onClose();
    }
}
wz.ContextMenu = wz_ContextMenu;
(function() {
    if (!window.wz) {
        window.wz = {};
    }
    if (!window.wz.fetch) {
        window.wz.fetch = {};
    }
    wz.fetch.buildUrl = function(url, params) {
        var newUrl = url;
        if (params && params.length > 0) {
            var seen = false;
            var i, i_items=params, i_len=params.length, p;
            for (i=0; i<i_len; i++) {
                p = params[i];
                if (p.type == 'url') {
                    newUrl = wz.replace(newUrl, ':' + p.name, encodeURIComponent(p.value));
                }
                else {
                    if (!seen) {
                        newUrl = newUrl + '?' + p.name + '=' + encodeURIComponent(p.value);
                        seen = true;
                    }
                    else {
                        newUrl = newUrl + '&' + p.name + '=' + encodeURIComponent(p.value);
                    }
                }
            }
        }
        return newUrl;
    }
    ;
    wz.fetch.get = function(url, params, callback) {
        if (!callback) {
            callback = params;
            params = null;
        }
        var buildedUrl = wz.fetch.buildUrl(url, params);
        // loog 'wz.fetch.get.buildedUrl', buildedUrl
        fetch(buildedUrl, {
            method: 'GET', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
             }
         }).then((response) => {
        
            if (response.ok) {
                return response.json();
            }
            else {
                throw response.json();
            }
        }
        ).then(json => 
        
            // loog 'fetch.get', url, 'response', json
            callback(null, json)
        ).catch(err => 
        
            // loog 'fetch.get', url, 'err', Object.keys(err), err
            callback(err)
        )
    }
    ;
    wz.fetch.post = function(url, params, body, callback) {
        if (!callback) {
            callback = params;
            params = null;
        }
        var buildedUrl = wz.fetch.buildUrl(url, params);
        // loog 'wz.fetch.post.buildedUrl', buildedUrl
        fetch(buildedUrl, {
            method: 'POST', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
             }, 
            body: JSON.stringify(body)
         }).then((response) => {
        
            if (response.ok) {
                return response.json();
            }
            else {
                throw response.json();
            }
        }
        ).then(json => 
        
            // loog 'fetch.post', url, 'response', json
            callback(null, json)
        ).catch(err => 
        
            // loog 'fetch.post', url, 'err', Object.keys(err), err
            callback(err)
        )
    }
    ;
    wz.fetch.put = function(url, params, body, callback) {
        if (!callback) {
            callback = params;
            params = null;
        }
        var buildedUrl = wz.fetch.buildUrl(url, params);
        // loog 'wz.fetch.put.url', url
        // loog 'wz.fetch.put.params', params
        // loog 'wz.fetch.put.buildedUrl', buildedUrl
        fetch(buildedUrl, {
            method: 'PUT', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
             }, 
            body: JSON.stringify(body)
         }).then((response) => {
        
            if (response.ok) {
                return response.json();
            }
            else {
                throw response.json();
            }
        }
        ).then(json => 
        
            // loog 'fetch.post', url, 'response', json
            callback(null, json)
        ).catch(err => 
        
            // loog 'fetch.post', url, 'err', Object.keys(err), err
            callback(err)
        )
    }
    ;
})();
class wzForm {
    constructor(options) {
        options = options || {};
        this.formsContainerId = options.formsContainerId || 'wz-forms-container';
    }
    create(meta) {
        var formsContainer = wz.element('#' + this.formsContainerId);
        if (!formsContainer) {
            formsContainer = document.createElement('div');
            formsContainer.setAttribute('id', this.formsContainerId);
            document.body.appendChild(formsContainer);
        }
        var f = meta.form;
        var hb = new wzHtmlBuilder();
        var hRoot = hb.add('div', {
            id: f.id, 
            class: 'wz-dialog'
         });
        hRoot.add('h2', {
            _text: f.title
         })
        var hControls = hRoot.add('div', {
            class: 'wz-dialog-controls'
         });
        var i, i_items=f.controls, i_len=f.controls.length, ctrl;
        for (i=0; i<i_len; i++) {
            ctrl = f.controls[i];
            this.addControl(hControls, f, ctrl)
        }
        var hButtons = hRoot.add('div', {
            class: 'wz-dialog-buttons'
         });
        hButtons.add('button', {
            id: 'btn' + f.id + 'Cancel', 
            class: 'wz-dialog-button', 
            _text: 'Cancel'
         })
        hButtons.add('button', {
            id: 'btn' + f.id + 'Confirm', 
            class: 'wz-dialog-button', 
            _text: 'Confirm'
         })
        var formDiv = document.createElement("div");
        formsContainer.appendChild(formDiv)
        wz.html(formDiv, hb.toHtml('\n'))
        wz.click('#btn' + f.id + 'Cancel', function() {
            if (meta.onCancel) {
                meta.onCancel();
            }
        })
        wz.click('#btn' + f.id + 'Confirm', function() {
            if (meta.onConfirm) {
                var result = {};
                var i, i_items=f.controls, i_len=f.controls.length, ctrl;
                for (i=0; i<i_len; i++) {
                    ctrl = f.controls[i];
                    result[ctrl.id] = wz.val('#' + f.id + '_' + ctrl.id)
                    ;
                }
                alert('wzForm confirm ' + JSON.stringify(result, null, 2))
                meta.onConfirm(result)
            }
        })
        return formDiv;
    }
    addControl(node, form, meta) {
        var ctrl = node.add('div', {
            class: 'wz-dialog-control-h'
         });
        ctrl.add('label', {
            _text: meta.label
         })
        var field = ctrl.add('input', {
            type: 'text', 
            id: form.id + '_' + meta.id, 
            class: 'wz-dialog-text'
         });
        if (typeof meta.value !== 'undefined') {
            field.set('value', meta.value)
        }
        if (meta.disabled) {
            field.set('disabled')
        }
    }
}
function wzNodeRemove(item) {
    if (!item.parent) {
        throw new Error('wzNodeRemove. Missing item.parent of:' + item.tag + ',' + item.id);
    }
    var nodes = item.parent.elements;
    item.parent.elements = [];
    var i, i_items=nodes, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child !== item) {
            item.parent.elements.push(child);
        }
    }
}
function wzNodeReplace(item, newNode) {
    if (!item.parent) {
        throw new Error('wzNodeReplace. Missing item.parent of:' + item.tag + ',' + item.id);
    }
    var nodes = item.parent.elements;
    item.parent.elements = [];
    var i, i_items=nodes, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child !== item) {
            item.parent.elements.push(child);
        }
        else {
            item.parent.elements.push(newNode);
        }
    }
}
class wzHtmlNode {
    constructor(tag, attrs, textContent) {
        if (typeof textContent !== 'undefined') {
            this.textContent = textContent;
        }
        else {
            this.tag = tag;
            this.id = tag;
            this.parent = null;
            this.attributes = {};
            this.elements = [];
            if (attrs) {
                for (var k in attrs) {
                    if (attrs.hasOwnProperty(k)) {
                        if (k === 'id') {
                            this.id = attrs[k];
                        }
                        if (k === '_text') {
                            this.text(attrs[k]);
                        }
                        else {
                            this.attributes[k] = attrs[k];
                        }
                    }
                }
            }
        }
    }
    add(tag, attrs) {
        if (tag.tag) {
            tag.parent = this;
            this.elements.push(tag)
            return tag;
        }
        else {
            var node = new wzHtmlNode(tag, attrs);
            node.parent = this;
            this.elements.push(node)
            return node;
        }
    }
    set(name, value) {
        this.attributes[name] = value;
        return this;
    }
    text(content) {
        var node = new wzHtmlNode(null, null, content);
        this.elements.push(node)
        return this;
    }
    textReplace(content) {
        var done = false;
        var i, i_items=this.elements, i_len=this.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = this.elements[i];
            if (!done && typeof item.textContent !== 'undefined') {
                item.textContent = content;
                done = true;
            }
        }
        if (!done) {
            this.text(content);
        }
        return this;
    }
    get(elementId, attributeId) {
        if (this.id === elementId) {
            if (typeof attributeId !== 'undefined') {
                return this.attributes[attributeId];
            }
            else {
                return this;
            }
        }
        else {
            if (this.elements) {
                var found;
                var i, i_items=this.elements, i_len=this.elements.length, item;
                for (i=0; i<i_len; i++) {
                    item = this.elements[i];
                    found = item.get(elementId, attributeId);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        }
    }
    wrap(tag, attrs) {
        var wrapper = new wzHtmlNode(tag, attrs);
        wzNodeReplace(this, wrapper);
        wrapper.add(this)
        return wrapper;
    }
    unwrap() {
        // unwrap means : replace the parent with this
        wzNodeReplace(this.parent, this);
    }
    remove() {
        // unwrap means : replace the parent with this
        wzNodeRemove(this);
    }
    toHtml(indent) {
        indent = indent || 0;
        if (typeof this.textContent !== 'undefined') {
            return this.textContent;
        }
        else {
            var ret = [ new Array(indent).join(' ') ];
            ret.push('<' + this.tag)
            var i, i_items=Object.keys(this.attributes), i_len=Object.keys(this.attributes).length, name;
            for (i=0; i<i_len; i++) {
                name = Object.keys(this.attributes)[i];
                if (i > 0) {
                    ret.push('\n' + new Array(indent+2).join(' '))
                }
                var value = this.attributes[name];
                if (typeof value === 'undefined') {
                    ret.push(' ' + name)
                }
                else {
                    ret.push(' ' + name + '="' + value + '"')
                }
            }
            ret.push('>')
            var i, i_items=this.elements, i_len=this.elements.length, node;
            for (i=0; i<i_len; i++) {
                node = this.elements[i];
                ret.push(node.toHtml(indent + 1))
            }
            ret.push('</' + this.tag + '>')
            ret.push('\n');
            return ret.join('');
        }
    }
}
class wzHtmlBuilder {
    constructor(options) {
        options = options || {};
        this.elementId = options.id;
        this.elements = [];
        this.current = null;
    }
    prettyResult(elementId) {
        this.prettyResultId = elementId;
    }
    add(tag, attrs) {
        var node;
        if (this.current) {
            node = this.current.add(tag, attrs);
        }
        else {
            node = new wzHtmlNode(tag, attrs);
            node.parent = this;
            this.elements.push(node)
        }
        this.current = node;
        this.update();
        return node;
    }
    addTop(tag, attrs) {
        this.current = null;
        return this.add(tag, attrs);
    }
    set(attributeName, attributeValue) {
        this.current.set(attributeName, attributeValue);
        this.update();
        return this;
    }
    text(content) {
        this.current.text(content)
        this.update();
        return this;
    }
    textReplace(content) {
        this.current.textReplace(content)
        this.update();
        return this;
    }
    toHtml() {
        var ret = [];
        var i, i_items=this.elements, i_len=this.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = this.elements[i];
            ret.push(item.toHtml())
        }
        return ret.join('\n');
    }
    select(id) {
        var found;
        var i, i_items=this.elements, i_len=this.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = this.elements[i];
            found = item.get(id)
            ;
            // loog 'select.item', id, item.id, found
            if (found) {
                break;
            }
        }
        // loog 'select', id, found
        if (!found) {
            return false;
        }
        this.current = found;
        return true;
    }
    wrap(id, wrapperTag, wrapperId) {
        var found = this.select(id);
        if (!found) {
            throw new Error("wzHtmlBuilder can't wrap id=" + id + ". Not found.");
        }
        this.current = this.current.wrap(wrapperTag, wrapperId);
        ;
        this.update();
    }
    unwrap(id) {
        // unwrap means : replace the parent of id with id
        var found = this.select(id);
        if (!found) {
            throw new Error("wzHtmlBuilder can't unwrap id=" + id + ". Not found.");
        }
        this.current = this.current.unwrap();
        ;
        this.update();
    }
    remove(id) {
        var found = this.select(id);
        if (!found) {
            return ;
        }
        this.current.remove();
    }
    update() {
        if (this.elementId) {
            wz.html(wz.element('#' + this.elementId), this.toHtml())
        }
        if (this.prettyResultId) {
            wz.htmlEscaped(wz.element('#' + this.prettyResultId), this.toHtml())
        }
    }
}
class HttpRequest {
    constructor() {
        this.headers = [];
    }
    setAuthBasic(user, psw) {
        var credentials = 'username=' + user + '&password=' + psw;
        this.setHeader('Authorization', 'Basic ' + Base64.encode(credentials));
    }
    setHeader(name, value) {
        this.headers.push({ name: name, value: value });
    }
    send(args) {
        var timeout = (args.timeout || 6 * 60 * 60 * 1000),
            method = args.method,
            url = args.url,
            data = args.data,
            success = args.success,
            failure = args.failure,
            errorHandler = args.errorHandler,
            isGetRequest = method === "GET";
        var self = this;
        success = _.isFunction(success) ? success : function(data) { console.log(data) };
        failure = _.isFunction(failure) ? failure : function(data) { console.log(data) };
        errorHandler = _.isFunction(errorHandler) ? errorHandler : function(data) { console.log(data) };
        // loog 'sending ajax'
        $.ajax(
        // Let jquery turn data map into query string only on GET requests.
        {
            url: url, 
            type: method, 
            data: data, 
            timeout: timeout, 
            cache: false, 
            processData: isGetRequest, 
            beforeSend: function(xhr) {
                var i, i_items=self.headers, i_len=self.headers.length, h;
                for (i=0; i<i_len; i++) {
                    h = self.headers[i];
                    xhr.setRequestHeader(h.name, h.value);
                }
            }, 
            success: success, 
            failure: failure, 
            error: errorHandler, 
            dataType: 'json'
         })
    }
}
if (!window.wz) {
    window.wz = {};
}
wz.getBlobURL = function(code, type) {
    const blob = new Blob([
        code
    ], {
        type
     });
    return URL.createObjectURL(blob);
}
;
wz.getGeneratedPageURL = function(html, css, js) {
    const cssURL = css ? wz.getBlobURL(css, 'text/css') : null;
    const jsURL = js ? wz.getBlobURL(js, 'text/javascript') : null;
    const source = [
        '<html>', 
        '    <head>', 
        css ? '        <link rel="stylesheet" type="text/css" href="' + cssURL + '" />' : '', 
        js ? '         <script src="' + jsURL + '"><' + '/script>' : '', 
        '    </head>', 
        '    <body>' + html + '</body>', 
        '</html>'
    ].join('\n');
    return wz.getBlobURL(source, 'text/html');
}
;
class LocalStorage {
    constructor(keyprefix) {
        this.keyprefix = keyprefix;
    }
    k(key) {
        return this.keyprefix + '.' + key;
    }
    getAllKeys() {
        var ret = [];
        var lskeys = Object.keys(localStorage);
        var i, i_items=lskeys, i_len=lskeys.length, key;
        for (i=0; i<i_len; i++) {
            key = lskeys[i];
            if (key.startsWith(this.keyprefix + '.')) {
                ret.push(key.substring((this.keyprefix + '.').length));
            }
        }
        return ret;
    }
    get(key, defaultValue, setDefault) {
        key = this.k(key);
        var ret = localStorage.getItem(key);
        if (ret === null) {
            if (typeof defaultValue !== 'undefined') {
                ret = defaultValue;
                if (setDefault) {
                    localStorage[key] = defaultValue;
                }
            }
        }
        try {
            ret = JSON.parse(ret);
            return ret;
        } 
        catch (ex) {
        } 
        return ret;
    }
    set(key, value) {
        key = this.k(key);
        value = typeof value === 'undefined' ? null : value;
        if (value === null) {
            localStorage[key] = value;
        }
        else {
            localStorage[key] = JSON.stringify(value);
        }
        return value;
    }
    append(key, value) {
        key = this.k(key);
        var s = this.get(key, '', true);
        this.set(key, s + value);
    }
    replace(key, search, replace) {
        key = this.k(key);
        var value = this.get(key);
        if (typeof value === 'string') {
            this.set(key, value.replace(search, replace));
        }
    }
    remove(key) {
        key = this.k(key);
        localStorage.removeItem(key);
    }
    isTrue(key, value) {
        key = this.k(key);
        if (typeof value === 'undefined') {
            return this.get(key) === 'true';
        }
        else {
            this.set(key, value ? 'true' : 'false');
        }
    }
    float(key, value) {
        key = this.k(key);
        if (typeof value === 'undefined') {
            return parseFloat(this.get(key));
        }
        else {
            this.set(key, value);
        }
    }
    increment(key) {
        key = this.k(key);
        value = this.get(key, "0", true);
        value = parseFloat(value) + 1;
        this.set(key, value);
    }
    unique(collectionName, propertyName, baseValue) {
        var items = this.get(collectionName);
        var item = this._find(items, propertyName, baseValue);
        if (item === null) {
            return baseValue;
        }
        else {
            var n = 1;
            while (item !== null) {
                n++;
                item = this._find(items, propertyName, baseValue + n);
            }
            return baseValue + n;
        }
    }
    _find(collection, propertyName, value) {
        var i, i_items=collection, i_len=collection.length, item;
        for (i=0; i<i_len; i++) {
            item = collection[i];
            if (item[propertyName] === value) {
                return item;
            }
        }
        return null;
    }
}
(function() {
    if (!window.wz) {
        window.wz = {};
    }
    wz.debounce = function(fn, delay) {
        var timer = null;
        return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay)
                ;
            };
    }
    ;
})();
if (!window.wz) {
    window.wz = {};
}
wz.node = {};
wz.node.remove = function(node) {
    if (!node.parent) {
        throw new Error('Node must have a parent');
    }
    if (!node.parent.children) {
        throw new Error('Node parent must must have a children property');
    }
    var index = node.parent.children.indexOf(node);
    if (index < 0) {
        throw new Error('Node must be child of its parent property');
    }
    node.parent.children.splice(index, 1);
    return index;
}
;
wz.node.replace = function(node, newnode) {
    if (!node.parent) {
        throw new Error('Node must have a parent');
    }
    if (!node.parent.children) {
        throw new Error('Node parent must must have a children property');
    }
    var index = node.parent.children.indexOf(node);
    if (index < 0) {
        throw new Error('Node must be child of its parent property');
    }
    newnode.parent = node.parent;
    node.parent.children[index] = newnode();
}
;
(function() {
    if (!window.wz) {
        window.wz = {};
    }
    if (!window.wz.packi) {
        window.wz.packi = {
            apiUrl: "https://www.wizzihub.com/api/v1/packi", 
            webUrl: "https://www.wizzihub.com"
         };
    }
    wz.initPacki = function(options) {
        wz.packi = Object.assign({}, wz.packi, options)
        ;
    }
    ;
    wz.fileListToPacki = function(fileList, packiFiles) {
        if (!packiFiles) {
            packiFiles = {};
        }
        var i, i_items=fileList, i_len=fileList.length, file;
        for (i=0; i<i_len; i++) {
            file = fileList[i];
            if (Array.isArray(file)) {
                wz.fileListToPacki(file, packiFiles)
            }
            else {
                if (file.path) {
                    packiFiles[file.path] = {
                        type: file.type || 'CODE', 
                        contents: file.contents || ''
                     };
                }
                else {
                    packiFiles[file] = {
                        type: file.type || 'CODE', 
                        contents: ''
                     };
                }
            }
        }
        return packiFiles;
    }
    ;
    wz.addFileToPacki = function(packiFiles, fileOrPath, contents) {
        if (!packiFiles) {
            packiFiles = {};
        }
        if (fileOrPath) {
            if (fileOrPath.path && fileOrPath.contents) {
                packiFiles[fileOrPath.path] = {
                    type: fileOrPath.type || 'CODE', 
                    contents: fileOrPath.contents
                 };
            }
            else {
                packiFiles[fileOrPath] = {
                    type: 'CODE', 
                    contents: contents
                 };
            }
        }
        return packiFiles;
    }
    ;
    wz.removeFileFromPacki = function(packiFiles, fileOrPath) {
        if (!packiFiles) {
            return packiFiles;
        }
        if (fileOrPath) {
            if (fileOrPath.path) {
                delete packiFiles[fileOrPath.path]
            }
            else {
                delete packiFiles[fileOrPath]
            }
        }
        return packiFiles;
    }
    ;
    wz.uploadPackiItem = function(owner, name, schema, mainIttf, packiFiles, callback) {
        fetch(`${wz.packi.apiUrl}/${'proxy/packiitem'}`, {
            method: 'POST', 
            headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
             }, 
            body: JSON.stringify({
                owner, 
                name, 
                schema, 
                mainIttf, 
                packiFiles
             })
         }).then((response) => {
        
            if (response.ok) {
                return response.json();
            }
            else {
                throw response.json();
            }
        }
        ).then(json => 
        
            // loog 'uploadPackiItem.response', json
            callback(null, json)
        ).catch((err) => {
        
            console.log("[31m%s[0m", 'uploadPackiItem.err', Object.keys(err));
            callback(err)
        }
        )
    }
    ;
})();
(function() {
    if (!window.wz) {
        window.wz = {};
    }
    if (!window.wz.production) {
        window.wz.production = {
            apiUrl: "https://www.wizzihub.com/api/v1/production", 
            webUrl: "https://www.wizzihub.com"
         };
    }
    wz.initProduction = function(options) {
        wz.production = Object.assign({}, wz.production, options)
        ;
    }
    ;
    wz.production.fileListToPacki = function(fileList, packiFiles) {
        if (!packiFiles) {
            packiFiles = {};
        }
        var i, i_items=fileList, i_len=fileList.length, file;
        for (i=0; i<i_len; i++) {
            file = fileList[i];
            if (Array.isArray(file)) {
                wz.fileListToPacki(file, packiFiles)
            }
            else {
                if (file.path) {
                    packiFiles[file.path] = {
                        type: file.type || 'CODE', 
                        contents: file.contents || ''
                     };
                }
                else {
                    packiFiles[file] = {
                        type: file.type || 'CODE', 
                        contents: ''
                     };
                }
            }
        }
        return packiFiles;
    }
    ;
    wz.addFileToPacki = function(packiFiles, fileOrPath, contents) {
        if (!packiFiles) {
            packiFiles = {};
        }
        if (fileOrPath) {
            if (fileOrPath.path && fileOrPath.contents) {
                packiFiles[fileOrPath.path] = {
                    type: fileOrPath.type || 'CODE', 
                    contents: fileOrPath.contents
                 };
            }
            else {
                packiFiles[fileOrPath] = {
                    type: 'CODE', 
                    contents: contents
                 };
            }
        }
        return packiFiles;
    }
    ;
    wz.removeFileFromPacki = function(packiFiles, fileOrPath) {
        if (!packiFiles) {
            return packiFiles;
        }
        if (fileOrPath) {
            if (fileOrPath.path) {
                delete packiFiles[fileOrPath.path]
            }
            else {
                delete packiFiles[fileOrPath]
            }
        }
        return packiFiles;
    }
    ;
    wz.production.getList = function(kind, owner, callback) {
        wz.fetch.get(`${wz.production.apiUrl}/${kind}/${owner}`, callback)
    }
    ;
    wz.production.createItem = function(kind, owner, name, wizziSchema, mainIttf, packiFiles, callback) {
        // loog 'wz.production.createItem.mainIttf', mainIttf
        // loog 'wz.production.createItem.packiFiles', packiFiles
        wz.fetch.post(wz.production.apiUrl + '/' + kind + '/:owner/:name', [
            {
                type: 'url', 
                name: 'owner', 
                value: owner
             }, 
            {
                type: 'url', 
                name: 'name', 
                value: name
             }
        ], {
            wizziSchema, 
            mainIttf, 
            packiFiles
         }, callback)
    }
    ;
    wz.production.updateItem = function(kind, id, wizziSchema, mainIttf, packiFiles, callback) {
        wz.fetch.put(wz.production.apiUrl + '/' + kind + '/:id', [
            {
                type: 'url', 
                name: 'id', 
                value: id
             }
        ], {
            wizziSchema, 
            mainIttf, 
            packiFiles
         }, callback)
    }
    ;
})();

async function callApi(method, path, data) {
    const API_URL = 'https://www.wizzihub.com/api/v1';
    // loog 'callApi method', method, 'API_URL', API_URL, 'path', path, 'data', data
    return new Promise((resolve, reject) => 
        
            fetch(`${API_URL}/${path}`, {
                method, 
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json'
                 }, 
                body: JSON.stringify(data)
             }).then((response) => {
            
                if (response.ok) {
                    resolve(response.json())
                }
                else {
                    response.json().then(errorJson => 
                    
                        reject(errorJson)
                    )
                }
            }
            ).catch(err => 
            
                reject(err())
            )
        
        );
}
(function() {
    if (!window.wz) {
        window.wz = {};
    }
    if (!wz.isString) {
        throw new Error('wz/standalone require wz/core');
    }
    wz.canGen = function(schemaName, callback) {
        // TODO
        return callback(null, true);
    }
    ;
    //
    wz.gen = function(filePath, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        callApi('POST', 'productions/artifactFS/' + encodeURIComponent(filePath), options).then((result) => {
        
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            else {
                callback(null, result['x'].contents)
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
    wz.genFromText = function(ittfContent, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        var filePath = 'x.' + options.schema + '.ittf';
        var files = {
            ['x.' + options.schema + '.ittf']: {
                type: 'CODE', 
                contents: ittfContent
             }
         };
        callApi('POST', 'productions/artifact/' + encodeURIComponent(filePath), files).then((result) => {
        
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            else {
                callback(null, result.generatedArtifact.artifactContent)
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
    wz.genArtifact = function(filePath, packiFiles, callback) {
        callApi('POST', 'productions/artifact/' + encodeURIComponent(filePath), packiFiles).then((result) => {
        
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            else {
                return callback(null, result.generatedArtifact.artifactContent);
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
    wz.transformModel = function(filePath, transformationName, packiFiles, callback) {
        callApi('POST', 'productions/transform/' + encodeURIComponent(filePath) + '/' + encodeURIComponent(transformationName), packiFiles).then((result) => {
        
            // loog 'wz.transformModel', result
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            else {
                return callback(null, result.transformedModel);
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
    wz.mTreeBuildupScript = function(filePath, packiFiles, callback) {
        callApi('POST', 'productions/mtreescript/' + encodeURIComponent(filePath), packiFiles).then((result) => {
        
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            else {
                return callback(null, result.mTreeBuildupScript);
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
    wz.genWithRequest = function(request, callback) {
        callApi('POST', 'wizzi/productions/artifact', request).then((result) => {
        
            // loog 'result', result
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            else {
                return callback(null, result);
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
    wz.canWizzify = function(schemaName) {
        // TODO
        return true;
    }
    ;
    wz.wizzify = function(schemaName, snippet, callback) {
        var files = {
            ['x.' + schemaName]: {
                type: 'CODE', 
                contents: snippet
             }
         };
        callApi('POST', 'productions/wizzify', files).then((result) => {
        
            if (wz.isString(result)) {
                const json = JSON.parse(result);
                if (json.__is_error) {
                    return callback(json);
                }
                else {
                    throw new Error('Invalid result: ' + result);
                }
            }
            // loog 'wz.wizzify.json', json
            else {
                var json = result.packiResult;
                callback(null, json['x.' + schemaName + '.ittf'].contents)
            }
        }
        ).catch(err => 
        
            callback(err)
        )
    }
    ;
})();
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}
;
//
class EditorControl {
    constructor(props) {
        this.props = props;
        this.key = props.key;
        this.elementId = props.elementId;
        this.theme = props.theme || 'github';
        this.language = props.language || 'js';
        this.isSettingValue = false;
    }
    initialize() {
        if (this.editor) {
            return ;
        }
        this.editor = new AceEditor({
            key: this.key, 
            editorElementId: this.elementId, 
            width: '100%', 
            height: '100%'
         });
        ;
        this.editor.initialize();
        this.editor.setMime(this.language)
        this.editor.setTheme(this.theme)
        if (this.props.readOnly) {
            this.editor.readOnly(true)
        }
        this.editor.on('change', (value) => {
        
            if (this.isSettingValue == false) {
                glEventHub.emit('editvaluechanged', {
                    key: this.key, 
                    value: value, 
                    defer: true
                 })
            }
        }
        )
        glEventHub.on('seteditvalue', (data) => {
        
            // loog 'on seteditvalue', data
            var key = data.key;
            var value = data.value;
            if (key === this.key) {
                this.isSettingValue = true;
                this.value(value)
                this.isSettingValue = false;
            }
        }
        )
        // loog 'EditorControl initialized'
    }
    theme(value) {
        if (typeof value === 'undefined') {
            return this.theme;
        }
        else {
            this.editor.setTheme(value)
            this.theme = value;
        }
    }
    language(value) {
        if (typeof value === 'undefined') {
            return this.language;
        }
        else {
            this.editor.setMime(value)
            this.language = value;
        }
    }
    value(value) {
        if (this.editor) {
            if (typeof value === 'undefined') {
                return this.editor.getValue();
            }
            else {
                this.editor.setValue(value)
            }
        }
    }
}
var itemUtils = {};
itemUtils.cloneItem = function(item) {
    var cloned = {
        name: item.name, 
        basename: item.basename, 
        dirname: item.dirname, 
        path: item.path, 
        isFolder: item.isFolder, 
        schema: item.schema, 
        isIttfDocument: item.isIttfDocument, 
        isFragment: item.isFragment, 
        content: item.content, 
        children: [
            
        ]
     };
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        cloned.children.push(itemUtils.cloneItem(child))
    }
    return cloned;
}
;
itemUtils.setDirname = function(item, newDirname) {
    item.dirname = newDirname;
    item.path = newDirname + '/' + item.basename;
    if (item.children && item.children.length > 0) {
        var i, i_items=item.children, i_len=item.children.length, child;
        for (i=0; i<i_len; i++) {
            child = item.children[i];
            itemUtils.setDirname(child, item.path)
        }
    }
}
;
itemUtils.rename = function(item, newName) {
    var newItem = wz.fs.infoByPath(item.dirname + '/' + newName, item.isFolder);
    item.name = newItem.name;
    item.basename = newItem.basename;
    item.dirname = newItem.dirname;
    item.path = newItem.path;
    item.isFolder = newItem.isFolder;
    if (item.isFolder == false) {
        item.schema = newItem.schema;
        item.isIttfDocument = newItem.isIttfDocument;
        item.isFragment = newItem.isFragment;
    }
    // loog 'itemUtils.rename.renamed', item
}
;
//
class TreeNode {
    constructor(item, treeView) {
        this.item = item;
        this.treeView = treeView;
        this.parent = null;
        this.rendered = false;
        this.children = [];
        if (item.children && item.children.length > 0) {
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                this.addItem(child)
            }
        }
    }
    getRoot() {
        return this.parent ? this.parent.getRoot() : this;
    }
    getTreeview() {
        return this.getRoot().treeView;
    }
    addItem(item) {
        var node = new TreeNode(item);
        node.parent = this;
        this.children.push(node)
        if (this.rendered) {
            var childLeaf = node.render();
            if (!this.childrenEl) {
                this.childrenEl = document.createElement('div');
                this.childrenEl.setAttribute('class', 'tree-child-leaves');
                this.el.appendChild(this.childrenEl);
            }
            this.childrenEl.appendChild(childLeaf);
        }
        return node;
    }
    replace(populatedItem) {
        // populatedItem is the same object of item (the parent has not been changed)
        this.item = populatedItem;
        this.rendered = false;
        var i, i_items=populatedItem.children, i_len=populatedItem.children.length, child;
        for (i=0; i<i_len; i++) {
            child = populatedItem.children[i];
            this.addItem(child)
        }
        var oldEl = this.el;
        var newEl = this.render();
        oldEl.parentNode.replaceChild(newEl, oldEl);
    }
    render() {
        this.rendered = true;
        var item = this.item;
        this.el = document.createElement('div');
        this.el.setAttribute('class', 'tree-node');
        this.contentEl = document.createElement('div');
        this.contentEl.setAttribute('class', 'tree-node-content');
        var itemEl = this.getItemEl(item);
        this.contentEl.appendChild(itemEl);
        this.el.appendChild(this.contentEl);
        if (this.children.length > 0) {
            this.childrenEl = document.createElement('div');
            this.childrenEl.setAttribute('class', 'tree-child-leaves');
            var i, i_items=this.children, i_len=this.children.length, child;
            for (i=0; i<i_len; i++) {
                child = this.children[i];
                var childLeaf = child.render();
                this.childrenEl.appendChild(childLeaf);
            }
            if (!item.expanded) {
                this.childrenEl.classList.add('hidden');
            }
            this.el.appendChild(this.childrenEl);
        }
        var clickThis = (event) => {
        
            // loog 'clickThis', 'expanded', this.item.expanded, 'needs populate',  this.children.length == 0 && !this.item.loadedAt && this.item.isFolder
            var selectThis = () => {
            
                if (this.item.isFolder) {
                    if (this.item.expanded) {
                        this.collapse(this.childrenEl);
                    }
                    else {
                        this.expand(this.childrenEl);
                    }
                }
                else {
                    if (this.getTreeview().selectedItemEl) {
                        wz.removeClass(this.getTreeview().selectedItemEl, 'selected')
                    }
                    wz.addClass(itemEl, 'selected')
                    this.getTreeview().selectedItemEl = itemEl;
                }
                this.getTreeview().selectTreeNode(this)
            }
            ;
            if (this.children.length == 0 && !this.item.loadedAt && this.item.isFolder) {
                this.getTreeview().populate(this)
            }
            selectThis();
        }
        ;
        wz.click(this.contentEl, clickThis)
        var contextmenu = (event) => {
        
            wz.addClass(this.contentEl, 'tree-node-context-menu-on')
            this.getTreeview().handleContextMenu({
                target: event, 
                treeNode: this, 
                data: this.item
             })
        }
        ;
        wz.contextmenu(this.contentEl, contextmenu)
        return this.el;
    }
    expand(skipEmit) {
        svg['folder-opened'](this.svg)
        // loog 'expand', this.children.length
        if (this.children.length > 0) {
            var childrenEl = this.el.querySelector('.tree-child-leaves');
            childrenEl.classList.remove('hidden');
        }
        this.item.expanded = true;
        if (skipEmit) {
            return ;
        }
        this.getTreeview().emit('expand', {
            treeNode: this
         })
    }
    collapse(skipEmit) {
        svg['folder-closed'](this.svg)
        // loog 'collapse', this.children.length
        if (this.children.length > 0) {
            var childrenEl = this.el.querySelector('.tree-child-leaves');
            childrenEl.classList.add('hidden');
        }
        this.item.expanded = false;
        if (skipEmit) {
            return ;
        }
        this.getTreeview().emit('collapse', {
            treeNode: this
         })
    }
    renameStart() {
        // loog 'renameStart', this
        if (!this.input) {
            this.input = document.createElement('input');
            this.input.setAttribute('style', 'margin: 1px 4px;');
            wz.value(this.input, this.item.name)
            this.input.setSelectionRange(0, this.input.value.length);
        }
        this.text.parentNode.replaceChild(this.input, this.text)
        var editOnInputKeyPress = (event) => {
        
            if (event.keyCode == 13) {
                editOnDocumentClick({
                    target: null
                 })
            }
        }
        ;
        var editOnDocumentClick = (event) => {
        
            if (event.target != this.input) {
                wz.unkeypress(document, editOnInputKeyPress)
                wz.unclick(document, editOnDocumentClick)
                this.renameFinish();
            }
        }
        ;
        window.setTimeout(() => {
        
            wz.keypress(this.input, editOnInputKeyPress)
            wz.click(document, editOnDocumentClick)
            this.input.focus();
        }
        , 100)
    }
    renameFinish() {
        var newName = wz.value(this.input);
        // loog 'renameFinish', newName, this.item.name
        if (newName !== this.item.name) {
            this.getTreeview().rename(this, newName, (err, result) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                itemUtils.rename(this.item, newName)
                this.text.textContent = newName;
                this.input.parentNode.replaceChild(this.text, this.input)
                this.getTreeview().emit('select', this, event)
            }
            )
        }
        else {
            this.getTreeview().emit('select', this, event)
        }
    }
    copyCutStart(oper) {
        // loog 'copyCutStart', oper, this
        wz.addClass(this.el, oper === 'copy' ? 'copying' : 'cutting')
    }
    copyCutFinish() {
        // loog 'copyCutFinish', this
        wz.removeClass(this.el, 'copying')
        wz.removeClass(this.el, 'cutting')
    }
    remove() {
        wz.node.remove(this)
        this.el.parentNode.removeChild(this.el);
    }
    getItemEl(item) {
        var kind;
        if (item.isFolder) {
            kind = item.expanded ? 'folder-opened' : 'folder-closed';
        }
        else {
            kind = isImage(item.mime) ? 'image' : 'document';
        }
        var itemEl = document.createElement('div');
        itemEl.className = 'icon-item-group';
        var itemTextEl = document.createElement('span');
        itemTextEl.className = 'item-name';
        itemTextEl.textContent = item.name;
        this.svg = svg.getSvg();
        itemEl.appendChild(svg[kind](this.svg))
        itemEl.appendChild(itemTextEl);
        this.text = itemTextEl;
        return itemEl;
    }
}
var svg = {
    'folder-closed': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M7.25,4 L7.5,4 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L7.25,4 Z M6.75,4 L5,4 L7,2 L7,3.5 L6.5,4 L6.75,4 Z M1,4 L15,4 L15,14 L1,14 L1,4 Z M7.5,3 L7.5,4 L14,4 L14,3 L7.5,3 Z");
        svgEl.appendChild(pathEl);
        return svgEl;
    }, 
    'folder-opened': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var gEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M7.5,5 L2,5 L2,13 L7.75,13 L14,13 L14,4 L15,4 L15,14 L1,14 L1,4 L6.5,4 L5.5,5 L7.5,5 L7.5,4.5 L7.5,5 Z M14,4 L14,3 L7.5,3 L7.5,3.5 L7.5,3 L7,3.5 L7,2 L15,2 L15,4 L14,4 Z M6.5,4 L5,4 L7,2 L7,3.5 L6.5,4 Z");
        var polyEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polyEl.setAttribute('points', "0 7 13 7 14 14 1 14");
        gEl.appendChild(pathEl);
        gEl.appendChild(polyEl);
        svgEl.appendChild(gEl);
        return svgEl;
    }, 
    'document': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M3,2 L13,2 L13,14 L3,14 L3,2 Z M9,2 L13,6 L13,2 L9,2 Z M9,6 L9,2 L8,2 L8,7 L13,7 L13,6 L9,6 Z");
        svgEl.appendChild(pathEl);
        return svgEl;
    }, 
    'image': function(svgEl) {
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }
        var gEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleEl.setAttribute('cx', "5");
        circleEl.setAttribute('cy', "5");
        circleEl.setAttribute('r', "1");
        var polyEl = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polyEl.setAttribute('points', "5.71428571 8.41176471 8 11.2352941 10.8571429 7 14 13 2 13");
        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', "M3,3 L3,13 L13,13 L13,3 L3,3 Z M3,2 L13,2 C13.5522847,2 14,2.44771525 14,3 L14,13 C14,13.5522847 13.5522847,14 13,14 L3,14 C2.44771525,14 2,13.5522847 2,13 L2,3 C2,2.44771525 2.44771525,2 3,2 Z");
        gEl.appendChild(circleEl);
        gEl.appendChild(polyEl);
        gEl.appendChild(pathEl);
        svgEl.appendChild(gEl);
        return svgEl;
    }, 
    getSvg: function() {
        var svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgEl.setAttribute('class', 'fl-icon');
        svgEl.setAttribute('viewBox', '0 0 16 16');
        return svgEl;
    }
 };
function isImage(mime) {
    return /\.(bmp|jpg|jpeg|png|gif|svg)$/.test(mime);
}
//
class TreeView  extends  wz.EventTarget {
    constructor(props) {
        super();
        this.events = [
            'expand', 
            'change', 
            'collapse', 
            'select'
        ];
        this.props = props;
        this.key = props.key || 'default';
        this.app = props.app;
        this.filesystem = props.filesystem;
        this.handlers = {};
        this.selectedTreeNode = null;
    }
    render(rootItem, callback) {
        if (typeof callback === 'undefined') {
            callback = rootItem;
            rootItem = null;
        }
        // set this.rootNode = new TreeNode(data, this)
        if (this.filesystem) {
            this.filesystem.getFolderRoot((err, data) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                this.rootNode = new TreeNode(data, this);
                return callback(null, this.rootNode.render());
            }
            )
        }
        else if (rootItem) {
            this.rootNode = new TreeNode(rootItem, this);
            return callback(null, this.rootNode.render());
        }
        else {
            callback({
                message: 'TreeView.render error: no data for treeNode'
             })
        }
    }
    handleContextMenu(payload) {
        if (this.filesystem) {
            if (payload.data.isFolder) {
                this.handleContextMenuFolder(payload)
            }
            else {
                this.handleContextMenuFile(payload)
            }
        }
    }
    handleContextMenuFolder(context) {
        var that = this;
        if (!this.contextmenuFolder) {
            this.contextmenuFolder = new wz.ContextMenu({
                menusContainerId: this.props.formsContainerId
             });
            ;
            this.contextmenuFolder.create({
                menu: {
                    id: (this.props.id || 'treeview') + '-contextmenuFolder', 
                    items: this.filesystem.folderContextmenuItems(context.treeNode)
                 }, 
                onClick: (data) => {
                
                    if (data.command === 'rename') {
                        data.payload.treeNode.renameStart();
                    }
                    else if (data.command === 'create folder') {
                        this.createFolder(data.payload.treeNode)
                    }
                    else if (data.command === 'create file') {
                        this.createFile(data.payload.treeNode)
                    }
                    else if (data.command === 'clone repo') {
                        this.cloneRepo(data.payload.treeNode)
                    }
                    else if (data.command === 'checkout repo') {
                        this.checkoutRepo(data.payload.treeNode)
                    }
                    else if (data.command === 'copy' || data.command === 'cut') {
                        this.copyCutStart(data.payload.treeNode, data.command)
                    }
                    else if (data.command === 'paste') {
                        this.pasteTo(data.payload.treeNode)
                    }
                    else if (data.command === 'delete') {
                        this.deleteFolder(data.payload.treeNode)
                    }
                }
                
             })
        }
        else {
            this.contextmenuFolder.replace({
                items: this.filesystem.folderContextmenuItems(context.treeNode)
             })
        }
        this.contextmenuFolder.handleRightClick(event, {
            data: context.data, 
            treeNode: context.treeNode
         })
        this.contextmenuFolder.onClose = () => 
        
            wz.removeClass(context.treeNode.contentEl, 'tree-node-context-menu-on')
        ;
    }
    handleContextMenuFile(context) {
        var that = this;
        if (!this.contextmenuFile) {
            this.contextmenuFile = new wz.ContextMenu({
                menusContainerId: this.props.formsContainerId
             });
            ;
            this.contextmenuFile.create({
                menu: {
                    id: (this.props.id || 'treeview') + '-contextmenuFile', 
                    items: this.filesystem.fileContextmenuItems(context.treeNode)
                 }, 
                onClick: (data) => {
                
                    if (data.command === 'rename') {
                        data.payload.treeNode.renameStart();
                    }
                    else if (data.command === 'copy' || data.command === 'cut') {
                        this.copyCutStart(data.payload.treeNode, data.command)
                    }
                    else if (data.command === 'paste') {
                        this.pasteTo(data.payload.treeNode)
                    }
                    else if (data.command === 'delete') {
                        this.deleteFile(data.payload.treeNode)
                    }
                }
                
             })
        }
        else {
            this.contextmenuFile.replace({
                items: this.filesystem.fileContextmenuItems(context.treeNode)
             })
        }
        this.contextmenuFile.handleRightClick(event, {
            data: context.data, 
            treeNode: context.treeNode
         })
        this.contextmenuFile.onClose = () => 
        
            wz.removeClass(context.treeNode.contentEl, 'tree-node-context-menu-on')
        ;
    }
    populate(treeNode, callback) {
        this.filesystem.populateFolderItem(treeNode.item, (err, populatedItem) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            treeNode.replace(populatedItem)
            if (callback) {
                return callback(null);
            }
        }
        )
    }
    selectTreeNode(treeNode) {
        this.selectedTreeNode = treeNode;
        glEventHub.emit('select-tree-node', {
            key: this.key, 
            treeNode: treeNode
         })
    }
    createFolder(treeNode) {
        var createExec = () => 
        
            this.filesystem.createFolder(treeNode.item, (err, newItem) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                // loog 'createFolder.1', newItem
                var newNode = treeNode.addItem(newItem);
                treeNode.expand();
                newNode.renameStart();
            }
            )
        ;
        
        // loog 'createFolder.populate'
        if (!treeNode.item.loadedAt) {
            this.populate(treeNode, (err, notUsed) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                createExec();
            }
            )
        }
        else {
            createExec();
        }
    }
    deleteFolder(treeNode) {
        this.filesystem.deleteFolder(treeNode.item, (err, result) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            treeNode.remove();
        }
        )
    }
    createFile(treeNode) {
        var createExec = () => 
        
            this.filesystem.createFile(treeNode.item, (err, newItem) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                var newNode = treeNode.addItem(newItem);
                treeNode.expand();
                newNode.renameStart();
            }
            )
        ;
        if (!treeNode.item.loadedAt) {
            this.populate(treeNode, (err, notUsed) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                createExec();
            }
            )
        }
        else {
            createExec();
        }
    }
    cloneRepo(treeNode) {
        var cloneExec = async () => 
        
            await gitClone({
                filepath: treeNode.item.path, 
                glEventHub: glEventHub
             })/**
                this.filesystem.cloneFolder(treeNode.item, (err, newItem) => {
                
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw err;
                    }
                     loog 'cloneFolder.1', newItem
                    var newNode = treeNode.addItem(newItem);
                    treeNode.expand();
                    newNode.renameStart();
                }
                )*/
        
        ;
        
        // loog 'cloneFolder.populate'
        if (!treeNode.item.loadedAt) {
            this.populate(treeNode, (err, notUsed) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                cloneExec();
            }
            )
        }
        else {
            cloneExec();
        }
    }
    checkoutRepo(treeNode) {
        var checkoutExec = async () => 
        
            await gitCheckout({
                filepath: treeNode.item.path, 
                glEventHub: glEventHub
             })/**
                this.filesystem.checkoutFolder(treeNode.item, (err, newItem) => {
                
                    if (err) {
                        console.log("[31m%s[0m", 'err', err);
                        throw err;
                    }
                     loog 'checkoutFolder.1', newItem
                    var newNode = treeNode.addItem(newItem);
                    treeNode.expand();
                    newNode.renameStart();
                }
                )*/
        
        ;
        
        // loog 'checkoutFolder.populate'
        if (!treeNode.item.loadedAt) {
            this.populate(treeNode, (err, notUsed) => {
            
                if (err) {
                    console.log("[31m%s[0m", 'err', err);
                    throw err;
                }
                checkoutExec();
            }
            )
        }
        else {
            checkoutExec();
        }
    }
    updateFile(treeNode, newContent) {
        this.filesystem.updateFile(treeNode.item, newContent, (err, result) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            treeNode.item.content = newContent;
            glEventHub.emit('tree-node-updated', {
                key: this.key, 
                treeNode: treeNode
             })
        }
        )
    }
    deleteFile(treeNode) {
        this.filesystem.deleteFile(treeNode.item, (err, result) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            treeNode.remove();
        }
        )
    }
    rename(treeNode, newName, callback) {
        this.filesystem.rename(treeNode.item, newName, callback)
    }
    copyCutStart(treeNode, oper) {
        treeNode.copyCutStart(oper)
        this.filesystem.copyCutStart(treeNode.item, treeNode, oper)
    }
    pasteTo(treeNode) {
        this.filesystem.pasteTo(treeNode.item, (err, from) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            // loog 'treeView.pasteTo', 'from', from, 'to', treeNode.item
            if (from.action === 'copyFile' || from.action === 'copyFolder') {
                var newItem = itemUtils.cloneItem(from.context.item);
                itemUtils.setDirname(newItem, treeNode.item.dirname)
                treeNode.addItem(newItem)
                from.context.copyCutFinish();
            }
            if (from.action === 'moveFile' || from.action === 'moveFolder') {
                var newItem = itemUtils.cloneItem(from.context.item);
                itemUtils.setDirname(newItem, treeNode.item.dirname)
                treeNode.addItem(newItem)
                from.context.remove();
            }
        }
        )
    }
}
//
class TreeFileSystem {
    constructor(ctx) {
        this.fsAdapter = ctx.fsAdapter;
        // the fs item
        this.copyCutItem = null;
        // the TreeNode containing the copy/cut fs item
        this.copyCutContext = null;
        // oneOf( 'copy', 'cut' )
        this.copyCutOper = null;
    }
    getChildName(item, name) {
        var c = 0;
        var result, ok = false;
        while (ok == false) {
            result = name + (c == 0 ? '' : c);
            ok = true;
            var i, i_items=item.children, i_len=item.children.length, child;
            for (i=0; i<i_len; i++) {
                child = item.children[i];
                if (child.name === result) {
                    ok = false;
                }
            }
            c++;
        }
        return result;
    }
    getFolderRoot(callback) {
        this.fsAdapter.getFolderItem(callback)
    }
    populateFolderItem(parentItem, callback) {
        this.fsAdapter.getFolderItem(parentItem, callback)
    }
    createFolder(parentItem, callback) {
        var newName = this.getChildName(parentItem, 'new folder');
        var newPath = parentItem.path + '/' + newName;
        this.fsAdapter.createFolder(newPath, (err, result) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            var newItem = wz.fs.infoByPath(newPath, true);
            newItem.name = newItem.basename;
            newItem.children = [];
            callback(null, newItem)
        }
        )
    }
    deleteFolder(item, callback) {
        this.fsAdapter.deleteFolder(item.path, callback)
    }
    createFile(parentItem, callback) {
        var newName = this.getChildName(parentItem, 'new file');
        var newPath = parentItem.path + '/' + newName;
        var newContent = '...';
        this.fsAdapter.writeFile(newPath, newContent, (err, result) => {
        
            if (err) {
                console.log("[31m%s[0m", 'err', err);
                throw err;
            }
            var newItem = wz.fs.infoByPath(newPath, false);
            newItem.name = newItem.basename;
            newItem.children = [];
            callback(null, newItem)
        }
        )
    }
    updateFile(item, content, callback) {
        this.fsAdapter.writeFile(item.path, content, callback)
    }
    deleteFile(item, callback) {
        this.fsAdapter.deleteFile(item.path, callback)
    }
    rename(item, newName, callback) {
        // loog 'treeFileSystem.rename', item, newName
        if (item.isFolder) {
            this.fsAdapter.renameFolder(item.path, item.dirname + '/' + newName, callback)
        }
        else {
            this.fsAdapter.renameFile(item.path, item.dirname + '/' + newName, callback)
        }
    }
    copyCutStart(item, context, oper) {
        //
        this.copyCutItem = item;
        this.copyCutContext = context;
        this.copyCutOper = oper;
    }
    copyCutClear() {
        this.copyCutItem = null;
        this.copyCutContext = null;
        this.copyCutOper = null;
    }
    pasteTo(item, callback) {
        // loog 'TreeFileSystem.pasteTo', item, 'from', this.copyCutItem
        var action;
        if (this.copyCutOper === 'copy') {
            if (this.copyCutItem.isFolder) {
                action = 'copyFolder';
            }
            else {
                action = 'copyFile';
            }
        }
        else {
            if (this.copyCutItem.isFolder) {
                action = 'moveFolder';
            }
            else {
                action = 'moveFile';
            }
        }
        this.fsAdapter[action](this.copyCutItem.path, item.path + '/' + this.copyCutItem.basename, (err, result) => {
        
            if (err) {
                return callback(err);
            }
            callback(null, {
                item: this.copyCutItem, 
                context: this.copyCutContext, 
                oper: this.copyCutOper, 
                action: action
             })
            this.copyCutClear();
        }
        )
    }
    folderContextmenuItems(item) {
        var canPaste = this.copyCutItem && item !== this.copyCutItem;
        var items = [
            {
                label: 'create folder'
             }, 
            {
                label: 'create file'
             }, 
            {
                label: 'clone repo'
             }, 
            {
                label: 'checkout repo'
             }
        ];
        if (canPaste) {
            items.push({
                label: 'paste'
             })
        }
        items = items.concat([
            {
                label: 'copy'
             }, 
            {
                label: 'cut'
             }, 
            {
                label: 'rename'
             }, 
            {
                label: 'delete'
             }
        ])
        ;
        return items;
    }
    fileContextmenuItems(item) {
        var canPaste = this.copyCutItem && item !== this.copyCutItem;
        var items = [];
        if (canPaste) {
            items.push({
                label: 'paste'
             })
        }
        items = items.concat([
            {
                label: 'copy'
             }, 
            {
                label: 'cut'
             }, 
            {
                label: 'rename'
             }, 
            {
                label: 'delete'
             }
        ])
        ;
        return items;
    }
}
