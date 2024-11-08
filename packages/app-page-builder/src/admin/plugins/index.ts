import header from "./pageDetails/header";
import revisionContent from "./pageDetails/revisionContent";
import previewContent from "./pageDetails/previewContent";
import pageRevisions from "./pageDetails/pageRevisions";
import menuItems from "./menuItems";
import routes from "./routes";
import installation from "./installation";
import permissionRenderer from "./permissionRenderer";
import icons from "./icons";

export default () => [
    header,
    revisionContent,
    previewContent,
    pageRevisions,
    menuItems,
    routes,
    installation,
    permissionRenderer,
    icons
];
