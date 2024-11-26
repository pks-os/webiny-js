import { lambda } from "@pulumi/aws";

/**
 * TODO change when pulumi updates
 */
// export const LAMBDA_RUNTIME = lambda.Runtime.NodeJS20dX;
export const LAMBDA_RUNTIME = "nodejs22.x";

export const DEFAULT_PROD_ENV_NAMES = ["prod", "production"];
