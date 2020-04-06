<template>
  <nav>
    <v-toolbar color="primary">
      <v-toolbar-title class="text-uppercase white--text">
        <span text-color="white" class="font-weight-light">my</span>
        <span color="primary">Budget</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">{{currentUser}}</div>
      <v-btn v-if="isLoggedIn" color="#E3F2FD" class="ma-2" router to="/Home">Home</v-btn>
      <v-btn v-if="isLoggedIn" color="#E3F2FD" class="ma-2" router to="/About">MyData</v-btn>
      <v-btn v-if="!isLoggedIn" color="#E3F2FD" class="ma-2" router to="/">Login</v-btn>
      <v-btn v-if="isLoggedIn" color="#E3F2FD" class="ma-2" @click="logout">Logout</v-btn>
      <v-btn v-if="!isLoggedIn" color="#E3F2FD" class="ma-2" router to="/SignUp">Sign Up</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import firebase from "@firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      this.isLoggedIn = false;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>