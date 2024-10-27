export * from './types';
import { CosmosProps } from './types';

export class Cosmos {
    private readonly protocol: string = 'https';
    private readonly domain: string = 'cdn.cosmos-cms.io';
    private readonly organizationSlug: string;
    private readonly projectSlug: string;

    constructor(props: CosmosProps) {
        this.organizationSlug = props.organizationSlug;
        this.projectSlug = props.projectSlug;
    }

    public genUrl(path: string): string {
        return `${this.protocol}://${this.organizationSlug}.${this.domain}/${this.projectSlug}/${path}`;
    }
}