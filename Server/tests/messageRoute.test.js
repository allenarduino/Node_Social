let server = require("../server");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Send a message", () => {
  it("Send message as logged in user", done => {
    const user_id = 3;
    chai
      .request(server)
      .post("/send_message/" + user_id)
      .send({
        message: "Hello Michael, this is Allen"
      })
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("message");
        done();
      });
  });
});

describe("Fetch messages", req => {
  it("Fetch messages as logged in user", done => {
    const user_id = 3;
    chai
      .request(server)
      .get("/fetch_messages/" + user_id)
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("messages");
        done();
      });
  });
});

describe("Fetch chats", () => {
  it("Fetch last message with users", done => {
    chai
      .request(server)
      .get("/fetch_chats")
      .set("x-access-token", "your JWT_TOKEN here")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("chats");
        done();
      });
  });
});
