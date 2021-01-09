<template>
  <div>
    <div class="my-4">
      <h4 class="text-h4">Record history</h4>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Open</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>1212</td>
            <td>12.12.32</td>
            <td>Name</td>
            <td>
              <v-chip color="red white--text" small>Consumption</v-chip>
            </td>
            <td>
              <v-btn color="secondary" small to="/detail-record">
                <i class="material-icons">open_in_new</i>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
