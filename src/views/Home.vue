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
                <v-text-field class="ma-3" :label="card.inputLabel" v-model="card.amount"></v-text-field>

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
                          @click="dialog = false"
                          v-on:click.native="deleteIncome(incomeID)"
                        >Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>

                <!-- <DeleteIncomeDialog /> -->
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
      incomeTitle: "",
      incomeCards: [],
      expenseCards: [],
      count: 1,
      incomeDialog: false,
      expenseDialog: false,
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
    addIncomeCard: function() {
      this.count += 1;
      this.incomeCards.push({
        title: "Income",
        inputLabel: "Income " + this.count,
        cardIncome: 0
      });
    },
    deleteIncome: function(id) {
      this.incomeDialog = true;
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
        if (change.type === "added") {
          this.incomeCards.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        } else if (change.type === "removed") {
          var id = change.doc.data();
          console.log(change.doc.data());
          var index = this.incomeCards.indexOf(id);
          this.incomeCards.splice(index, 1);
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
          var id = change.doc.data();
          console.log(change.doc.data());
          var index = this.expenseCards.indexOf(id);
          this.expenseCards.splice(index, 1);
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
