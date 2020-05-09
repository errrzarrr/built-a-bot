<template>
    <section>
        <h1>{{ part.title }}</h1>
        <div>{{ part.description }}</div>
    </section>
</template>

<script>
import parts from '../data/parts';

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
      return parts[type].find((part) => part.id === +id);
    },
  },
};
</script>
