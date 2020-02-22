import { findPost } from '@app/routes/_shared/posts';
import { ReadPostParams, ResultsPost } from '@start-bootstrap/sb-clean-blog-shared-types';
import fastify from 'fastify';

export const postsRead: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/:id',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<ReadPostParams> = async function(
    request,
    reply
): Promise<ResultsPost> {
    const readPostParams: ReadPostParams = request.params;
    const foundPost = await findPost(request, readPostParams.id);

    return foundPost.toResultsPost();
};

const schema = {
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                slug: { type: 'string' },
                backgroundImage: { type: 'string' },
                heading: { type: 'string' },
                subHeading: { type: 'string' },
                meta: { type: 'string' },
                body: { type: 'string' },
            },
        },
    },
};
