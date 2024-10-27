export interface CosmosProps {
    organizationSlug: string;
}

export interface CosmosContent {
    publishId: string;
    name: string;
    slug: string;
    description: string | null;
    data: []
}

export interface CosmosData {
    name: string;
    slug: string;
    order: number;
    type: ItemType;
    data: string;
}

export enum ItemType {
    Text = 'TEXT',
    Longtext = 'LONGTEXT',
    Image = 'IMAGE',
    Html = 'HTML',
}