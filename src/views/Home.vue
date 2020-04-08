<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-col>
        <v-flex xs12>
          <AddIncomeDialog />
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
                <v-text-field class="ma-3" label="Amount" v-model="card.amount"></v-text-field>
                <v-text-field class="ma-3" label="Federal Tax" v-model="card.fedTax"></v-text-field>
                <v-text-field class="ma-3" label="State Tax" v-model="card.stateTax"></v-text-field>
                <v-text-field class="ma-3" label="FICA" v-model="card.fica"></v-text-field>

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
                          @click="incomeID=card.id"
                        >Edit</v-btn>
                      </template>
                      <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>

                        <v-card-text>Are you sure you want to edit this item?</v-card-text>
                        <v-text-field class="ma-3" label="Title" v-model="incomeTitle"></v-text-field>

                        <v-text-field class="ma-3" label="Amount" v-model="income"></v-text-field>
                        <v-text-field class="ma-3" label="Federal Tax" v-model="fedTax"></v-text-field>
                        <v-text-field class="ma-3" label="State Tax" v-model="stateTax"></v-text-field>
                        <v-text-field class="ma-3" label="FICA" v-model="fica"></v-text-field>

                        <v-text-field v-model="incomeID"></v-text-field>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="editDialog = false"
                            v-on:click.native="editIncome(incomeID)"
                          >Confirm</v-btn>
                          <v-btn color="error" text @click="editDialog = false">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
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
                <v-text-field class="ma-3" :label="card.inputLabel" v-model="card.amount"></v-text-field>
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
      fedTax: 0,
      stateTax: 0,
      fica: 0,
      incomeTitle: "",
      incomeCards: [],
      expenseCards: [],
      count: 1,
      incomeDialog: false,
      expenseDialog: false,
      editDialog: false,
      incomeID: "",
      expenseID: "",
      checkBox: false
    };
  },
  methods: {
    addToTotalIncome: function() {
      for (var card in this.incomeCards) {
        console.log(this.incomeCards[card].checkBox);

        if (this.incomeCards[card].checkBox == true) {
          console.log(this.incomeCards[card].checkBox);
          console.log(this.incomeCards[card].amount);
          this.income += Number(this.incomeCards[card].amount);
        }
      }
    },
    onsnap: function() {
      db.collection("income").onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === "added") {
            console.log(change.doc.id);
            var editId = change.doc.id;
            var editIndex = this.incomeCards.indexOf(editId);
            this.incomeCards.splice(editIndex, 1);
          }
        });
      });
    },
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
        })
        .catch(function(error) {
          console.error("error removing expense doc: ", error);
        });
    }
  },
  created() {
    db.collection("income").onSnapshot(res => {
      const changes = res.docChanges();

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
