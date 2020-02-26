<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field name="funds" label="Enter Income" id="funds"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn outline color="primary" dark>Enter</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card xs12 class="mx-auto" max-width="400">
          <div class="ma-3">Income</div>
          <div>
            <v-row>
              <v-text-field box class="ma-3" label="Check 1"></v-text-field>
              <v-checkbox label="Paid" v-model="value" value="value"></v-checkbox>
            </v-row>
          </div>
          <div></div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


