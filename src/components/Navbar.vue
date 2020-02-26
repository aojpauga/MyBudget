<template>
<nav>
    <v-toolbar color="primary">
        <v-toolbar-title class="text-uppercase white--text">
            <span text-color="white" class="font-weight-light">my</span>
            <span color="primary">Budget</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn outline color="#E3F2FD" class="ma-2" router to="/Home">Home</v-btn>
        <v-btn outline color="#E3F2FD" class="ma-2" router to="/About">MyData</v-btn>
    </v-toolbar>
</nav>
    
</template>

<script>
export default {
    
}
</script>