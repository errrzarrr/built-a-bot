<template>
    <section>
        <h1>{{ part.title }}</h1>
        <div>{{ part.description }}</div>
    </section>
</template>

<script>
import getPartsMixin from './get-parts-mixin';

export default {
  name: 'PartInfo',
  props: {
    type: { type: String },
    id: { type: [Number, String] },
    validator(value) {
      return Number.isInteger(Number(value));
    },
  },
  computed: {
    part() {
      const { type, id } = this;
      return this.parts[type].find((part) => part.id === +id);
    },
  },
  mixins: [getPartsMixin],
};
</script>
