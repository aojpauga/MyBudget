<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container grid-list-xs>
              <v-form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="Email" type="email"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
  


<script>
export default {
  components: {}
};
</script>