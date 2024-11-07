const detectedChangedFilesStepOutputPath = JSON.parse(
    "${{ steps.detect-changed-files.outputs.changed_files }}"
);
const detectedChangedFiles = JSON.parse(detectedChangedFilesStepOutputPath);

const changedPackages = detectedChangedFiles
    .filter(path => path.startsWith("packages/"))
    .reduce((acc, item) => {
        const [,packageName] = item.split("/");
        acc.add(packageName);
        return acc;
    }, new Set());

console.log(JSON.stringify(changedPackages));
