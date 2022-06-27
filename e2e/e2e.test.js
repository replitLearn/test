const request = require('supertest')
const createServer = require('../server')

const app = createServer()

describe('Endpoints', () => {
  it('receive valid date with dateString param', async () => {
    const res = await request(app)
      .get('/api/2015-12-25')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("unix",1451001600000)
    expect(res.body).toHaveProperty("utc","Fri, 25 Dec 2015 00:00:00 GMT")
  })

  it('receive valid date with unix param', async () => {
    const res = await request(app)
      .get('/api/1451001600000')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("unix",1451001600000)
    expect(res.body).toHaveProperty("utc","Fri, 25 Dec 2015 00:00:00 GMT")
  })

  it('receive valid date with dateString param with comma', async () => {
    const res = await request(app)
      .get('/api/Aug 9, 1995')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("unix",807937200000)
    expect(res.body).toHaveProperty("utc","Wed, 09 Aug 1995 03:00:00 GMT")
  })

  it('receive valid date with dateString param with full tmz', async () => {
    const res = await request(app)
      .get('/api/Thu, 01 Jan 1970 00:00:00 GMT-0400')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("unix",14400000)
    expect(res.body).toHaveProperty("utc","Thu, 01 Jan 1970 04:00:00 GMT")
  })

  it('receive valid date with empty param', async () => {
    const res = await request(app)
      .get('/api/')
      .redirects(1)
    const testDate = new Date()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("unix")
    expect((res.body.unix/10000).toFixed(0)).toBe((testDate.getTime()/10000).toFixed(0))
    expect(res.body).toHaveProperty("utc")
  })

  it('receive error with wrong dateString format param', async () => {
    const res = await request(app)
      .get('/api/2015-1225')
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty("error","Invalid Date")
  })

  it('receive error with wrong dateString format param - 2', async () => {
    const res = await request(app)
      .get('/api/abcd')
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty("error","Invalid Date")
  })
})