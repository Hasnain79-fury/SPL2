import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import RegisteredUser from '../models/RegisteredUser';
import FavoriteList from '../models/FavoriteList';
import Blog from '../models/Blog';

chai.use(chaiHttp);
const { expect } = chai;

describe('FavoriteList Controller', () => {
  describe('POST /favoriteList/addPostToFavorites', () => {
    let userId;
    let favListId;
    let postId;

    before(async () => {
      // Create a user
      const user = new RegisteredUser({
        user_id: 'testuser',
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com'
      });
      await user.save();
      userId = user._id;

      // Create a favorite list
      const favoriteList = new FavoriteList({
        fav_list_id: 'testfavlist',
        fav_list_name: 'Test Favorite List',
        user: userId
      });
      await favoriteList.save();
      favListId = favoriteList._id;

      // Create a blog post
      const blog = new Blog({
        title: 'Test Blog Post',
        content: 'This is a test blog post.'
      });
      await blog.save();
      postId = blog._id;
    });

    after(async () => {
      // Clean up the test data
      await RegisteredUser.deleteMany({});
      await FavoriteList.deleteMany({});
      await Blog.deleteMany({});
    });

    it('should add a post to the favorite list', (done) => {
      chai.request(app)
        .post('/favoriteList/addPostToFavorites')
        .send({ userId, postId, favListId })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.blogs).to.include(postId.toString());
          done();
        });
    });

    it('should return an error if the user is not found', (done) => {
      chai.request(app)
        .post('/favoriteList/addPostToFavorites')
        .send({ userId: 'nonexistent', postId, favListId })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('User not found');
          done();
        });
    });

    it('should return an error if the favorite list is not found', (done) => {
      chai.request(app)
        .post('/favoriteList/addPostToFavorites')
        .send({ userId, postId, favListId: 'nonexistent' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('Favorite list not found');
          done();
        });
    });

    it('should return an error if the post is already in the favorite list', (done) => {
      chai.request(app)
        .post('/favoriteList/addPostToFavorites')
        .send({ userId, postId, favListId })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Post already in favorite list');
          done();
        });
    });
  });
});
