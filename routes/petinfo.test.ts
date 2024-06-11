import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/petinfoRoutes';
import request from 'supertest';
const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);


describe( 'a simple api endpoint', () => {
  
  test('Get all petinfo', async () => {

    const result = await request(app.callback()).get('/api/v1/petinfos')
    expect(result.statusCode).toEqual(200)}
  );

  test('Post a petinfo', async () => {

    const result = await request(app.callback())
      .post('/api/v1/petinfos')
      .send({
        "id": "2", 
        "petname": "Puppy",
        "petsummary": "Dog",
        "imageurl": "Golden Retriever",
        "authorid": 2,})})

  test('Get single petinfo', async () => {

    const result = await request(app.callback()).get('/api/v1/petinfos/2')
    expect(result.statusCode).toEqual(200)}
  );

  test('Update a petinfo', async () => {

    const result = await request(app.callback())
      .put('/api/v1/petinfos/2')
      .send({
        "petname": "Puppy",
        "petsummary": "Dog",
        "imageurl": "Golden Retriever",
        "authorid": 2,})})           
  
  })