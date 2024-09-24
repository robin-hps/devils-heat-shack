"use client";

import { getAllProducts } from '../lib/shopify';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';

// Define the types for the product data
type Image = {
    node: {
        url: string;
        altText: string | null;
    };
};

type ProductNode = {
    id: string;
    title: string;
    description: string;
    images: {
        edges: Image[];
    };
};

type ProductEdge = {
    node: ProductNode;
};

type ProductsData = {
    body: {
        data: {
            products: {
                edges: ProductEdge[];
            };
        };
    };
    status: number;
    error?: string;
};

export default function HomePage() {
    const [products, setProducts] = useState<ProductEdge[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const response: ProductsData = await getAllProducts();
            if (response.status === 200) {
                console.log('Products Data:', response.body.data.products.edges);
                setProducts(response.body.data.products.edges);
            } else {
                console.error('Failed to fetch products:', response.error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Product List</h1>
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
        </div>
    );
}