import { useState } from 'react';
import OrderFilterForm from './OrderFilterForm';
import OrderList from './OrderList';
import axios from 'axios';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async (date, status) => {
    setLoading(true);
    try {
      if (status === 'All') {
        const res = await axios.post('https://algotronn-backend.vercel.app/get-all-orders-by-date', { date });
        setOrders(res.data.orders || []);
      } else {
        const res = await axios.post('https://algotronn-backend.vercel.app/get-orders-by-date', { date, status });
        const results = [];

        res.data.users.forEach(user => {
          user.orders.forEach(order => {
            results.push({
              ...order,
              userName: user.name,
              userEmail: user.email,
              googleId: user.googleId
            });
          });
        });

        setOrders(results);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async () => {
    if (!orderId.trim()) return alert('Enter order ID');

    try {
      const res = await axios.post('https://algotronn-backend.vercel.app/get-order-details', { orderId });
      if (res.data.success) {
        setOrderDetails(res.data.order);
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
      alert('Order not found.');
    }
  };

  return (
    <>
      <style>{`
        .loading-spinner {
          margin: 40px auto;
          width: 40px;
          height: 40px;
          border: 4px solid #ccc;
          border-top-color: #1d72b8;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="admin-container">
        <h1>Algotronn Admin</h1>

    <h3>Order details by order Id <h3>

        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '250px' }}
          />
          <button onClick={fetchOrderDetails} style={{ padding: '8px 12px' }}>Get Order Details</button>
        </div>
<h2>Orders of all dates </h2>

        <OrderFilterForm onSearchByStatus={fetchOrders} />

        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <OrderList orders={orders} />
        )}
      </div>

      {showModal && orderDetails && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p><strong>Status:</strong> {orderDetails.status}</p>
            <p><strong>Total Amount:</strong> ₹{orderDetails.totalAmount}</p>
            <p><strong>Ordered On:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>

            <h3>Items:</h3>
            <ul style={{ paddingLeft: 0 }}>
              {orderDetails.items.map((item, index) => (
                <li key={index} style={{ display: 'flex', marginBottom: '10px', gap: '12px', alignItems: 'center' }}>
                  <img src={item.imageUrl} alt={item.name} width="60" style={{ borderRadius: '8px' }} />
                  <div>
                    <p style={{ margin: '0 0 5px' }}><strong>{item.name}</strong></p>
                    <p style={{ margin: 0 }}>Qty: {item.quantity}</p>
                    <p style={{ margin: 0 }}>
                      Price: ₹{item.price} 
                      {item.originalPrice && item.originalPrice !== item.price && (
                        <> <del style={{ marginLeft: 6 }}>₹{item.originalPrice}</del> ({item.discount}% off)</>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <h3>Shipping Address:</h3>
            <p><strong>Name:</strong> {orderDetails.address.name}</p>
            <p><strong>Mobile:</strong> {orderDetails.address.mobile}</p>
            <p><strong>Email:</strong> {orderDetails.address.email}</p>
            <p><strong>Address:</strong> {orderDetails.address.address}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.pincode}</p>

            <button onClick={() => setShowModal(false)} style={{ marginTop: '20px', padding: '8px 16px' }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;