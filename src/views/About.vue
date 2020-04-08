<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-row>
        <v-col>
          <v-flex xs12>
            <v-card xs12 class="pa-3" max-width="500" justify-space-around label="Total Income">
              <v-card-title primary-title>Total Income</v-card-title>
              {{income}}$
            </v-card>
          </v-flex>
        </v-col>
        <v-col>
          <v-flex xs12>
            <v-card class="pa-3" max-width="500" justify-space-around label="Total Expenes">
              <v-card-title primary-title>Total Expenses</v-card-title>
              {{expense}}$
            </v-card>
          </v-flex>
        </v-col>
      </v-row>
    </v-layout>
    <v-layout>
      <v-col>
        <v-card label="Total Federal Tax" class="pa-3" max-width="500" justify-space-around>
          <v-card-title primary-title>Total Federal Tax</v-card-title>
          {{fedTax}}$
        </v-card>
      </v-col>
      <v-col>
        <v-card label="Total Federal Tax" class="pa-3" max-width="500" justify-space-around>
          <v-card-title primary-title>Total State Tax</v-card-title>
          {{stateTax}}$
        </v-card>
      </v-col>
      <v-col>
        <v-card label="Total Federal Tax" class="pa-3" max-width="500" justify-space-around>
          <v-card-title primary-title>Total FICA Tax</v-card-title>
          {{fica}}$
        </v-card>
      </v-col>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-row>
          <v-col>
            <v-card
              class="pa-3 title"
              max-width="500"
              justify-space-around
            >Total Remaining Funds: {{total}}$</v-card>

            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              @click="calcTotals"
              class="pa-3"
              max-width="500"
              justify-space-around
            >Calculate Totals</v-btn>
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
      fedTax: 0,
      stateTax: 0,
      fica: 0,
      total: 0
    };
  },
  methods: {
    calcTotals: function() {
      console.log("called");
      console.log(this.incomeCards);
      for (var card in this.incomeCards) {
        console.log("here");
        console.log(this.incomeCards[card].amount);
        this.income += Number(this.incomeCards[card].amount);
        this.fedTax += Number(this.incomeCards[card].fedTax);
        this.stateTax += Number(this.incomeCards[card].stateTax);
        this.fica += Number(this.incomeCards[card].fica);
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
  mounted() {
    //   this.calcTotals();
    //   for (var card in this.incomeCards) {
    //     console.log("here");
    //     console.log(this.incomeCards[card].amount);
    //     this.income += Number(this.incomeCards[card].amount);
    //     this.fedTax += Number(this.incomeCards[card].fedTax);
    //     this.stateTax += Number(this.incomeCards[card].stateTax);
    //     this.fica += Number(this.incomeCards[card].fica);
    //   }
    //   for (var excard in this.expenseCards) {
    //     this.expense += Number(this.expenseCards[excard].amount);
    //   }
    //   this.total = this.income - this.expense;
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