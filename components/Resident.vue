<template>
  <div>
    <h1 class="mb-2">Resident</h1>
    <v-slide-group
      v-model="model"
      show-arrows
      :loading="!initload"
    >
      <v-slide-item
        v-for="(item,key) in resident.results"
        :key="key"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? '' : ''"
          class="ma-2 card"
          elevation="1"
          height="220"
          width="200"
          outlined
          @click="toggle"
        >
          <v-card-text class="d-flex flex-column caption">
              <span>Name: {{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}} </span>
              <span>Suffix: {{item.get('suffix')}}</span>
              <span>Age: {{item.get('age')}}</span>
              <span>Sex: {{item.get('sex')}}</span>
              <span>Job: {{item.get('job')}}</span>
              <span>Voter: {{item.get('voter')}}</span>
              <span>Mortality: {{item.get('mortality')}}</span>
              <span>Responsible: {{item.get('responsible').get('firstname')}} {{item.get('responsible').get('middlename')}} {{item.get('responsible').get('lastname')}}</span>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>


<script>

  import Moralis from 'moralis'
  export default {
    data: () => ({
      model: null,
      initload: false,
      resident:[]
    }),

    methods:{
        async initResident (){
            const response = await Moralis.Cloud.run("getResident");
            this.resident =  response
            this.initload = true;
        },
    },

    mounted() {
        this.initResident()
    },
  }
</script>



<style lang="scss" scoped>
.card {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>