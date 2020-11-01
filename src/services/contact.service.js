import http from "../http-common";

class ContactDataService {
  getAll() {
    return http.get("/contacts");
  }

  get(id) {
    return http.get(`/contacts/${id}`);
  }

  getHistory(id) {
    return http.get(`/contacts/${id}/history`);
  }

  create(data) {
    return http.post("/contacts", data);
  }

  update(id, data) {
    return http.put(`/contacts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contacts/${id}`);
  }

  deleteAll() {
    return http.delete(`/contacts`);
  }

  findByTitle(title) {
    return http.get(`/contacts?title=${title}`);
  }
}

export default new ContactDataService();
