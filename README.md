# React-based custom panel starter kit for Home Assistant

This project will help you get started with building a custom panel for Home Assistant using the React framework.

## Getting started

This guide expects NodeJS 8 or later and Yarn to be installed.

First, we're going to get a copy of this repo and install the dependencies:

```bash
npx degit home-assistant/custom-panel-starter-kit-react
cd custom-panel-starter-kit-react
yarn
```

For testing purporses, let's start a testing server:

```
yarn start
```

Keep the server running. Now add the following entry to your `configuration.yaml` file:

```yaml
panel_custom:
    # This is the name of the web component that will be defined by the panel
  - name: react-panel
    sidebar_title: React Demo
    sidebar_icon: mdi:react
    # This is the url that will load the panel
    url_path: react-panel-demo
    # Location where the panel is hosted during development
    js_url: http://localhost:8080/main.js
    # We want to load in an iframe to work around limitations in React
    embed_iframe: true
    # This will be available as prop `panel.config`.
    config:
      name: World
```

Restart Home Assistant.

## Sharing your work

To build a new version of your panel, run:

```bash
yarn build
```

This will generate a new build of the panel in the `dist` folder. Copy the content of this folder and place it in `<home assistant config>/www/my-panel`.

This will make it available from Home Assistant via the url `/local/my-panel/main.js`.

We then have to configure Home Assitant to use it:

```yaml
panel_custom:
  - name: react-panel
    sidebar_title: React Prod
    sidebar_icon: mdi:react
    url_path: react-panel-prod
    js_url: /local/my-panel/main.js
    embed_iframe: true
    config:
      name: World
```

## Sharing your work - advanced

Once your panel grows more complex and you need to load extra files (either CSS or JS), you will need to know in advance where your panel will be hosted. You can configure where it will be hosted by adjusting the `panelServingUrl` value in `package.json`.

You can use this url inside your code by using the variable `__PUBLIC_PATH__`.

### ES5 support

If you need to support older browsers, you will have to enable transpilation to ES5 (out of scope for this tutorial). However, once
you've done this, defining the web component to hook into Home Assistant will require a little bit
of extra work. Open index.js and replace the call to `customElements.define` with the following:

```js
window.loadES5Adapter().then(() =>
    customElements.define('react-panel', ReactPanelElement(Panel)));
```
