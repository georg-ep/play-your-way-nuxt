<template>
  <div>
    <div class="headline mb-24">{{ label }}</div>
    <table>
      <tr>
        <th v-for="(header, index) in data.headers" :key="`th_${index}`">
          {{ header.title }}
        </th>
      </tr>
      <tr
        v-for="(row, index) in data.rows.slice(0, max)"
        :key="`row_${index}`"
        :class="rowStyles(row)"
      >
        <td
          v-for="(cell, index2) in formattedRow(row)"
          :key="`cell_${index2}`"
          :class="itemStyles(index)"
        >
          <div
            v-if="isAction(cell[0])"
            class="actions d-flex d-flex_center d-flex_top"
            :class="{ actions_expanded: isExpanded(index) }"
          >
            <div
              v-for="(action, index3) in cell[1]"
              :key="`action_${index3}`"
              :class="[action, 'action']"
              @click="handleAction(action, row.data, index)"
            >
              {{ action }}
            </div>
            <!-- <div v-if="isExpanded(index)" class="block_expanded" /> -->
          </div>
          <div v-else>
            <div class="block_header">
              {{ formatCell(cell, row) }}
            </div>
            <div
              :class="isExpanded(index) ? 'show' : 'hide'"
              class="block_expanded"
            >
              <div
                v-for="(condition, index4) in cell[1].expanded"
                :key="`condition_${index4}`"
                class="d-flex"
              >
                <div v-if="index2 === 0" class="liner mb-24 mt-24" />
                <div class="mb-24 mt-24">
                  {{ condition }}
                  <!-- {{ condition[0] }}{{ condition[1] }} -->
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import dateTimeMixin from "~/mixins/dateTimeMixin.js";

export default {
  name: "Table",
  mixins: [dateTimeMixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      max: 0,
      expandedRows: [],
    };
  },
  computed: {
    formattedRow() {
      return (row) => {
        return Object.entries(row).filter((row) => row[0] !== "data");
      };
    },
    rowStyles() {
      return (row) => {
        const config = {
          date: "date-row",
        };
        return row.type ? config[row.type] : "";
      };
    },
    itemStyles() {
      return (index) => (this.isExpanded(index) ? "table_item_expanded" : "");
    },
    isExpanded() {
      return (index) => this.expandedRows.includes(index);
    },
    formatCell() {
      return (cell) => {
        const config = {
          date: this.dateFormatter(cell[1].header),
        };
        return config[cell[0]] ?? cell[1].header;
      };
    },
    isAction() {
      return (key) => {
        return key === "actions";
      };
    },
  },
  mounted() {
    this.max = this.data.rows.length;
  },
  methods: {
    handleAction(action, data, index = 0) {
      this.$emit(action, data);
      console.log(action, data);
      if (action === "details") this.toggleRow(index);
    },
    toggleRow(index) {
      if (!this.expandedRows.includes(index))
        return this.expandedRows.push(index);
      this.expandedRows = this.expandedRows.filter((item) => item !== index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/table";
</style>
