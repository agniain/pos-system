import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDER_HISTORY } from '../graphql/queries';
import { format, startOfDay, endOfDay } from 'date-fns';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import PrintIcon from '@mui/icons-material/Print';

const OrderHistory = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [pdfUrl, setPdfUrl] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_ORDER_HISTORY, {
    variables: {
      startDate: startOfDay(today).toISOString(),
      endDate: endOfDay(today).toISOString(),
    },
  });

  useEffect(() => {
    refetch({
      startDate: startOfDay(startDate).toISOString(),
      endDate: endOfDay(endDate).toISOString(),
    });
  }, [startDate, endDate, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const calculateTotal = (orderDetails) => {
    return orderDetails.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const generatePdfUrl = async (order) => {
    const receiptDocument = (
      <ReceiptDocument order={order} />
    );

    const blob = await pdf(receiptDocument).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    window.open(url, '_blank');
  };

  const ReceiptDocument = ({ order }) => (
    <Document>
      <Page size={[250, 'auto']} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MIDORI</Text>
          <Text style={styles.headerText}>Jl Baru No 1, Bandung</Text>
          <Text style={styles.headerText}>0812-3456-789</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.boldText}>ORDER: {order.id}</Text>
        </View>
        <View style={styles.section}>
          <Text>Cashier: {order.user ? order.user.full_name : 'Cashier'}</Text>
          <Text>{format(new Date(order.order_date), 'dd/MM/yyyy')} {format(new Date(order.order_date), 'HH:mm')}</Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Qty</Text>
          <Text style={styles.tableCell}>Item</Text>
          <Text style={styles.tableCell}>Price</Text>
        </View>
        {order.order_details.map((product) => (
          <View key={product.product_id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{product.quantity}</Text>
            <Text style={styles.tableCell}>{product.product.name}</Text>
            <Text style={styles.tableCell}>Rp {product.product.price}</Text>
          </View>
        ))}
        <View style={styles.section}>
          <Text style={styles.totalPrice}>Total: Rp {calculateTotal(order.order_details)}</Text>
        </View>
        <View style={styles.footer}>
          <Text>Customer Copy</Text>
          <Text>Thanks For Visiting</Text>
          <Text>MIDORI</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="w-5/6 p-4">
      <h2 className="text-2xl text-amber-900 font-bold">Order History</h2>
      <div className="flex space-x-4 mb-5">
        <input
          type="date"
          value={format(startDate, 'yyyy-MM-dd')}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="border p-2"
        />
        <input
          type="date"
          value={format(endDate, 'yyyy-MM-dd')}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="border p-2"
        />
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-lime-600 text-white">
            <th className="border p-2">No</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Cashier</th>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Print Receipt</th>
          </tr>
        </thead>
        <tbody className="text-amber-900">
          {data.orders.map((order, index) => (
            <tr key={order.id}>
              <td className="border p-2 border-lime-700">{index + 1}</td>
              <td className="border p-2 border-lime-700">
                {format(new Date(order.order_date), 'dd/MM/yyyy')}
              </td>
              <td className="border p-2 border-lime-700">
                {order.user ? order.user.full_name : 'Cashier'}
              </td>
              <td className="border p-2 border-lime-700">{order.id}</td>
              <td className="border p-2 border-lime-700">
                {order.order_details.map((product) => (
                  <div key={product.product_id}>{product.product.name}</div>
                ))}
              </td>
              <td className="border p-2 border-lime-700">
                {order.order_details.map((product) => (
                  <div key={product.product_id}>Rp {product.product.price}</div>
                ))}
              </td>
              <td className="border p-2 border-lime-700">
                {order.order_details.map((product) => (
                  <div key={product.product_id}>{product.quantity}</div>
                ))}
              </td>
              <td className="border p-2 border-lime-700">
                Rp {calculateTotal(order.order_details)}
              </td>
              <td className="border p-2 border-lime-700">
                <button
                  onClick={() => generatePdfUrl(order)}
                  className="ml-12 hover:bg-amber-300"
                >
                  <PrintIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
    marginTop: 10
  },
  totalPrice: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderHistory;