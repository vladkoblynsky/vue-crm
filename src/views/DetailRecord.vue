<template>
  <div>
    <div>
      <v-breadcrumbs large>
        <v-breadcrumbs-item to="/history">
          History
        </v-breadcrumbs-item>
        <v-breadcrumbs-divider>
          <v-icon>mdi-chevron-right</v-icon>
        </v-breadcrumbs-divider>
        <v-breadcrumbs-item to="/history" disabled>
          Consumption
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-card class="p-4 light-blue white--text" outlined tile>
            <p>Описание:</p>
            <p>Сумма:</p>
            <p>Категория:</p>

            <small>12.12.12</small>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
