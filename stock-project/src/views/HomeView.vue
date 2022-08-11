<template>
  <Tabs :activeTabId="index"></Tabs>
</template>

<script>
import Tabs from "../components/Tabs.vue";

export default {
  data: () => ({
    index: 1,
  }),
  components: {
    Tabs,
  },
  methods: {
    changeActiveTabId: function () {
      if (
        window.location.pathname == "/" ||
        window.location.pathname == "/stocks"
      ) {
        this.index = 0;
      } else {
        this.index = 1;
      }
    },
  },
  watch: {
    $route(to, from) {
      this.changeActiveTabId();
    },
  },
  mounted() {
    this.changeActiveTabId();
  },
};
</script>
