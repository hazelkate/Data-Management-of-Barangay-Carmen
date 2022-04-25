<template>
    <div>

    </div>
</template>

<script>
    import Moralis from 'moralis'
    export default {
        methods: {
            async create (){
                const user = new Moralis.User();
                user.set("username", "test");
                user.set("password", "test");
                user.set("email", "test@gmail.com");
                user.set("role", "employee");

                try {
                    await user.signUp();
                    // Hooray! Let them use the app now.
                    } catch (error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            }
        },

        mounted() {
            this.create()
        },
    }
</script>

<style lang="scss" scoped>

</style>