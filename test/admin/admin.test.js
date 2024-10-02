const chai = require('chai');
const app = require('../../app');
const data = require('./tmpData');
const chaiHttp = require('chai-http');
const adminRoute = data.adminRoute;
chai.use(chaiHttp);

// sample test on login (admin) 
describe('___________login___________', () => {
    it('it should return status(200) it admin logged in successfully', (done) => {
        chai
            .request(app)
            .post(`${adminRoute}/login`)
            .send(data.SuccessAdminLogin)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("success");
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
    it('should return status(400) if admin not found', (done) => {
        chai
            .request(app)
            .post(`${adminRoute}/login`)
            .send(data.NotFoundAdmin)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("Admin not found !");
                chai.expect(res.status).to.equal(404);
                done();
            });
    })
    it('should return status(409) if admin not found', (done) => {
        chai
            .request(app)
            .post(`${adminRoute}/login`)
            .send(data.InvalidAdminPassword)
            .end((err, res) => {
                chai.expect(err).to.equal(null);
                chai.expect(res.body.message).to.equal("Invalid password !");
                chai.expect(res.status).to.equal(409);
                done();
            });
    })
});