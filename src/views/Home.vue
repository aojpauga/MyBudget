<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-col>
        <v-flex xs12>
          <AddIncomeDialog />
          <v-skeleton-loader
            class="mx-auto"
            max-width="500"
            type="card"
            v-if="incomeLoading == true"
          ></v-skeleton-loader>
          <v-card
            xs12
            class="pa-3"
            max-width="500"
            justify-space-around
            v-for="card in incomeCards"
            :key="card.title"
          >
            <div class="ma-3">{{ card.title }}</div>

            <div>
              <v-row class="mx-auto">
                <v-text-field readonly class="ma-3" label="Amount" v-model="card.amount"></v-text-field>
                <v-text-field readonly class="ma-3" label="Federal Tax" v-model="card.fedTax"></v-text-field>
                <v-text-field readonly class="ma-3" label="State Tax" v-model="card.stateTax"></v-text-field>
                <v-text-field readonly class="ma-3" label="FICA" v-model="card.fica"></v-text-field>

                <div class="text-center">
                  <v-dialog v-model="incomeDialog" width="500" :retain-focus="false">
                    <template v-slot:activator="{ on }">
                      <v-btn color="red lighten-2" dark v-on="on" @click="incomeID=card.id">Delete</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>

                      <v-card-text>Are you sure you want to delete this item?</v-card-text>
                      <v-text-field v-model="incomeID"></v-text-field>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="incomeDialog = false"
                          v-on:click.native="deleteIncome(incomeID)"
                        >Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <div>
                    <v-form v-model="valid">
                      <v-dialog
                        v-model="editDialog"
                        :retain-focus="false"
                        width="500"
                        transition="dialog-transition"
                      >
                        <template v-slot:activator="{ on }">
                          <v-btn
                            class="ma-3"
                            color="green lighten-2"
                            dark
                            v-on="on"
                            @click="incomeID=card.id, incomeTitle = card.title, income = card.amount, fedTax = card.fedTax, stateTax = card.stateTax, fica = card.fica"
                          >Edit</v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>

                          <v-card-text>Are you sure you want to edit this item?</v-card-text>
                          <v-text-field
                            class="ma-3"
                            label="Title"
                            v-model="incomeTitle"
                            :rules="wordRules"
                          ></v-text-field>

                          <v-text-field
                            class="ma-3"
                            label="Amount"
                            v-model="income"
                            :rules="inputRules"
                          ></v-text-field>
                          <v-text-field
                            class="ma-3"
                            label="Federal Tax"
                            v-model="fedTax"
                            :rules="inputRules"
                          ></v-text-field>
                          <v-text-field
                            class="ma-3"
                            label="State Tax"
                            v-model="stateTax"
                            :rules="inputRules"
                          ></v-text-field>
                          <v-text-field
                            class="ma-3"
                            label="FICA"
                            v-model="fica"
                            :rules="inputRules"
                          ></v-text-field>

                          <v-text-field v-model="incomeID"></v-text-field>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              :disabled="!valid"
                              @click="editDialog = false"
                              v-on:click.native="editIncome(incomeID)"
                            >Confirm</v-btn>
                            <v-btn color="error" text @click="editDialog = false">Cancel</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-form>
                  </div>
                </div>
              </v-row>
            </div>
          </v-card>
        </v-flex>
      </v-col>
      <v-col>
        <v-flex xs12>
          <AddExpenseDialog />
          <v-skeleton-loader
            class="mx-auto"
            max-width="500"
            type="card"
            v-if="expenseLoading == true"
          ></v-skeleton-loader>
          <v-card
            xs12
            class="pa-3"
            max-width="500"
            justify-space-around
            v-for="card in expenseCards"
            :key="card.title"
          >
            <div class="ma-3">{{ card.title }}</div>
            <div>
              <v-row class="mx-auto">
                <v-text-field class="ma-3" readonly :label="card.inputLabel" v-model="card.amount"></v-text-field>
                <div class="text-center">
                  <v-dialog v-model="expenseDialog" width="500" :retain-focus="false">
                    <template v-slot:activator="{ on }">
                      <v-btn color="red lighten-2" dark v-on="on" @click="expenseID=card.id">Delete</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>

                      <v-card-text>Are you sure you want to delete this item?</v-card-text>
                      <v-text-field v-model="expenseID"></v-text-field>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="dialog = false"
                          v-on:click.native="deleteExpense(expenseID)"
                        >Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <div>
                    <v-dialog
                      v-model="editExDialog"
                      :retain-focus="false"
                      width="500"
                      transition="dialog-transition"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ma-3"
                          color="green lighten-2"
                          dark
                          v-on="on"
                          @click="expenseID=card.id"
                        >Edit</v-btn>
                      </template>
                      <v-form v-model="valid">
                        <v-card>
                          <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>

                          <v-card-text>Are you sure you want to edit this item?</v-card-text>
                          <v-text-field
                            class="ma-3"
                            label="Title"
                            v-model="expenseTitle"
                            :rules="wordRules"
                          ></v-text-field>

                          <v-text-field
                            class="ma-3"
                            label="Amount"
                            v-model="expense"
                            :rules="inputRules"
                          ></v-text-field>

                          <v-text-field v-model="expenseID"></v-text-field>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              text
                              :disabled="!valid"
                              @click="editExDialog = false"
                              v-on:click.native="editExpense(expenseID)"
                            >Confirm</v-btn>
                            <v-btn color="error" text @click="editExDialog = false">Cancel</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-dialog>
                  </div>
                </div>
              </v-row>
            </div>
          </v-card>
        </v-flex>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import AddIncomeDialog from "../components/AddIncomeDialog";
