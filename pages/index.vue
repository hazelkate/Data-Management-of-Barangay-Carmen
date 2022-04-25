<template>
    <div class="center-screen d-flex flex-column">

        <h1
        class="logofont"
        >
            Barangay Carmen
        </h1>

        <small style="color:white" class="overline">Data management</small>

        <v-btn
        class="mt-2"
        rounded
        color="#00dc82"
        style="text-transform: none;"
        to="/login"
        >
            Get Started
        </v-btn>

    </div>
</template>

<script>
    export default {
        layout: 'landingpage'
    }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;700&family=Permanent+Marker&display=swap');
.logofont{
font-family: 'Kalam', cursive;
font-family: 'Permanent Marker', cursive;
color: white;
}

.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>