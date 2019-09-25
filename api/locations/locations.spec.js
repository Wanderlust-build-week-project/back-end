const request = require("supertest");

const server = require("../server.js");
const db = require("../../data/dbConfig.js");
const Locations = require("./locationsHelper.js");

let token;
const user = { username: "Testingthedata", password: "******" };
beforeAll(done => {
  request(server)
    .post("/auth/organizers/register")
    .send({ ...user, name: "Shenanigans" })
    .then(result => {
      request(server)
        .post("/auth/organizers/login")
        .send(user)
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });
});

describe("locations", () => {
  beforeEach(async () => {
    await db("locations").truncate();
  });

  describe("GET /locations", () => {
    it("should return status 200", () => {
      return request(server)
        .get("/locations")
        .set("authorization", `${token}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return a list of locations", async () => {
      await Locations.addLocation([
        { location: "Mexico" },
        { location: "Spain" },
        { location: "Portugal" }
      ]);
      const res = await request(server)
        .get("/locations")
        .set("authorization", `${token}`);

      expect(res.body.length).toBeGreaterThan(2);
      expect(res.body[0].location).toBe("Mexico");
    });
  });

  describe("POST /locations", () => {
    it("should return status 201", () => {
      return request(server)
        .post("/locations")
        .set("authorization", `${token}`)
        .send({ location: "Bali" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should add Bali as a location", () => {
      return request(server)
        .post("/locations")
        .set("authorization", `${token}`)
        .send({ location: "Bali" })
        .then(res => {
          expect(res.body.location).toBe("Bali");
        });
    });
  });

  describe("PUT /locations", () => {
    it("should return status 201", () => {
      return request(server)
        .post("/locations")
        .set("authorization", `${token}`)
        .send({ location: "Bali" })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.location).toBe("Bali");
        });
    });

    it("should update Bali to Paris", async () => {
      const res = await request(server)
        .post("/locations")
        .set("authorization", `${token}`)
        .send({ location: "Bali" });
      expect(res.body.location).toBe("Bali");

      const update = await request(server)
        .put("/locations/1")
        .set("authorization", `${token}`)
        .send({ location: "Paris" });
      expect(update.body.location).toBe("Paris");
    });
  });

  describe("DELETE /locations", () => {
    it("should return status 200", async () => {
      const res = await request(server)
        .post("/locations")
        .set("authorization", `${token}`)
        .send({ location: "Bali" });

      expect(res.body.id).toBe(1);

      const deleted = await request(server)
        .delete(`/locations/${res.body.id}`)
        .set("authorization", `${token}`);

      expect(deleted.body.location).toBe(undefined);
      expect(deleted.status).toBe(200);
    });

    it("should delete Bali from the database", async () => {
      const res = await request(server)
        .post("/locations")
        .set("authorization", `${token}`)
        .send({ location: "Bali" });

      expect(res.body.id).toBe(1);

      const deleted = await request(server)
        .delete(`/locations/${res.body.id}`)
        .set("authorization", `${token}`);

      expect(deleted.body.location).toBe(undefined);
    });
  });
});
