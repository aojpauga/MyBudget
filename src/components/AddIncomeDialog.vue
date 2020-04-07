<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px" :retain-focus="false">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Income</v-btn>
      </template>
      <form ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">New Income</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Income Name"
                    required
                    v-model="incomeTitle"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Gross Amount"
                    hint="How much did you get paid?"
                    persistent-hint
                    required
                    v-model="incomeAmount"
                  ></v-text-field>
                  <v-text-field name="fedTax" label="Federal Tax" id="fedTax" v-model="fedTax"></v-text-field>
                  <v-text-field name="stateTax" label="State Tax" id="stateTax" v-model="stateTax"></v-text-field>
                  <v-text-field name="ficaTax" label="FICA Tax" id="ficaTax" v-model="fica"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
              v-on:click.native="saveNewIncome"
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
    incomeTitle: "",
    incomeAmount: "",
    stateTax: "",
    fedTax: "",
    fica: "",
    inputRules: [
      v => v.length >= 3 || "Title must be more than three characters"
    ]
  }),
  methods: {
    saveNewIncome() {
      console.log(this.incomeTitle, this.incomeAmount);
      const income = {
        title: this.incomeTitle,
        amount: this.incomeAmount,
        fedTax: this.fedTax,
        stateTax: this.stateTax,
        fica: this.fica
      };

      db.collection("income")
        .add(income)
        .then(() => {
          console.log("Added to db");
        });
    }
  }
};
</script>
