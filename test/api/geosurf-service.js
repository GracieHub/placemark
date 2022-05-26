import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";


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

        async getAllSurfspots() {
            const res = await axios.get(`${this.geosurfUrl}/api/surfspots`);
            return res.data;
          },
        
        async createSurfspot(id, surfspot) {
            const res = await axios.post(`${this.geosurfUrl}/api/collections/${id}/surfspots`, surfspot);
            return res.data;
          },
        
        async deleteAllSurfspots() {
            const res = await axios.delete(`${this.geosurfUrl}/api/surfspots`);
            return res.data;
          },
        
        async getSurfspot(id) {
            const res = await axios.get(`${this.geosurfUrl}/api/surfspots/${id}`);
            return res.data;
          },
        
        async deleteSurfspot(id) {
            const res = await axios.delete(`${this.geosurfUrl}/api/surfspots/${id}`);
            return res.data;
          },
        async authenticate(user) {
            const response = await axios.post(`${this.geosurfUrl}/api/users/authenticate`, user);
            axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
            return response.data;
          },
        
        async clearAuth() {
            axios.defaults.headers.common.Authorization = "";
          },
        };