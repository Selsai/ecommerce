import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Erreur de requête');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      title: 'Produit Test',
      price: 19.99,
      description: 'Ceci est un produit de test créé via l\'API.',
      image: 'https://via.placeholder.com/150', // URL d'une image factice
      category: 'test',
    };

    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        alert(`Le produit avec l'id ${data.id} a été créé.`);
        // Optionnel: Recharger la liste des produits pour afficher le nouveau produit
        // fetchProducts();
      })
      .catch(err => {
        setError(err.message);
        alert('Erreur lors de la création du produit.');
      });
  };

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Erreur : {error}</div>;

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <Button variant="primary" onClick={handleAddProduct} className="mb-3">
        Ajouter un produit
      </Button>
      {/* Grille des produits */}
      <Row className="g-4 justify-content-center">
        {products.map(product => (
          <Col key={product.id} xs={12} md={6} lg={4} xl={3}>
            <Card className="h-100 shadow-sm border-0">
              {/* Image du produit */}
              <Card.Img 
                variant="top" 
                src={product.image} 
                className="product-image"
              />
              
              {/* Contenu du produit */}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-bold">{product.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {product.description.length > 150 ? product.description.substring(0, 150) + '...' : product.description}
                </Card.Text>
                <Card.Text className="fw-bold">
                  {product.price} €
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
