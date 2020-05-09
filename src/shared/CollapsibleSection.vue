<template>
  <section>
    <div class="header">
      <span v-show="open" @click="open = !open">&#x25bc; collapse</span>
      <span v-show="!open" @click="open = !open">&#x25b2; expand</span>
    </div>
    <slot v-if="open"><!-- Default content for slot if nothing is injected --></slot>
  </section>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  data() {
    return { open: true };
  },
};
</script>
<style scoped>
.header {
  background-color: #bbb;
  padding: 3px;
  cursor: pointer;
}
.header span {
  width: 100%;
  /* block or inline-block so width can take effect */
  display:block;
}
</style>
