<template>
  <div class="part" :class="position">
    <img @click="showPartInfo()" :src="selectedPart.src" title="arm"/>
    <button @click="selectPreviousPart()" class="prev-selector"></button>
    <button @click="selectNextPart()" class="next-selector"></button>
    <span v-pin="{ bottom: '10px', right: '10px' }"
      class="sale" v-show="selectedPart.onSale">Sale!</span>
  </div>
</template>

<script>

function getPrevValidIndex(index, length) {
  const decreasedIndex = index - 1;
  return decreasedIndex < 0 ? length - 1 : decreasedIndex;
}
function getNextValidIndex(index, length) {
  const increasedIndex = index + 1;
  return increasedIndex > length - 1 ? 0 : increasedIndex;
}

export default {

  props: {
    parts: {
      type: Array,
      required: true,
    },
    position: {
      type: String,
      required: true,
      validator(value) {
        return ['left', 'right', 'top', 'bottom', 'center'].includes(value);
      },
    },
  },
  data() {
    return { selectedPartIndex: 0 };
  },
  computed: {
    selectedPart() {
      return this.parts[this.selectedPartIndex];
    },
  },
  created() {
    this.$emit('partSelected', this.selectedPart);
  },
  updated() {
    this.$emit('partSelected', this.selectedPart);
  },
  methods: {
    showPartInfo() {
      // $router is available here, since it was injected in main.js file
      const params = { id: this.selectedPart.id, type: this.selectedPart.type };
      this.$router.push({ name: 'Parts', params });
    },
    selectNextPart() {
      this.selectedPartIndex = getNextValidIndex(this.selectedPartIndex, this.parts.length);
    },
    selectPreviousPart() {
      this.selectedPartIndex = getPrevValidIndex(this.selectedPartIndex, this.parts.length);
    },
  },
};

</script>

<style scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.sale {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  background-color: red;
  padding: 3px;
}
.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}
.part img {
  width:165px;
  cursor: pointer;
}
.top {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.bottom {
  border-top: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
  opacity:0.6;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
  opacity:0.6;
}
.left .prev-selector:after,  .right .prev-selector:after{
  content: '\25B2'
}
.left .next-selector:after, .right .next-selector:after {
  content: '\25BC'
}
.top .prev-selector:after, .bottom .prev-selector:after, .center .prev-selector:after{
  content: '\25C4'
}
.top .next-selector:after, .bottom .next-selector:after, .center .next-selector:after{
  content: '\25BA'
}
.center .prev-selector, .center .next-selector {
  opacity:0.5;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.highlight {
  border: 1px solid red;
}
</style>
