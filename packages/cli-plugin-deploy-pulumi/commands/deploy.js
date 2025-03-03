const { createPulumiCommand, runHook, notify } = require("../utils");
const { BeforeDeployPlugin } = require("../plugins/BeforeDeployPlugin");
const { PackagesBuilder } = require("./buildPackages/PackagesBuilder");
const pulumiLoginSelectStack = require("./deploy/pulumiLoginSelectStack");
const executeDeploy = require("./deploy/executeDeploy");
const executePreview = require("./deploy/executePreview");
const { setTimeout } = require("node:timers/promises");

module.exports = (params, context) => {
    const command = createPulumiCommand({
        name: "deploy",
        createProjectApplicationWorkspace: params.build,
        telemetry: true,
        command: async commandParams => {
            const { inputs, context, projectApplication, pulumi, getDuration } = commandParams;
            const { env, variant, folder, build, deploy } = inputs;

            const hookArgs = { context, env, variant, inputs, projectApplication };

            context.info("Webiny version: %s", context.version);
            console.log();

            // Just so the version stays on the screen for a second, before the process continues.
            await setTimeout(1000);

            if (build) {
                await runHook({
                    hook: "hook-before-build",
                    args: hookArgs,
                    context
                });

                console.log();

                const builder = new PackagesBuilder({
                    packages: projectApplication.packages,
                    inputs,
                    context
                });

                await builder.build();

                console.log();

                await runHook({
                    hook: "hook-after-build",
                    args: hookArgs,
                    context
                });
            } else {
                context.info("Skipping building of packages.");
            }

            console.log();

            if (!deploy) {
                context.info("Skipping project application deployment.");
                return;
            }

            await runHook({
                hook: BeforeDeployPlugin.type,
                args: hookArgs,
                context
            });

            await pulumiLoginSelectStack({ inputs, projectApplication, pulumi });

            console.log();

            if (inputs.preview) {
                await executePreview(commandParams);
            } else {
                await executeDeploy(commandParams);
            }

            console.log();

            await runHook({
                hook: "hook-after-deploy",
                args: hookArgs,
                context
            });

            await notify({
                message: `"${folder}" stack deployed in ${getDuration()}.`,
                timeout: 1
            });
        }
    });

    return command(params, context);
};
