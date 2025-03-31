import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Importez le fichier CSS pour les styles personnalisés

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

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Erreur : {error}</div>;

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      {/* Grille des produits */}
      <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm border-0">
              {/* Image du produit */}
              <Card.Img 
                variant="top" 
                src={product.image} 
                className="product-image"
              />
              
              {/* Contenu du produit */}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 fw-bold product-title">{product.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1 product-description">
                  {product.description.length > 150 ? product.description.substring(0, 150) + '...' : product.description}
                </Card.Text>
                <Card.Text className="fw-bold product-price">
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
