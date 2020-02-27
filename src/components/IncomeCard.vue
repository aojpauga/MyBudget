<template>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <v-card xs12 class="mx-auto" max-width="500">
        <div class="ma-3">Income</div>
        <div>
          <v-row class="mx-auto">
            <v-text-field box class="ma-3" label="Check 1"></v-text-field>
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
</template>

<script>
export default {};
</script>
