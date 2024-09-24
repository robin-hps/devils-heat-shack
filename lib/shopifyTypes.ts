// lib/shopifyTypes.ts

// Define the types for the product data
export type Image = {
    node: {
        url: string;
        altText: string | null;
    };
};

export type ProductNode = {
    id: string;
    title: string;
    description: string;
    images: {
        edges: Image[];
    };
};

export type ProductEdge = {
    node: ProductNode;
};

// Type definitions for the responses
export type ShopifyFetchParams = {
    query: string;
};

export type ShopifyFetchSuccessResponse = {
    status: number;
    body: {
        data: {
            products: {
                edges: ProductEdge[];
            };
        };
    };
};

export type ShopifyFetchErrorResponse = {
    status: number;
    error: string;
};

export type ShopifyFetchResponse = ShopifyFetchSuccessResponse | ShopifyFetchErrorResponse;
export type ProductsData = ShopifyFetchSuccessResponse | ShopifyFetchErrorResponse;