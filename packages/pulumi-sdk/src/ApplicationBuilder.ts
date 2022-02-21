import { Pulumi } from "./Pulumi";
import { ApplicationConfig } from "./ApplicationConfig";
import { ApplicationHook } from "./ApplicationHook";

export interface ApplicationStackArgs {
    /** Root path of the application */
    appDir: string;
    /** Root dir of the project */
    projectDir: string;
    pulumi: Pulumi;
    debug?: boolean;
    env: string;
}

export interface ApplicationStack {
    refresh(): Promise<void>;
    preview(): Promise<void>;
    up(): Promise<void>;
}

export interface ApplicationContext {
    env: string;
}

export abstract class ApplicationBuilder<TConfig extends ApplicationConfig = ApplicationConfig>
    implements ApplicationConfig
{
    // It needs to duplicate configuration props for backwards compatibility.
    // There is a lot of CLI code, that depends on it.
    public readonly id: string;
    public readonly name: string;
    public readonly description?: string;
    public readonly cli?: Record<string, any>;
    public readonly beforeBuild?: ApplicationHook;
    public readonly afterBuild?: ApplicationHook;
    public readonly beforeDeploy?: ApplicationHook;
    public readonly afterDeploy?: ApplicationHook;

    constructor(public readonly config: TConfig) {
        this.id = config.id;
        this.name = config.name;
        this.description = config.description;
        this.cli = config.cli;
        this.beforeBuild = config.beforeBuild;
        this.afterBuild = config.afterBuild;
        this.beforeDeploy = config.beforeDeploy;
        this.afterDeploy = config.afterDeploy;
    }

    public abstract createOrSelectStack(args: ApplicationStackArgs): Promise<ApplicationStack>;
}
