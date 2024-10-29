import type { Preview } from "@storybook/react";

import "./styles.scss";
import "../src/styles.scss";

const preview: Preview = {
    parameters: {
        layout: "centered"
    }
};

export default preview;
