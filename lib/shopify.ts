export async function shopifyFetch({ query, variables }) {
    const endpoint = process.env.SHOPIFY_STORE_DOMAIN;
    const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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
            body: { query, variables } && JSON.stringify({ query, variables })
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

export async function getAllProducts() {
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
    }`
    });
}