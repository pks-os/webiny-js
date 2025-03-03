import { LambdaClient } from "@webiny/aws-sdk/client-lambda";
import { CliContext } from "@webiny/cli/types";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";
import {
    CliMigrationRunReporter,
    InteractiveCliStatusReporter,
    LogReporter,
    MigrationRunner,
    MigrationStatusReporter,
    NonInteractiveCliStatusReporter,
    VoidStatusReporter
} from "@webiny/data-migration/cli";

export interface IExecuteDataMigrationsParamsInputs {
    build?: boolean;
    preview?: boolean;
    dataMigrationLogStreaming?: boolean;
    variant?: string;
}

export interface IExecuteDataMigrationsParamsProjectApplication {
    id: string;
}

export interface IExecuteDataMigrationsParams {
    env: string;
    variant: string;
    inputs: IExecuteDataMigrationsParamsInputs;
    projectApplication: IExecuteDataMigrationsParamsProjectApplication;
}
/**
 * On every deployment of the API project application, this plugin invokes the data migrations Lambda.
 */
export const executeDataMigrations = {
    type: "hook-after-deploy",
    name: "hook-after-deploy-api-execute-data-migrations",
    async hook(
        { inputs, env, projectApplication }: IExecuteDataMigrationsParams,
        context: CliContext
    ) {
        // Only run migrations for `api` app
        if (projectApplication.id !== "api") {
            return;
        }

        if (inputs.build === false) {
            context.info(`"--no-build" argument detected - skipping data migrations.`);
            return;
        }

        // No need to run migrations if we're doing a preview.
        if (inputs.preview) {
            return;
        }

        const apiOutput = getStackOutput({
            folder: "apps/api",
            env,
            variant: inputs.variant || ""
        });

        context.info("Executing data migrations AWS Lambda function...");

        const logStreamingEnabled = process.env.WEBINY_MIGRATION_LOG_STREAMING !== "false";
        if (!logStreamingEnabled) {
            context.warning(
                [
                    "Data migration log streaming is disabled.",
                    "Note that the logs will still be accessible in Amazon CloudWatch.",
                    "Learn more: https://webiny.link/cloudwatch"
                ].join(" ")
            );
        }

        try {
            const lambdaClient = new LambdaClient({
                region: apiOutput.region
            });

            const functionName = apiOutput["migrationLambdaArn"];

            const logReporter = new LogReporter(functionName);

            let statusReporter: MigrationStatusReporter = new VoidStatusReporter();
            if (inputs.dataMigrationLogStreaming) {
                const useNonInteractiveReporter = !process.stdout.isTTY || "CI" in process.env;
                statusReporter = useNonInteractiveReporter
                    ? new NonInteractiveCliStatusReporter(logReporter)
                    : new InteractiveCliStatusReporter(logReporter);
            }

            const runner = MigrationRunner.create({
                lambdaClient,
                functionName,
                statusReporter
            });

            const result = await runner.runMigration({
                version: process.env.WEBINY_VERSION || context.version
            });

            if (result) {
                const reporter = new CliMigrationRunReporter(logReporter, context);
                await reporter.report(result);
            }
        } catch (e) {
            context.error(`An error occurred while executing data migrations Lambda function!`);
            console.log(e);
            throw e;
        }
    }
};
