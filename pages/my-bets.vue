<template>
  <div class="my-bets">
    <ConfirmModal
      :data="modalData"
      :show-modal="confirmModal"
      @hide-modal="confirmModal = false"
      @success="updateTables"
    />
    <div class="page-headline">My bets</div>
    <Table
      v-if="rData.rows.length"
      class="mb-24"
      :data="rData"
      :label="'Received bets'"
      @accept="showConfirmModal"
      @decline="declineBet"
    />
    <Table
      v-if="cData.rows.length"
      class="mb-24"
      :label="'Confirmed bets'"
      :data="cData"
      @accept="showConfirmModal"
      @decline="declineBet"
    />
  </div>
</template>

<script>
import Table from "~/components/ui/Table.vue";
import ConfirmModal from "~/components/ui/modals/ConfirmBetModal.vue";
export default {
  name: "MyBets",
  components: {
    Table,
    ConfirmModal,
  },
  async asyncData({ store }) {
    const cBets = (await store.dispatch("bets/confirmed")).results;
    const rBets = (await store.dispatch("bets/received")).results;
    const rData = {
      headers: [
        {
          title: "Received from",
        },
        {
          title: "Amount",
        },
        {
          title: "Match",
        },
        {
          title: "Date",
        },
        {},
      ],
      rows: [],
    };
    const cData = {
      headers: [
        {
          title: "Received from",
        },
        {
          title: "Amount",
        },
        {
          title: "Match",
        },
        {
          title: "Date",
        },
        {},
      ],
      rows: [],
    };
    cBets.forEach((row) => {
      const bettingObj = {
        winner: row.winner.name + " to win",
      };
      cData.rows.push({
        col0: { header: row.opponent.email, expanded: bettingObj },
        col1: { header: row.amount },
        col2: {
          header: row.match.awayTeam.name + " - " + row.match.homeTeam.name,
        },
        col3: { header: row.match.date },
        data: row.id,
        actions: ["details"],
      });
    });
    rBets.forEach((row) => {
      const bettingObj = {
        winner: row.winner.name + " to win",
      };
      rData.rows.push({
        col0: { header: row.opponent.email, expanded: bettingObj },
        col1: { header: row.amount },
        col2: {
          header: row.match.awayTeam.name + " - " + row.match.homeTeam.name,
        },
        col3: { header: row.match.date },
        data: row.id,
        actions: ["accept", "decline", "details"],
      });
    });
    return { rData, cData };
  },
  data() {
    return {
      confirmModal: false,
      modalData: null,
    };
  },
  methods: {
    async showConfirmModal(id) {
      this.modalData = await this.$store.dispatch("bets/info", id);
      this.confirmModal = true;
    },
    declineBet() {
      console.log("decline");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/my-bets";
</style>
