<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px" :retain-focus="false">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Expense</v-btn>
      </template>
      <form ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">New expense</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="valid">
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Expense Name"
                      required
                      v-model="expenseTitle"
                      :rules="inputRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Expense Amount"
                      hint="How much did you pay?"
                      persistent-hint
                      required
                      v-model="expenseAmount"
                      :rules="numberRule"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
              v-on:click.native="saveNewExpense"
              :disabled="!valid"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>

<script>
import db from "@/fb";
export default {
  data: () => ({
    dialog: false,
    valid: false,
    expenseTitle: "",
    expenseAmount: "",
    inputRules: [
      v => v.length >= 3 || "Title must be more than three characters"
    ],
    numberRule: [
      v =>
        (!isNaN(parseFloat(v)) && v >= 0) || "Must be a number greater than 0"
    ]
  }),
  methods: {
    saveNewExpense() {
      console.log(this.expenseTitle, this.expenseAmount);
      const expense = {
        title: this.expenseTitle,
        amount: this.expenseAmount
      };

      db.collection("expense")
        .add(expense)
        .then(() => {
          console.log("Added to db");
        });
    }
  }
};
</script>
