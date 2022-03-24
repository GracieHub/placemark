import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const geosurfService = {
    geosurfUrl: serviceUrl,
  
      async createUser(user) {
          const res = await axios.post(`${this.geosurfUrl}/api/users`, user);
          return res.data;
        },
      
      async getUser(id) {
          const res = await axios.get(`${this.geosurfUrl}/api/users/${id}`);
          return res.data;
        },
      
      async getAllUsers() {
          const res = await axios.get(`${this.geosurfUrl}/api/users`);
          return res.data;
        },
      
      async deleteAllUsers() {
          const res = await axios.delete(`${this.geosurfUrl}/api/users`);
          return res.data;
        },

      async createCollection(collection) {
          const res = await axios.post(`${this.geosurfUrl}/api/collections`, collection);
          return res.data;
        },
        
       async deleteAllCollections() {
           const response = await axios.delete(`${this.geosurfUrl}/api/collections`);
           return response.data;
        },
        
        async deleteCollection(id) {
            const response = await axios.delete(`${this.geosurfUrl}/api/collections/${id}`);
            return response;
        },
        
        async getAllCollections() {
            const res = await axios.get(`${this.geosurfUrl}/api/collections`);
            return res.data;
        },
        
        async getCollection(id) {
            const res = await axios.get(`${this.geosurfUrl}/api/collections/${id}`);
            return res.data;
        },
    };
    