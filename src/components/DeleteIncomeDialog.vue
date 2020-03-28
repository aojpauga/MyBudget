<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" :retain-focus="false">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Delete</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>

        <v-card-text>Are you sure you want to delete this item?</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
