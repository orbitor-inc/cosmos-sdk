export * from './types';
import { CosmosProps, CosmosContent } from './types';

export function generateClient(organizationSlug: string) {
    return new CosmosClient({
        organizationSlug,
    });
}

export class CosmosClient {
    private readonly protocol: string = 'https';
    private readonly domain: string = 'cdn.cosmos-cms.io';
    private readonly organizationSlug: string;

    constructor(props: CosmosProps) {
        this.organizationSlug = props.organizationSlug;
    }

    public generateUrl(projectSlug: string, path: string): string {
        return `${this.protocol}://${this.organizationSlug}.${this.domain}/${projectSlug}/${path}`;
    }

    public async getContent(projectSlug: string, path: string): Promise<CosmosContent> {
        const url = this.generateUrl(projectSlug, path);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const content = await res.json();

        return content;
    }
}