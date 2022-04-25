<template>
    <v-app class="wallpaper">
        <v-main>
            <Nuxt />
        </v-main>
        <TheSnackbar />
    </v-app>
</template>

<script>
    import TheSnackbar from '@/components/TheSnackbar.vue';
    export default {
        middleware: 'is_loggedin' ,
        components:{
            TheSnackbar
        }
    }
</script>

<style lang="scss" scoped>
.wallpaper {
    background-image: url('~/assets/background.jpg');
    background-repeat:no-repeat;
    background-position: center;
    background-size: cover;
}


</style>