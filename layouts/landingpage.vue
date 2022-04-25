<template>
    <v-app class="backgroundColor">
        <v-main>
            <Nuxt />
        </v-main>
    </v-app>
</template>



<style lang="scss" scoped>
.wallpaper {
    background-image: url('~/assets/cdo.jpg');
    background-repeat:no-repeat;
    background-position: center;
    background-size: cover;
}


.backgroundColor{
    background-color: #001e26;
}

</style>