<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <div v-for="(item, i) in navs" :key="i">
          <v-list-group
            v-if="item.children && !item.auth"
            no-action
            :prepend-icon="item.icon"
            value="true"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(children, indexC) in item.children"
              :key="indexC"
              @click="$router.push(localePath(children.to, locale))"
            >
              <v-list-item-icon>
                <v-icon>{{ children.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t(children.title) }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-if="!item.children && !item.auth"
            @click="$router.push(localePath(item.to, locale))"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" text v-on="on">
            {{ locale }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in listLocales" :key="index">
            <v-btn small text @click="switchLocale(item)">
              {{ item }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :fixed="fixed" app>
      <span>&copy; Binh Nguyen 2020 </span>
    </v-footer>
    <v-snackbar
      v-model="snackbar"
      top
      :timeout="2500"
      :color="error ? 'error' : 'success'"
    >
      {{ error ? error : success }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { navs } from "../_nav";
export default {
  middleware: ["nuxtInit", "isAuth"],
  data() {
    return {
      snackbar: false,
      clipped: false,
      drawer: false,
      fixed: false,
      navs: navs(this),
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  computed: {
    ...mapGetters({
      locale: "getLocale",
      listLocales: "getListLocales",
      error: "getError",
      success: "getSuccess"
    })
  },
  watch: {
    error(newValue) {
      if (newValue !== null) {
        this.snackbar = true;
      } else {
        this.snackbar = false;
      }
    },
    success(newValue) {
      if (newValue !== null) {
        this.snackbar = true;
      } else {
        this.snackbar = false;
      }
    }
  },
  methods: {
    switchLocale(payload) {
      this.$store.dispatch("changeLocale", payload);
      this.$router.push(this.switchLocalePath(this.locale));
    }
  }
};
</script>

<style>
button:focus {
  outline: none;
}
</style>
