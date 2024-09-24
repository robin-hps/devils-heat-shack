"use client";

import { getAllProducts } from '../lib/shopify';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import {ProductEdge, ProductsData} from "@/lib/shopifyTypes";

export default function HomePage() {
    const [products, setProducts] = useState<ProductEdge[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            const response: ProductsData = await getAllProducts();
            if ('body' in response) {
                console.log('Products Data:', response.body.data.products.edges);
                setProducts(response.body.data.products.edges);
            } else {
                console.error('Failed to fetch products:', response.error);
                setError(response.error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Product List</h1>
            {error ? (
                <p className={styles.error}>Error: {error}</p>
            ) : (
                <div className={styles.productGrid}>
                    {products.map(({ node }) => (
                        <div key={node.id} className={styles.productCard}>
                            {node.images.edges.length > 0 && (
                                <img
                                    src={node.images.edges[0].node.url}
                                    alt={node.images.edges[0].node.altText || node.title}
                                    className={styles.productImage}
                                />
                            )}
                            <h2 className={styles.productTitle}>{node.title}</h2>
                            <p className={styles.productDescription}>{node.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}