<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field name="funds" label="Enter Income" id="funds" v-model="income"></v-text-field>
      </v-flex>
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
            <div>{{card.id}}</div>
            <div>
              <v-row class="mx-auto">
                <v-text-field class="ma-3" :label="card.inputLabel" v-model="card.amount"></v-text-field>

                <v-checkbox class="ma-3" label="Paid"></v-checkbox>
                <div class="text-center">
                  <v-dialog v-model="dialog" width="500" :retain-focus="false">
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
                <v-checkbox class="ma-3" label="Paid"></v-checkbox>
                <v-btn class="mx-2" fab dark small color="error">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
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
      dialog: false,
      incomeID: ""
    };
  },
  methods: {
    addIncome: function() {
      for (var card in this.cards) {
        this.income += card.cardIncome;
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
      db.collection("income")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
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
          var id = change.doc.id;
          console.log(id);
          for (var card in this.incomeCards) {
            this.incomeCards.splice(card, 1);
          }
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
