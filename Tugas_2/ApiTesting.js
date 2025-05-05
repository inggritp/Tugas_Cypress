require("dotenv").config();
const request = require("supertest");
const { expect } = require("chai");
const dataBooking = require("./dataBooking.json");

const url = process.env.BASE_URL;
console.log("BASE_URL:", process.env.BASE_URL);
console.log ("USERNAME:", process.env.USERNAME1);
console.log ("PASSWORD:", process.env.PASSWORD1);
let token;
let bookingId;
let bodyCreateBooking;
let createDeleteResponse;

describe("API Automation E2E Test", function () {
    before (async function () {
        const login = await request(url)
    .post("/auth")
    .set("Content-Type", "application/json")
    .send({
        username: process.env.USERNAME1,
        password: process.env.PASSWORD1,
    });
    console.log("Login response status:", login.status);
    console.log("Login response body:", login.body);

    token = login.body.token;
    expect(login.status).to.equal(200);
    expect(token).to.exist;
    expect(token).to.be.a("string");
 
    console.log(login.body.token);  
    })

    beforeEach(function () {
        console.log(`----- Running Test: ${this.currentTest.title} -----`);
        this.timeout(60000); // Timeout 60 detik
      });


    it("Create Booking", async function () {
        
        const createResponse = await request(url)
            .post("/booking")
            .set("Accept", "*/*")
            .set("Content-Type", "application/json")
            .send(dataBooking);
        
            console.log(dataBooking);
            console.log("Create booking status:", createResponse.status);
            console.log("Create booking body:", createResponse.body);
            expect(createResponse.status).to.equal(200);
            bookingId = createResponse.body.bookingid;
            expect(bookingId).to.exist;
            expect(bookingId).to.be.a("number");
            bodyCreateBooking = createResponse.body;
            console.log(createResponse.body.booking.firstname)
            expect(createResponse.body.booking.firstname).to.equal(dataBooking.firstname);
            expect(createResponse.body.booking.lastname).to.equal(dataBooking.lastname);
            expect(createResponse.body.booking.totalprice).to.equal(dataBooking.totalprice);
            expect(createResponse.body.booking.depositpaid).to.equal(dataBooking.depositpaid);
            expect(createResponse.body.booking.bookingdates.checkin).to.equal(dataBooking.bookingdates.checkin);
            expect(createResponse.body.booking.bookingdates.checkout).to.equal(dataBooking.bookingdates.checkout);
            expect(createResponse.body.booking.additionalneeds).to.equal(dataBooking.additionalneeds);
           

    });

    it("Get Booking", async function () {
        console.log(bookingId)
        const createResponse = await request(url)
        .get(`/booking/${bookingId}`)
        .set("Accept", "*/*")
        .set("Content-Type", "application/json")
        expect(createResponse.status).to.equal(200);
        expect(createResponse.body.firstname).to.equal(bodyCreateBooking.booking.firstname);
        expect(createResponse.body.lastname).to.equal(bodyCreateBooking.booking.lastname);
        expect(createResponse.body.totalprice).to.equal(bodyCreateBooking.booking.totalprice);
        expect(createResponse.body.depositpaid).to.equal(bodyCreateBooking.booking.depositpaid);
        expect(createResponse.body.bookingdates.checkin).to.equal(bodyCreateBooking.booking.bookingdates.checkin);
        expect(createResponse.body.bookingdates.checkout).to.equal(bodyCreateBooking.booking.bookingdates.checkout);
        expect(createResponse.body.additionalneeds).to.equal(bodyCreateBooking.booking.additionalneeds);

    })
    
    it("Delete Booking", async function(){
        const createDeleteResponse = await request(url)
        .delete(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Cookie", `token=${token}`)

        expect(createDeleteResponse.status).to.equal(201);
    })

     afterEach(function () {
        console.log(`----- Finished Test: ${this.currentTest.title} -----`);
        if (createDeleteResponse) {
          expect(createDeleteResponse.status).to.be.oneOf([200, 201]);
        }
      });
    
      // Hook sesudah semua test
      after(function () {
        console.log("----- All Booking Tests Completed -----");
      });




}); 