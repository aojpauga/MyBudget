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
            <div>
              <v-row class="mx-auto">
                <v-text-field class="ma-3" :label="card.inputLabel" v-model="card.amount"></v-text-field>
                <v-checkbox class="ma-3" label="Paid"></v-checkbox>
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
import db from "@/fb.js";
export default {
  data() {
    return {
      income: 0,
      incomeTitle: "",
      incomeCards: [],
      expenseCards: [],
      count: 1
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
  }
};
</script>
