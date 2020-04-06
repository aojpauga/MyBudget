<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-col>
        <v-flex xs12>
          <v-card xs12 class="pa-3" max-width="500" justify-space-around>{{income}}</v-card>
        </v-flex>
      </v-col>
      <v-col>
        <v-flex xs12>
          <v-card class="pa-3" max-width="500" justify-space-around>{{expense}}</v-card>
        </v-flex>
      </v-col>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-row>
          <v-col>
            <v-card
              class="pa-3"
              max-width="500"
              justify-space-around
            >Total Remaining Funds: {{total}}</v-card>
            <v-btn color="primary" dark @click="calcTotals">Calculate Totals</v-btn>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import db from "@/fb.js";

export default {
  data() {
    return {
      incomeCards: [],
      expenseCards: [],
      income: 0,
      expense: 0,
      total: 0
    };
  },
  methods: {
    calcTotals: function() {
      for (var card in this.incomeCards) {
        this.income += Number(this.incomeCards[card].amount);
      }
      for (var excard in this.expenseCards) {
        this.expense += Number(this.expenseCards[excard].amount);
      }
      this.total = this.income - this.expense;
    },
    addExpense: function() {
      for (var card in this.expenseCards) {
        this.expense += Number(this.expenseCards[card].amount);
      }
    }
  },
  created() {
    console.log("created called");
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
  }
};
</script>