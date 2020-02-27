<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          name="funds"
          label="Enter Income"
          id="funds"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <v-btn outline color="primary" dark>Enter</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card
          xs12
          class="pa-3"
          max-width="500"
          justify-space-around
          v-for="card in cards"
          :key="card.title"
        >
          <div class="ma-3">{{ card.title }}</div>
          <div>
            <v-row class="mx-auto">
              <v-text-field
                box
                class="ma-3"
                :label="card.inputLabel"
              ></v-text-field>
              <v-checkbox
                class="ma-3"
                label="Paid"
                v-model="value"
                value="value"
              ></v-checkbox>
            </v-row>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn class="mx-2" fab dark color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "Income",
          inputLabel: "Check 1"
        },
        {
          title: "Expenses",
          inputLabel: "Expense 1"
        }
      ]
    };
  }
};
</script>
