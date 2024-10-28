# Overview
This document covers different aspects of the development process for the `@webiny/admin-ui` package.

## Tailwind CSS
Webiny's Admin app uses Tailwind CSS for styling.

### Tailwind Configuration
Tailwind CSS is configured as usual, via the [`tailwind.config.js`](./tailwind.config.js) file. However, we also have a [`tailwind.config.customizations.js`](./tailwind.config.customizations.js) file, which is used to override the default Tailwind CSS configuration. More on this in the next section.

### Default Theme
One of the main things we define via the [`tailwind.config.js`](./tailwind.config.js) file is the default theme, which is based on Webiny's design system, and which can be found in this [Figma file](https://www.figma.com/file/f0QUDWX37Kt5X53eltTRiT/Webiny-Design-System?type=design&node-id=127-26352&mode=design&t=nhoOU7NamjWvImoW-0). But note that the values are not actually defined in the `tailwind.config.js` file, but rather in the `tailwind.config.customizations.js` file, which is a file that is generated from a Figma export (more on this in the next section).

### Figma To Code
Since manually transferring values from the mentioned Figma file into code has shown to be a very cumbersome process, we've created a script that basically takes a Figma export and generates all the necessary Tailwind CSS configuration. Note that when we say "Figma export", we basically mean an export of Alias tokens, created by this [Export/Import Variables](https://www.figma.com/community/plugin/1256972111705530093/export-import-variables) plugin.

Once the export is downloaded, we place it in `packages/admin-ui/scripts/importFromFigma/exports/Alias tokens.json`, and then we run the following command from project root:

```bash
yarn webinyn-admin-import-from-figma
```

This will generate a new `tailwind.config.customizations.js` file, which will contain all the necessary Tailwind CSS configuration. On top of that, it will also generate a `src/styles.scss` file, which contains actual values for CSS variables that are referenced in the `tailwind.config.customizations.js` file.
