import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,    
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance",
          type: "deposit",
          category: "Development of website",
          value: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: "Rent",
          type: "withdraw",
          category: "Rent payment",
          value: 1200,
          createdAt: new Date('2021-02-14 13:45:00'),
        },
        {
          id: 3,
          title: "Burguers",
          type: "withdraw",
          category: "Food and such",
          value: 56,
          createdAt: new Date('2021-02-16 23:23:42'),
        },
      ]
    })
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data =  JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
