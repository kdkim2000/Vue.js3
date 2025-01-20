<template>
  <v-container>
    <!-- Toolbar -->
    <v-toolbar flat density="compact">
      <v-toolbar-title class="text-grey">
        Project Dashboard
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Cards -->
    <v-row class="mt-1">
      <!-- First Row -->
      <v-col cols="12" sm="12" md="8" lg="8" xl="8" xxl="8">
        <OverseasProduction />
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" xl="4" xxl="4">
        <DispatchStatus />
      </v-col>
    </v-row>

    <v-row class="mt-1">
      <!-- Second Row -->
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <ProjectProgress />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <BlueprintStatus />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <MaterialArrivalRate />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <ProductionProgress />
      </v-col>
    </v-row>

    <v-row>
      <!-- Third Row -->
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <InspectionStatus />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <PunchClosureStatus />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <WeldingDefectRate />
      </v-col>
      <v-col cols="12" sm="6" md="3" lg="3" xl="3" xxl="3">
        <WorkforceStatus />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import OverseasProduction from "@/components/cards/OverseasProduction.vue";
import DispatchStatus from "@/components/cards/DispatchStatus.vue";
import ProjectProgress from "@/components/cards/ProjectProgress.vue";
import BlueprintStatus from "@/components/cards/BlueprintStatus.vue";
import MaterialArrivalRate from "@/components/cards/MaterialArrivalRate.vue";
import ProductionProgress from "@/components/cards/ProductionProgress.vue";
import InspectionStatus from "@/components/cards/InspectionStatus.vue";
import PunchClosureStatus from "@/components/cards/PunchClosureStatus.vue";
import WeldingDefectRate from "@/components/cards/WeldingDefectRate.vue";
import WorkforceStatus from "@/components/cards/WorkforceStatus.vue";
</script>
