<template>
  <div class="content" v-if="availableParts">
    <div class="preview">
      <CollapsibleSection>
      <div class="preview-content">
        <div class="top-row">
          <img :src="selectedPart.head.src"/>
        </div>
        <div class="middle-row">
          <img :src="selectedPart.leftArm.src" class="rotate-left"/>
          <img :src="selectedPart.torso.src"/>
          <img :src="selectedPart.rightArm.src" class="rotate-right"/>
        </div>
        <div class="bottom-row">
          <img :src="selectedPart.base.src"/>
        </div>
      </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <div class="top-row">
        <PartSelector :parts="availableParts.heads" position="top"
        @partSelected="part=>selectedPart.head=part" />
    </div>
    <div class="middle-row">
      <PartSelector :parts="availableParts.arms" position="left"
      @partSelected="part=>selectedPart.leftArm=part"/>
      <PartSelector :parts="availableParts.torsos" position="center"
      @partSelected="part=>selectedPart.torso=part" />
      <PartSelector :parts="availableParts.arms" position="right"
      @partSelected="part=>selectedPart.rightArm=part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="availableParts.bases" position="bottom"
      @partSelected="part=>selectedPart.base=part"/>
    </div>
  </div>
</template>

<script>

import createdHookMixin from './created-hook-mixin';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',

  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      // eslint-disable-next-line
      const userResponse = confirm("You have not added your robot to your cart, changes will be lost. Are you sure you want to leave?");
      next(userResponse);
    }
  },
  components: { PartSelector, CollapsibleSection },
  data() {
    return {
      addedToCart: false,
      selectedPart: {
        head: {},
        torso: {},
        base: {},
        rightArm: {},
        leftArm: {},
      },
    };
  },
  created() {
    this.$store.dispatch('getPartsFromAPI');
  },
  methods: {
    addToCart() {
      const robot = this.selectedPart;
      const cost = robot.head.cost
        + robot.torso.cost
        + robot.rightArm.cost
        + robot.leftArm.cost
        + robot.base.cost;
      this.addedToCart = true;
      // eslint-disable-next-line prefer-object-spread
      this.$store.dispatch('addRobotToCart', Object.assign({}, robot, { cost }));
      return cost;
    },
  },
  computed: {
    saleBorderClass() {
      return this.selectedPart.head.onSale ? 'sale-border' : '';
    },
    headBorderStyle() {
      const style = this.selectedPart.head.onSale ? '3px solid red' : '3px solid #aaa';
      return style;
    },
    availableParts() {
      return this.$store.state.parts;
    },
  },
  mixins: [createdHookMixin],
};
</script>

<!-- scoped: because global atributes shouldn't be in child components -->
<style lang="scss" scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part {
  img {
    width:165px;
  }
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
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
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  width: 100%;
  text-align: center;
}
.sale {
  color:green;
  font-weight: bold;
}
.content {
  position: relative;
}
.add-to-cart {
  position: relative;
  width: 100%;
  padding: 3px;
  font-size: 16px;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.preview {
  position: absolute;
  top: -20px;
  right: 10px;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}

</style>
