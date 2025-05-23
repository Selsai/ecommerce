import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error('Erreur technique lors de la récupération des produits :', err);
            setError('Une erreur est survenue lors de la récupération des produits. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fonction pour ajouter un produit
    const handleAddProduct = async () => {
        const newProduct = {
            title: 'Produit Test',
            price: 19.99,
            description: 'Ceci est un produit de test créé via l\'API.',
            image: 'https://via.placeholder.com/150',
            category: 'test',
        };

        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
            const data = await response.json();
            alert(`Le produit a été ajouté avec succès.`);
            await fetchProducts();
        } catch (err) {
            console.error('Erreur technique lors de l’ajout du produit :', err);
            alert('Une erreur est survenue lors de l’ajout du produit. Veuillez réessayer.');
        }
    };

    // Fonction pour modifier un produit complet
    const handleUpdateProduct = async (id) => {
        const updatedProduct = {
            title: 'Produit Modifié',
            price: 29.99,
            description: 'Ceci est une description modifiée.',
            image: 'https://via.placeholder.com/150',
            category: 'modifié',
        };

        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedProduct),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
            alert(`Le produit a été modifié avec succès.`);
            await fetchProducts();
        } catch (err) {
            console.error('Erreur technique lors de la modification du produit :', err);
            alert('Une erreur est survenue lors de la modification du produit. Veuillez réessayer.');
        }
    };

    // Fonction pour modifier partiellement le prix d'un produit
    const handleUpdatePrice = async (id) => {
        const updatedProduct = { price: 5 };

        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedProduct),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
            alert(`Le prix du produit a été modifié avec succès.`);
            await fetchProducts();
        } catch (err) {
            console.error('Erreur technique lors de la modification du prix :', err);
            alert('Une erreur est survenue lors de la modification du prix. Veuillez réessayer.');
        }
    };

    // Fonction pour supprimer un produit
    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
            alert(`Le produit a été supprimé avec succès.`);
            await fetchProducts();
        } catch (err) {
            console.error('Erreur technique lors de la suppression du produit :', err);
            alert('Une erreur est survenue lors de la suppression du produit. Veuillez réessayer.');
        }
    };

    if (loading) return <div className="text-center mt-5">Chargement...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <Container className="d-flex flex-column align-items-center my-5">
            
            {/* Bouton Ajouter un produit */}
            <Button variant="primary" onClick={handleAddProduct} className="mb-3">
                Ajouter un produit
            </Button>

            {/* Grille des produits */}
            <Row className="g-4 justify-content-center">
                {products.map(product => (
                    <Col key={product.id} xs={12} md={6} lg={4} xl={3}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Img variant="top" src={product.image} className="product-image" />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="fs-6 fw-bold">{product.title}</Card.Title>
                                <Card.Text className="text-muted flex-grow-1">
                                    {product.description.length > 150 ? product.description.substring(0, 150) + '...' : product.description}
                                </Card.Text>
                                <Card.Text className="fw-bold">{product.price} €</Card.Text>
                                <Button variant="warning" onClick={() => handleUpdatePrice(product.id)} className="mt-2">
                                    Modifier le prix du produit
                                </Button>
                                <Button variant="light" onClick={() => handleUpdateProduct(product.id)} className="mt-2">
                                    Modifier le produit complet
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)} className="mt-2">
                                    Supprimer le produit
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default App;
