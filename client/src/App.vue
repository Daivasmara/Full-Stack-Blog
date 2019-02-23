<template>
  <div id="app">
    <div class="container">
      <h1>BLOG</h1>
      <h5>Post a story!</h5>
      <div v-if="warningText !== ''" class="alert" :class="warningType">
        <i class="fas fa-times" @click="warningText=''"></i>
        {{warningText}}
        </div>
      <form @submit.prevent="createPost"> 
        <input class="u-full-width" type="text" placeholder="Username" v-model="input.username">
        <input class="u-full-width" type="text" placeholder="Title" v-model="input.title">
        <textarea class="u-full-width" placeholder="Post" v-model="input.post"></textarea>
        <button type="submit">Submit</button>
      </form>

      <hr>

      <div class="post-container" v-for="post in posts" :key="post._id">
        <div class="edit-delete">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-trash-alt" @click="deletePost(post._id)"></i>
        </div>
        <h4>{{post.username}} - {{post.title}}</h4>
        <p>{{post.post}}</p>
      </div>
    </div>

  </div>
</template>

<script>
const API_URL = 'http://localhost:5000/posts';

export default {
  name: 'app',
  data: () => ({
    input: {
      username: '',
      title: '',
      post: ''
    },
    posts: [],
    warningText: '',
    warningType: ''
  }),
  mounted() {
    this.getPosts();
  }, 
  methods: {
    warning(text, type) {
      this.warningText = '';
      this.warningType = '';
      this.warningText = text;
      this.warningType = type;
    },
    getPosts() {
      this.posts = [];
      fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.posts = result.result;
        this.posts = this.posts.reverse();
      });
    },
    createPost() {
      fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.input)
      })
      .then(response => response.json())
      .then(result => {
        if(result.message == 'OK') {
          this.input = {},
          this.warning('Input Success!', 'success');
          this.getPosts();
        } else {
          this.warning(result.result.error.details[0].message, 'danger')
        }
      });
    },
    deletePost(id) {
      fetch(API_URL + `/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(result => {
          if(result.message == 'OK') {
            this.getPosts();
            this.warning('Message Deleted!', 'success');
          }
        });
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  h1 {
    font-weight: bold;
  }
  .alert {
    position: relative;
    padding: 30px;
    color: white;
    margin: 10px 0;
    &.danger {
        background-color: #ff7675;
    }
    &.success {
      background-color: #2ecc71;
    }
    i {
      color: white;
      position: absolute;
      top: 0;
      right: 0;
      padding: 20px;
      cursor: pointer;
    }
  }
  form {
    text-align: right;
  }
  .post-container {
    position: relative;
    text-align: center;
    padding: 30px;
    background-color: #dfe6e9;
    border-radius: 5px;
    margin-bottom: 10px;
    .edit-delete {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 20px;
      i {
        margin: 5px;
        padding: 10px;
        cursor: pointer;
      }
    }
    h4 {
      font-weight: bold;
    }
  }
}
</style>
