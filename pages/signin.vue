<template>
  <div class="d-flex justify-center">
    <v-card width="500">
      <v-card-title primary-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="validate"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-text-field
            v-model="password"
            :rules="passRules"
            label="Password"
            type="password"
            required
          />

          <div class="d-flex justify-content-end">
            <v-btn
              :loading="loading"
              class="mr-2"
              color="success"
              type="submit"
            >
              Login
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import loGet from "lodash/get";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      valid: true,
      password: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passRules: [
        v => !!v || "Password id required",
        v =>
          loGet(v, ["length"]) >= 6 ||
          "Password length much be greater than 6 characters"
      ]
    };
  },
  computed: {
    ...mapGetters({
      loading: "user/getLoading",
      error: "user/getError"
    })
  },
  methods: {
    validate() {
      const { password, email } = this;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("user/loginUser", {
          password,
          identifier: email
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss" scoped></style>
