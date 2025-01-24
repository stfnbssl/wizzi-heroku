/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\pages\EditorDocument.tsx.ittf
    utc time: Fri, 24 Jan 2025 15:11:52 GMT
*/
import jsesc from 'jsesc';
import React from 'react';
const css = String.raw;
const PageCss = css`
              :root {
                --font-normal: -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                --font-monospace: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
                  monospace;
              }

              html {
                box-sizing: border-box;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }

              *:focus {
                outline: none;
              }

              *:focus-visible {
                outline: auto;
              }

              html,
              body {
                height: 100%;
                width: 100%;
                overflow: hidden;
              }

              body {
                font-family: var(--font-normal);
                font-size: 14px;
                line-height: 1.42857143;
                overscroll-behavior: none;
              }

              div {
                scrollbar-width: thin;
                scrollbar-color: var(--color-disabled) var(--color-background);
              }

              @media (hover) {
                ::-webkit-scrollbar {
                  width: 12px;
                  height: 12px;
                  background: var(--color-background);
                }
                ::-webkit-scrollbar-thumb {
                  background: var(--color-disabled);
                  border-radius: 10px;
                  border: 3px var(--color-background) solid;
                }
              }

              button,
              input,
              select,
              textarea {
                font: inherit;
                color: inherit;
                line-height: inherit;
              }

              button {
                cursor: pointer;
              }

              button[disabled] {
                cursor: default;
              }

              #root {
                height: 100vh;
              }

              a {
                color: #4099ff;
              }
            `;
type EditorDocumentProps = { 
    data: object;
    loggedUser: object;
    queryParams: object;
    content?: { 
        html: string;
        css: { 
            content: string;
            renderedClassNames: string[];
        };
    };
};

export default function EditorDocument(props: EditorDocumentProps) {
        const {
            data, 
            loggedUser, 
            queryParams, 
            content
         } = props;
        return  (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,500,600" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" />
                    <style type="text/css" dangerouslySetInnerHTML={{
                            __html: PageCss
                         }} />
                    <script dangerouslySetInnerHTML={{
                            __html: `  window.__INITIAL_DATA__ = ${jsesc({
                                data, 
                                loggedUser, 
                                queryParams
                             }, {
                                quotes: 'double', 
                                isScriptContext: true
                             })}
 console.log(window.__INITIAL_DATA__) 
`
                         }} />
                </head>
                <body>
                    <section id="root" />
                    <script defer src="/public/packi/app.bundle.js" />
                    <script defer src="/public/packi/editor.worker.bundle.js" />
                    <script defer src="/public/packi/json.worker.bundle.js" />
                    <script defer src="/public/packi/css.worker.bundle.js" />
                    <script defer src="/public/packi/html.worker.bundle.js" />
                    <script defer src="/public/packi/ts.worker.bundle.js" />
                </body>
            </html>
            )
        ;
    }