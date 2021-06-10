<img src="https://openstad.org/uploads/attachments/ckf4445v042sbnl3wvq5yxb9y-logo-openstad2-3x.full.png" width="200"/>

_**Openstad-event-planner** — Event planner for Openstad_

As seen on [Midzomer Mokum](https://midzomermokum.nl)

## Installation

> **IMPORTANT** This package requires [API](https://github.com/savvycodes/openstad-api/tree/feat/event-planner) changes.

Install the package into your openstad-frontend application

```sh
$ npm install --save @savvycodes/openstad-event-planner-widgets
```

Activate the content widget:

```js
// packages/cms/config/contentWidgets.js
const contentWidgets = {
  '@savvycodes/openstad-event-planner': {
    adminOnly: true,
  },
};
```

Enable the module in [openstad-frontend](https://github.com/savvycodes/openstad-frontend) by adding a `modules` key to `index.js` and `modules.js`:

```diff
// openstad-frontend/index.js
var apos = openstadCms.site({
  bundles: ['@openstad/cms'],
  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {
+    '@savvycodes/openstad-event-planner-widgets': {},
  },
});

// openstad-frontend/modules.js
module.exports.default = {
  bundles: ['@openstad/cms'],
  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {
+    '@savvycodes/openstad-event-planner-widgets': {},
  },
};
```

It's important to also add this declaration in `modules.js` for the apostrophe build system to pick up this module.

## Development

> **NOTE** This a work-in-progress

### Packages

- 🧑‍💼 [event-manager](packages/event-manager) – _React component to manage events in the openstad frontend ("voor aanbieders")_
- 🎉 [event-overview](packages/event-overview) – _React component to view events in the openstad frontend ("activiteiten overzicht")_
- 🌍 [openstad-event-planner-widgets](packages/openstad-event-planner-widgets) – _Apostrophe CMS module that bundles the React components_

### Publishing

You can use lerna to publish a new version to npm, for now this is done manually

```sh
$ npx lerna publish
```