import AddExpenseDialog from "../components/AddExpenseDialog";
//import DeleteIncomeDialog from "../components/DeleteIncomeDialog";
import db from "@/fb.js";
export default {
  data() {
    return {
      income: 0,
      expense: 0,
      fedTax: 0,
      stateTax: 0,
      fica: 0,
      incomeTitle: "",
      expenseTitle: "",
      incomeCards: [],
      expenseCards: [],
      count: 1,
      incomeDialog: false,
      expenseDialog: false,
      editDialog: false,
      editExDialog: false,
      incomeID: "",
      expenseID: "",
      incomeLoading: true,
      expenseLoading: true,
      valid: false,
      inputRules: [
        v => !!v || "Required",
        v => {
          if (!isNaN(parseFloat(v)) && v >= 0) return true;
          return "Must be a number";
        }
      ],
      numberRule: v => {
        if (!isNaN(parseFloat(v)) && v >= 0) return true;
        return "Must be a number";
      },
      wordRules: [v => !!v || "Required"]
    };
  },
  methods: {
    editIncome: function(id) {
      db.collection("income")
        .doc(id)
        .update({
          amount: this.income,
          fedTax: this.fedTax,
          stateTax: this.stateTax,
          fica: this.fica,
          title: this.incomeTitle
        })
        .then(function() {
          console.log("Document successfully written!");
          this.income = "";
          this.fedTax = "";
          this.stateTax = "";
          this.fica = "";
          this.title = "";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    editExpense: function(id) {
      db.collection("expense")
        .doc(id)
        .update({
          amount: this.expense,
          title: this.expenseTitle
        })
        .then(function() {
          console.log("Document successfully written!");
          //this.expense = 0;
          //this.title = "";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    deleteIncome: function(id) {
      db.collection("income")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
          this.income = "";
          this.fedTax = "";
          this.stateTax = "";
          this.fica = "";
          this.title = "";
          this.incomeID = "";
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    deleteExpense: function(id) {
      this.expenseDialog = false;
      db.collection("expense")
        .doc(id)
        .delete()
        .then(function() {
          console.log("expense item deleted");
          this.expenseID = "";
        })
        .catch(function(error) {
          console.error("error removing expense doc: ", error);
        });
    }
  },
  created() {
    db.collection("income").onSnapshot(res => {
      const changes = res.docChanges();
      console.log("loading", this.incomeLoading);
      this.incomeLoading = false;
      console.log("loading", this.incomeLoading);

      changes.forEach(change => {
        console.log(change.type);
        if (change.type === "added") {
          this.incomeCards.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type === "removed") {
          var id = change.doc.id;
          console.log(change.doc.id);
          this.incomeCards = this.incomeCards.filter(function(item) {
            return item.id != id;
          });
        } else if (change.type === "modified") {
          var editID = change.doc.id;
          this.incomeCards = this.incomeCards.filter(function(item) {
            return item.id != editID;
          });
          this.incomeCards.push({
            ...change.doc.data()
          });
        }
      });
    });

    db.collection("expense").onSnapshot(res => {
      const changes = res.docChanges();
      this.expenseLoading = false;

      changes.forEach(change => {
        if (change.type === "added") {
          this.expenseCards.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type === "removed") {
          var id = change.doc.id;
          this.expenseCards = this.expenseCards.filter(function(item) {
            return item.id != id;
          });
        } else if (change.type === "modified") {
          var editID = change.doc.id;
          this.expenseCards = this.expenseCards.filter(function(item) {
            return item.id != editID;
          });
          this.expenseCards.push({
            ...change.doc.data()
          });
        }
      });
    });
  },
  components: {
    AddIncomeDialog,
    AddExpenseDialog
    //DeleteIncomeDialog
  }
};
</script>
