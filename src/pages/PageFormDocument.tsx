/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\pages\PageFormDocument.tsx.ittf
    utc time: Fri, 24 Jan 2025 13:13:18 GMT
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

              a {
                color: #4099ff;
              }
            `;
type PageFormDocumentProps = { 
    data: object;
    queryParams: object;
    content?: { 
        html: string;
        css: { 
            content: string;
            renderedClassNames: string[];
        };
    };
};

export default function PageFormDocument(props: PageFormDocumentProps) {
        const {
            data, 
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
                    <link rel="stylesheet" href="/ittf/css/main.css.ittf" />
                    <script src="https://bundle.run/buffer@6.0.3" />
                    <style type="text/css" dangerouslySetInnerHTML={{
                            __html: PageCss
                         }} />
                    <script dangerouslySetInnerHTML={{
                            __html: `  window.__INITIAL_DATA__ = ${jsesc({
                                data, 
                                queryParams
                             }, {
                                quotes: 'double', 
                                isScriptContext: true
                             })}`
                         }} />
                </head>
                <body>
                    <div className="flex-row space-between bg-color-header color-header align-items-center" id="__main_navbar">
                        <div className="flex-row">
                            <a className="color-header font-x font-w-s" href="/">
                                <div style={{width: "80px", marginTop: "5px", marginLeft: "20px"}} />
                            </a></div>
                        <div className="flex-row">
                            <a className="m-s color-header font-l font-w-xxl" href="/ittf/site/starter.html.ittf">Starter</a><a className="m-s color-header font-l font-w-xxl" href="/ittf/site/lab.html.ittf">Lab</a>
                            <div className="m-s p-s color-header-inverse bg-color-header-inverse font-l font-w-xxl">
                                Productions</div>
                            <a className="m-s color-header font-l font-w-xxl" href="/ittf/site/project.html.ittf">Project</a></div>
                        <div className="flex-row">
                            <a className="m-s color-header font-l font-w-xxl" href="/ittf/site/docs.html.ittf">Docs</a></div>
                        <div className="flex-row m-r-x">
                            <a className="m-s color-header font-l font-w-xxl" href="/profile">Profile</a><a className="m-s color-header font-l font-w-xxl" href="/logout">Log Out</a></div>
                    </div>
                    <section id="root" />
                    <script src="/public/pageforms/main.bundle.js" />
                </body>
            </html>
            )
        ;
    }