<template>
  <div class="home">
    <section>
      <img src="../assets/robot-home.png" alt="" class="robot" aria-hidden="true" />
    </section>
    <section class="get-started">
      <router-link to="/build">Get started</router-link> building your first robot!
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

.robot {
  height: 300px;
}
</style>
