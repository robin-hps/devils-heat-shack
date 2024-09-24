
import {
    ShopifyFetchParams,
    ShopifyFetchResponse,
} from './shopifyTypes';

async function shopifyFetch({ query }: ShopifyFetchParams): Promise<ShopifyFetchResponse> {
    const endpoint = process.env.SHOPIFY_STORE_DOMAIN ?? '';
    const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '';

    console.log('Endpoint:', endpoint);
    console.log('Access Token:', key);

    try {
        console.log('All Env Variables:', process.env);
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': key
            },
            body: JSON.stringify({ query }),
        });

        return {
            status: result.status,
            body: await result.json()
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            error: 'Error receiving data'
        };
    }
}

export async function getAllProducts(): Promise<ShopifyFetchResponse> {
    return shopifyFetch({
        query: `{
      products(sortKey: TITLE, first: 100) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }`,
    });
}