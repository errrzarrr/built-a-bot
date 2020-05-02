<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']" >
        <section class="robot-name">
          {{selectedPart.head.title}}
          <span v-show="selectedPart.head.onSale" class="sale">On Sale!</span>
        </section>
        <img v-bind:src="selectedPart.head.src" title="head"  />
        <button v-on:click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button v-on:click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedPart.leftArm.src" title="left arm"/>
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img v-bind:src="selectedPart.torso.src" title="left arm"/>
        <button v-on:click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button v-on:click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img v-bind:src="selectedPart.rightArm.src" title="left arm"/>
        <button v-on:click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button v-on:click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img v-bind:src="selectedPart.base.src" title="left arm"/>
        <button v-on:click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button v-on:click="selectNextBase()"  class="next-selector">&#9658;</button>
      </div>
    </div>
    <section class="cart-table">
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Robot</th>
            <th class="cost">Cost</th>
          </tr>
          <tbody>
            <tr v-for="(robot,index) in cart" :key="index">
              <td class="title">{{robot.head.title}}</td>
              <td class="cost">{{robot.cost}}</td>
            </tr>
          </tbody>
        </thead>
      </table>
    </section>
  </div>
</template>

<script>
import parts from '../data/parts';
import createdHookMixin from './created-hook-mixin';

function getPrevValidIndex(index, length) {
  const decreasedIndex = index - 1;
  return decreasedIndex < 0 ? length - 1 : decreasedIndex;
}

function getNextValidIndex(index, length) {
  const increasedIndex = index + 1;
  return increasedIndex > length - 1 ? 0 : increasedIndex;
}

export default {
  name: 'RobotBuilder',
  data() {
    return {
      parts,
      headIndex: 0,
      rightArmIndex: 0,
      leftArmIndex: 0,
      torsoIndex: 0,
      baseIndex: 0,
      cart: [],
    };
  },
  methods: {
    addToCart() {
      const robot = this.selectedPart;
      const cost = robot.head.cost
        + robot.torso.cost
        + robot.rightArm.cost
        + robot.leftArm.cost
        + robot.base.cost;
      // eslint-disable-next-line prefer-object-spread
      this.cart.push(Object.assign({}, robot, { cost }));
      return cost;
    },
    selectNextHead() {
      this.headIndex = getNextValidIndex(this.headIndex, parts.heads.length);
    },
    selectPreviousHead() {
      this.headIndex = getPrevValidIndex(this.headIndex, parts.heads.length);
    },
    selectNextRightArm() {
      this.rightArmIndex = getNextValidIndex(this.rightArmIndex, parts.arms.length);
    },
    selectPreviousRightArm() {
      this.rightArmIndex = getPrevValidIndex(this.rightArmIndex, parts.arms.length);
    },
    selectNextLeftArm() {
      this.leftArmIndex = getNextValidIndex(this.leftArmIndex, parts.arms.length);
    },
    selectPreviousLeftArm() {
      this.leftArmIndex = getPrevValidIndex(this.leftArmIndex, parts.arms.length);
    },
    selectNextTorso() {
      this.torsoIndex = getNextValidIndex(this.torsoIndex, parts.torsos.length);
    },
    selectPreviousTorso() {
      this.torsoIndex = getPrevValidIndex(this.torsoIndex, parts.torsos.length);
    },
    selectNextBase() {
      this.baseIndex = getNextValidIndex(this.baseIndex, parts.bases.length);
    },
    selectPreviousBase() {
      this.baseIndex = getPrevValidIndex(this.baseIndex, parts.bases.length);
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
    selectedPart() {
      return {
        head: parts.heads[this.headIndex],
        torso: parts.torsos[this.torsoIndex],
        base: parts.bases[this.baseIndex],
        rightArm: parts.arms[this.rightArmIndex],
        leftArm: parts.arms[this.leftArmIndex],
      };
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
  position: absolute;
  right: 30px;
  width: 220px;
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
</style>
