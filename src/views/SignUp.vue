<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign Up Form</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-container grid-list-xs>
              <v-form ref="form">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      v-model="name"
                      name="name"
                      label="Name"
                      type="name"
                      :rules="nameRules"
                    ></v-text-field>

                    <v-text-field
                      v-model="email"
                      name="email"
                      label="Email"
                      type="email"
                      :rules="emailRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      :rules="passwordRules"
                    ></v-text-field>

                    <v-btn color="primary" dark @click="signUp">Sign Up</v-btn>
                    <div class="text-center">
                      <v-dialog v-model="errorDialog" width="500" :retain-focus="false">
                        <v-card>
                          <v-card-title color="error" primary-title>Error</v-card-title>

                          <v-card-text>User Exists</v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="errorDialog = false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="createdDialog" width="500" :retain-focus="false">
                        <v-card>
                          <v-card-title color="error" primary-title>Created</v-card-title>

                          <v-card-text>User Created</v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="createdDialog = false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
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
import db from "@/fb.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be at least 6 characters"
      ],
      nameRules: [v => !!v || "Name is required"],
      errorDialog: false,
      createdDialog: false
    };
  },
  methods: {
    signUp: function() {
      this.$refs.form.validate();
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          cred => {
            console.log(cred);
            this.createdDialog = true;
            this.$router.go({ path: this.$router.path });
            return db
              .collection("users")
              .doc(cred.user.uid)
              .set({
                name: this.name
              });
          },
          err => {
            if (err.code == "auth/email-already-in-use") {
              this.errorDialog = true;
            }
          }
        )
        .then(() => {
          this.name = "";
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>