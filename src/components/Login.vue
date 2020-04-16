<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="Login"
                    name="login"
                    type="text"
                    :rules="emailRules"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    :rules="passwordRules"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-btn color="primary" router to="/SignUp">Sign Up</v-btn>
                <v-dialog v-model="errorDialog" width="500" :retain-focus="false">
                  <v-card>
                    <v-card-title color="error" primary-title>Error</v-card-title>

                    <v-card-text>Invalid Password</v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="errorDialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="error2Dialog" width="500" :retain-focus="false">
                  <v-card>
                    <v-card-title color="error" primary-title>Error</v-card-title>

                    <v-card-text>User Not Found</v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="error2Dialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "@firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"],
      errorDialog: false,
      error2Dialog: false
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.go({ path: this.$router.path });
          },
          err => {
            if (err.code == "auth/wrong-password") {
              this.errorDialog = true;
            } else if (err.code == "auth/user-not-found") {
              console.log(err.code);
              this.error2Dialog = true;
            }
          }
        );
    }
  }
};
</script>