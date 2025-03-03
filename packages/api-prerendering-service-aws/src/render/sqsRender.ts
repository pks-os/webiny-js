import plugin, { RenderParams } from "@webiny/api-prerendering-service/render";
import { createSQSEventHandler } from "@webiny/handler-aws";
import { HandlerPayload } from "@webiny/api-prerendering-service/render/types";
import { Context as LoggerContext } from "@webiny/api-log/types";

export default (params: RenderParams) => {
    const render = plugin(params);

    return createSQSEventHandler(async ({ event, context, request, reply }) => {
        const events: HandlerPayload = event.Records.map(r => JSON.parse(r.body));

        return render.cb({
            context: context as LoggerContext,
            payload: events,
            request,
            reply
        });
    });
};
