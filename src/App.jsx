import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <h1 className="mb-4 text-center">Nos Produits</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4 justify-content-center" style={{ maxWidth: '1200px' }}>
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm d-flex flex-column" style={{ border: 'none' }}>
              <Card.Img 
                variant="top" 
                src={product.image} 
                style={{ 
                  objectFit: 'contain', 
                  width: '100%', 
                  height: '200px',
                  padding: '10px'
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center fs-6 fw-bold">{product.title}</Card.Title>
                <Card.Text className="text-muted text-center" style={{ fontSize: '0.9rem', flexGrow: 1 }}>
                  {product.description.length > 150 ? product.description.substring(0, 150) + '...' : product.description}
                </Card.Text>
                <Card.Text className="fw-bold text-center">
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
