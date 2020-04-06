<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container grid-list-xs>
              <v-form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field v-model="email" name="email" label="Email" type="email"></v-text-field>
                    <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                    ></v-text-field>
                    <v-btn color="primary" dark @click="signUp">Sign Up</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
  


<script>
import firebase from "@firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Account created for", user.email);
            this.$router.go({ path: this.$router.path });
          },
          err => alert(err.message)
        );
    }
  }
};
</script>