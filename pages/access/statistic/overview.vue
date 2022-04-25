<template>
  <div>
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="primary"
              @click="setResident()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-account-group</v-icon>
                  Resident
                </v-card-title>
                <v-card-subtitle>
                  Total Resident: {{resident.count}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
      
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="pink"
              @click="setOutofschool()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-school</v-icon>
                  Out of school youth
                </v-card-title>
                <v-card-subtitle>
                  Total out of school youth: {{outofyouth.count}} out of {{resident.count}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="teal"
              :loading="!initload"
              @click="setVoter()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-vote</v-icon>
                  Voters
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Registered Voter: {{voterCount[0].length}} out of {{voterCount[1].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>


        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="purple"
              :loading="!initload"
              @click="setJob()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-briefcase-variant</v-icon>
                  Employed / Unemployed
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Employed Resident: {{employedCount[0].length}} out of {{employedCount[1].length}}
                </v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="brown"
              :loading="!initload"
              @click="setMaleCount()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-human-male</v-icon>
                  Sex Ratio
                </v-card-title>
                <v-card-text v-if="initload">
                  Total Male: {{genderCount[0].length}} <br>
                  Total Female: {{genderCount[1].length}}
                </v-card-text>
            </v-card>
          </v-hover>

        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="brown"
              :loading="!initload"
              @click="setAge()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-cake</v-icon>
                  Age Bracket
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Total Child: {{ageCount[0].length}} <br>
                  Total Adolescent: {{ageCount[1].length}} <br>
                  Total Adult: {{ageCount[2].length}} <br>
                  Total Senior: {{ageCount[3].length}} <br>
                </v-card-subtitle>
            </v-card>
          </v-hover>
          
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="brown"
              :loading="!initload"
              @click="setMortalityCount()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-emoticon-dead</v-icon>
                  Mortality rate
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Mortality rate: {{mortalityCount[0].length}} of {{mortalityCount[1].length}}
                  
                </v-card-subtitle>
            </v-card>
          </v-hover>
          
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="brown"
              :loading="!initload"
              @click="setVaccinationCount()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-needle</v-icon>
                  Vaccination
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Vaccination Status {{mortalityCount[0].length}} of {{mortalityCount[1].length}}
                  
                </v-card-subtitle>
            </v-card>
          </v-hover>
          
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              v-if="zone.length != 0"
              :elevation="hover ? 12 : 1"
              :class="{ 'on-hover': hover }"
              dark
              color="brown"
              :loading="!initload"
              @click="setZone()"
            >
              
                <v-card-title>
                  <v-icon dark class="mr-2">mdi-home</v-icon>
                  Resident with in the Zone
                </v-card-title>
                <v-card-subtitle v-if="initload">
                  Zone 1 residents : {{zoneCount[0].length}} <br>
                  Zone 2 residents : {{zoneCount[1].length}}  <br>
                  Zone 3 residents : {{zoneCount[2].length}} <br>
                  Zone 4 residents : {{zoneCount[3].length}} <br>
                  Zone 5 residents : {{zoneCount[4].length}} <br>
                  Zone 6 residents : {{zoneCount[5].length}} <br>
                  Zone 7 residents : {{zoneCount[6].length}} <br>
                  Zone 8 residents : {{zoneCount[7].length}} <br>
                  Zone 9 residents : {{zoneCount[8].length}} <br>
                  Zone 10 residents : {{zoneCount[9].length}} <br>
                  Zone 11 residents : {{zoneCount[10].length}} <br>
                  Zone 12 residents : {{zoneCount[11].length}} <br>
                  Zone 13 residents : {{zoneCount[12].length}} <br>
                </v-card-subtitle>
            </v-card>
          </v-hover>
          
        </v-col>


    </v-row>


    <ResidentList v-if="loadchart == ''" class="my-15"/>

    <v-row
     v-if="loadchart != ''"
    >
        <v-col>
            <v-card
            tile
            height="430"
            >
                <v-card-title class="caption">
                   Chart Preview&nbsp;<b>{{loadchart}}</b>
                </v-card-title>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Voters'"
                >
                   <VoterChart
                      :samplerecord="samplerecord" :samplelabel="samplelabel"
                    />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Job'"
                >
                   <JobChart
                      :samplerecord="samplerecord" :samplelabel="samplelabel"
                    />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Outofschool'"
                >
                  <OutOfSchool
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Male'"
                >
                  <MaleChart
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Mortality'"
                >
                  <MortalityChart
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Vaccination'"
                >
                  <VaccinationChart
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Age'"
                >
                  <AgeChart 
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

                <v-card-text
                  class="mt-10"
                  v-if="loadchart == 'Zone'"
                >
                  <ZoneChart 
                    :samplerecord="samplerecord" :samplelabel="samplelabel"
                  />
                </v-card-text>

            </v-card>
        </v-col>



        <v-col>
            <v-card
            tile
            >

            <v-card-text v-if="loadchart == 'Voters'">
                <v-subheader>Registered Voters</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('voter')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Unregistered Voters</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('voter')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Job'">
                <v-subheader>Employed Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('job')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Unemployed Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('job')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>


            <v-card-text v-if="loadchart == 'Mortality'">
                <v-subheader>Dead Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('mortality')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>

                <v-subheader>Alive Residents</v-subheader>

                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('mortality')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Vaccination'">
                <v-subheader>anti tetanus vaccinated</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

                <v-divider></v-divider>

                <v-subheader>covid vaccinated</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

                <v-divider></v-divider>

                <v-subheader>small pox vaccinated</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[2]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

                <v-divider></v-divider>

                <v-subheader>MMR vaccinated</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[3]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>





            </v-card-text>

            <v-card-text v-if="loadchart == 'Zone'">

                <v-subheader>Zone 1</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[0]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 2</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[1]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 3</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[2]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 4</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[3]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 5</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[4]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 6</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[5]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 7</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[6]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 8</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[7]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 9</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[8]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 10</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[9]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 11</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[10]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 12</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[11]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>

                 <v-subheader>Zone 13</v-subheader>

                  <v-virtual-scroll
                    bench="0"
                    :items="zoneCount[12]"
                    height="150"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item
                      :key="item"
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                          <v-list-item-subtitle>{{item.get('vaccine')}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>

                <v-divider></v-divider>





            </v-card-text>

            <v-card-text v-if="loadchart == 'Age'">
                <v-subheader>Child Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('age')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

                <v-divider></v-divider>

                <v-subheader>Adolescent residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('age')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

                <v-divider></v-divider>

                <v-subheader>Adult residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[2]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('age')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

                <v-divider></v-divider>

                <v-subheader>Senior residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[3]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('age')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>





            </v-card-text>


            <v-card-text v-if="loadchart == 'Female'">
                <v-subheader>Female Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Male Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Male'">
                <v-subheader>Male Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[0]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
                <v-divider></v-divider>
                <v-subheader>Female Residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record[1]"
                  height="150"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('firstname')}} {{item.get('middlename')}} {{item.get('lastname')}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.get('sex')}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            <v-card-text v-if="loadchart == 'Outofschool'">
                <v-subheader>Out of school residents</v-subheader>
                <v-virtual-scroll
                  bench="0"
                  :items="record"
                  height="350"
                  item-height="64"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item
                    :key="item"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.get('resident').get('firstname')}} {{item.get('resident').get('middlename')}} {{item.get('resident').get('lastname')}}</v-list-item-title>
                        <!-- <v-list-item-subtitle>{{item}}</v-list-item-subtitle> -->
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
            </v-card-text>

            </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
import MaleChart from '~/components/MaleChart.vue';
import AgeChart from '~/components/AgeChart.vue';
import ZoneChart from '~/components/ZoneChart.vue';
import FemaleChart from '~/components/FemaleChart.vue';
import VoterChart from '~/components/VoterChart.vue';
import JobChart from '~/components/JobChart.vue';
import VaccinationChart from '~/components/VaccinationChart.vue';
import MortalityChart from '~/components/MortalityChart.vue';
import OutOfSchool from '~/components/OutofschoolChart.vue';
import ResidentList from '~/components/Resident.vue';
import Moralis from 'moralis';
  export default {
    components :{
        VoterChart,
        JobChart,
        OutOfSchool,
        FemaleChart,
        MaleChart,
        AgeChart,
        ZoneChart,
        ResidentList,
        MortalityChart,
        VaccinationChart
    },
    data: () => ({
      initload: false,
      resident:[],
      outofyouth:[],
      vaccine:[],
      zone: [],


      voterCount: [],
      employedCount:[],
      genderCount: [],
      ageCount:[],
      mortalityCount:[],
      vaccinationCount:[],
      zoneCount:[],

      samplerecord: [],
      samplelabel: [],

      loadchart: "",

      record: [],
      transparent: 'rgba(255, 255, 255, 0)',
    }),

    methods:{

      setResident : function (){
        this.loadchart = "";
      },

      setVoter : function (){
        this.loadchart = "Voters"
        this.samplerecord = [this.voterCount[0].length,this.voterCount[1].length]
        this.samplelabel = ["Registered","Unregistered"]
        this.record.push(this.voterCount[0])
        this.record.push(this.voterCount[1])
      },

      loadVoterCount : function (obj){
        let result = [];
        let registered = obj.results.filter(item => item.attributes.voter == "Registered");
        let unregistered = obj.results.filter(item => item.attributes.voter == "Unregistered");
        result[0] = registered;
        result[1] = unregistered;
        return result
      },

      loadMortalityCount : function(obj){
        let result     = [];
        let dead      = obj.results.filter(item => item.attributes.mortality == "Dead"  );
        let alive     = obj.results.filter(item => item.attributes.mortality == "Alive" );
        result[0] = dead;
        result[1] = alive;
        return result

      },

      loadVaccinationCount : function(obj){
        let result     = [];
        let Anti_tetanus = obj.results.filter(item => item.attributes.vaccine == "Anti Tetanus"  );
        let Covid        = obj.results.filter(item => item.attributes.vaccine == "Covid Vaccine" );
        let small_pox    = obj.results.filter(item => item.attributes.vaccine == "Small Pox" );
        let mmr          = obj.results.filter(item => item.attributes.vaccine == "MMR Vaccine" );

        result[0] = Anti_tetanus;
        result[1] = Covid;
        result[2] = small_pox;
        result[3] = mmr;
        return result

      },

      setVaccinationCount : function(){
        this.record = []
        this.loadchart = "Vaccination"
        
        this.samplerecord = [ 
          this.vaccinationCount[0].length ,
          this.vaccinationCount[1].length ,
          this.vaccinationCount[2].length ,
          this.vaccinationCount[3].length ,
        ]

        this.samplelabel = ["Anti_tetanus","Covid" , "small_pox" , "mmr"]
        this.record.push(this.vaccinationCount[0])
        this.record.push(this.vaccinationCount[1])
        this.record.push(this.vaccinationCount[2])
        this.record.push(this.vaccinationCount[3])


      },

      setMortalityCount : function(){
        this.record = []
        this.loadchart = "Mortality"
        this.samplerecord = [ this.mortalityCount[0].length , this.mortalityCount[1].length ]
        this.samplelabel = ["Dead","Alive"]
        this.record.push(this.mortalityCount[0])
        this.record.push(this.mortalityCount[1])

      },

      loadAgeCount : function (obj){
        let result     = [];
        let child      = obj.results.filter(item => (item.attributes.age >= 0 && item.attributes.age <= 13));
        let adolescent = obj.results.filter(item => (item.attributes.age >= 14 && item.attributes.age <= 20));
        let adult	     = obj.results.filter(item => (item.attributes.age >= 21 && item.attributes.age <= 59));
        let senior     = obj.results.filter(item => item.attributes.age >= 60); 

        result[0] = child;
        result[1] = adolescent;
        result[2] = adult;
        result[3] = senior;
        return result
      },

      loadZoneCount : function (obj){
        let result     = [];
        let zone1      = obj.filter(item => item.attributes.zone == "Zone 1");
        let zone2      = obj.filter(item => item.attributes.zone == "Zone 2");
        let zone3      = obj.filter(item => item.attributes.zone == "Zone 3");
        let zone4      = obj.filter(item => item.attributes.zone == "Zone 4");
        let zone5      = obj.filter(item => item.attributes.zone == "Zone 5");
        let zone6      = obj.filter(item => item.attributes.zone == "Zone 6");
        let zone7      = obj.filter(item => item.attributes.zone == "Zone 7");
        let zone8      = obj.filter(item => item.attributes.zone == "Zone 8");
        let zone9      = obj.filter(item => item.attributes.zone == "Zone 9");
        let zone10      = obj.filter(item => item.attributes.zone == "Zone 10");
        let zone11     = obj.filter(item => item.attributes.zone == "Zone 11");
        let zone12      = obj.filter(item => item.attributes.zone == "Zone 12");
        let zone13     = obj.filter(item => item.attributes.zone == "Zone 13");

        result[0] = zone1;
        result[1] = zone2;
        result[2] = zone3;
        result[3] = zone4;
        result[4] = zone5;
        result[5] = zone6;
        result[6] = zone7;
        result[7] = zone8;
        result[8] = zone9;
        result[9] = zone10;
        result[10] = zone11;
        result[11] = zone12;
        result[12] = zone13;

        return result;
        

      },

      setAge : function(){
        this.record = []
        this.loadchart = "Age"
        this.samplerecord = [ 
          this.ageCount[0].length , 
          this.ageCount[1].length , 
          this.ageCount[2].length , 
          this.ageCount[3].length  
          ]

        this.samplelabel = ["Child","Adolescent","Adult","Senior"]
        this.record.push(this.ageCount[0]);
        this.record.push(this.ageCount[1]);
        this.record.push(this.ageCount[2]);
        this.record.push(this.ageCount[3]);

      },

      setZone : function (){
        this.record = []
        this.loadchart = "Zone";
        this.samplerecord = [ 
          this.zoneCount[0].length ,
          this.zoneCount[1].length , 
          this.zoneCount[2].length , 
          this.zoneCount[3].length , 
          this.zoneCount[4].length , 
          this.zoneCount[5].length , 
          this.zoneCount[6].length , 
          this.zoneCount[7].length , 
          this.zoneCount[8].length , 
          this.zoneCount[9].length , 
          this.zoneCount[10].length , 
          this.zoneCount[11].length , 
          this.zoneCount[12].length , 
          ]

        this.samplelabel = [
          "Zone 1",
          "Zone 2",
          "Zone 3",
          "Zone 4",
          "Zone 5",
          "Zone 6",
          "Zone 7",
          "Zone 8",
          "Zone 9",
          "Zone 10",
          "Zone 11",
          "Zone 12",
          "Zone 13",
        ];
        this.record.push(this.zoneCount[0]);
        this.record.push(this.zoneCount[1]);
        this.record.push(this.zoneCount[2]);
        this.record.push(this.zoneCount[3]);
        this.record.push(this.zoneCount[4]);
        this.record.push(this.zoneCount[5]);
        this.record.push(this.zoneCount[6]);
        this.record.push(this.zoneCount[7]);
        this.record.push(this.zoneCount[8]);
        this.record.push(this.zoneCount[9]);
        this.record.push(this.zoneCount[10]);
        this.record.push(this.zoneCount[11]);
        this.record.push(this.zoneCount[12]);
        
      },

      setJob : function (){
        this.record = []
        this.loadchart = "Job"
        this.samplerecord = [this.employedCount[0].length,this.employedCount[1].length]
        this.samplelabel = ["Employed","Unemployed"]
        this.record.push(this.employedCount[0])
        this.record.push(this.employedCount[1])
      },

      loadEmployedCount : function (obj){
        let result = [];
        let employed = obj.results.filter(item => item.attributes.job == "Employed");
        let unemployed = obj.results.filter(item => item.attributes.job == "Unemployed");
        result[0] = employed;
        result[1] = unemployed;
        return result
      },

      setFemaleCount : function (){
        this.record = []
        this.loadchart = "Female"
        this.samplerecord = [this.genderCount[1].length,this.genderCount[0].length]
        this.samplelabel = ["Female","Male"]
        this.record.push(this.genderCount[1])
        this.record.push(this.genderCount[0])
      },

      setMaleCount : function (){
        this.record = []
        this.loadchart = "Male"
        this.samplerecord = [this.genderCount[0].length,this.genderCount[1].length]
        this.samplelabel = ["Male","Female"]
        this.record.push(this.genderCount[0])
        this.record.push(this.genderCount[1])
      },

  

      loadGenderCount : function (obj){
        let result = [];
        let male = obj.results.filter(item => item.attributes.sex == "Male");
        let female = obj.results.filter(item => item.attributes.sex == "Female");
        result[0] = male;
        result[1] = female;
        return result
      },

      async initResident (){
        const Resident = Moralis.Object.extend("Resident");
        const query = new Moralis.Query(Resident);
        query.withCount()
        const results = await query.find();
        this.resident =  results
        this.initload = true;
        this.mortalityCount = this.loadMortalityCount(this.resident);
        this.ageCount = this.loadAgeCount(this.resident);
        this.voterCount = this.loadVoterCount(this.resident);
        this.employedCount = this.loadEmployedCount(this.resident);
        this.genderCount = this.loadGenderCount(this.resident);
      },

      async loadResident (){
        const Resident = Moralis.Object.extend("Resident");
        const query = new Moralis.Query(Resident);
        const results = await query.find();
        this.users =  results.reverse();
      },

      setOutofschool : function (){
        this.record = []
        this.loadchart = "Outofschool"
        this.samplerecord = [this.outofyouth.count,this.resident.count]
        this.samplelabel = ["Out of school","Resident Records"]
        this.record = this.outofyouth.results;
      },

      async initOutOfSchoolYouth (){
        const Outofschool = Moralis.Object.extend("Outofschool");
        const query = new Moralis.Query(Outofschool);
        query.withCount()
        const results = await query.find();
        this.outofyouth =  results
      },
      async initVaccine (){
        const vaccine = Moralis.Object.extend("Vaccination");
        const query = new Moralis.Query(vaccine);
        query.withCount()
        const results = await query.find();
        this.vaccine =  results

        this.vaccinationCount = this.loadVaccinationCount(this.vaccine);
      },

      async loadZone (){
        const Zone = Moralis.Object.extend("Zone");
        const query = new Moralis.Query(Zone);
        const results = await query.find();
        this.zone = results;
        this.zoneCount = this.loadZoneCount(this.zone);
      },

    },

    mounted(){
      this.initResident();
      this.initOutOfSchoolYouth();
      this.initVaccine();
      this.loadZone();
      
    }
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