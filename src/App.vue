<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
             <router-link :to="{ name: 'Home' }" class='nav-link' exact>
                <img src="./assets/build-a-bot-logo.png" alt="build-a-bot-logo" class="logo" />
                Build a bot
              </router-link >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Build' }" class='nav-link' exact>
                Build
              </router-link >
          </li>
          <li class="nav-item cart">
            <router-link to="/cart" class='nav-link' exact>
              Cart
              <span class="cart-items">{{cart.length}}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="mainContainer">
      <aside>
         <router-view name="sidebar" />
      </aside>
      <main>
        <router-view /> <!-- name="default" by default -->
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
};
</script>

<style>
body{
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main {
  padding: 30px;
  background-color: white;
  width: 964px;
  min-height: 300px;
}
header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
.router-link-active {
  /* a Vue native property */
  color: whitesmoke;
}
.mainContainer {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}
aside {
  padding: 30px;
  background-color: #aaa;
  width: 100px;
  min-height: 300px;
}
.nav-item.cart {
  position: relative;
  margin-left: auto;
  border-right: none;
}
.cart-items {
  position:absolute;
  top:-5px;
  right:-9px;
  font-size: 16px;
  width: 24px;
  text-align: center;
  display: inline-block;
  border-radius: 100px;
  background-color: mediumseagreen;
}
</style>
