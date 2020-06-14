<template>
  <div class="d-flex justify-center">
    <v-card width="500">
      <v-card-title primary-title>
        Register your accout
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="validate"
        >
          <v-text-field
            v-model="username"
            :rules="nameRules"
            label="Username"
            required
          />

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Phone"
            required
          />

          <v-text-field
            v-model="password"
            :rules="passRules"
            label="Password"
            type="password"
            required
          />

          <v-text-field
            v-model="confPass"
            :rules="confPassRules"
            type="password"
            label="Confirm password"
            required
          />

          <div class="d-flex justify-content-end">
            <v-btn
              :loading="loading"
              class="mr-2"
              color="success"
              type="submit"
            >
              Submit
            </v-btn>
            <v-btn :loading="loading" color="error" class="mr-4" @click="reset">
              Reset Form
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import loGet from "lodash/get"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      confPass: "",
      email: "",
      phone: "",
      nameRules: [v => !!v || "Username is required"],
      phoneRules: [
        v => !!v || "Phone is required",
        v => /^\d{10}$/.test(v) || "Phone much be number and contains 10 number"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passRules: [
        v => !!v || "Password id required",
        v =>
          loGet(v, ["length"]) >= 6 ||
          "Password length much be greater than 6 characters"
      ],
      confPassRules: [
        v => !!v || "Password id required",
        v => v === this.password || "Confirm password does not match"
      ]
    }
  },
  computed: {
    ...mapGetters({
      loading: "user/getLoading",
      error: "user/getError"
    })
  },
  methods: {
    validate() {
      const { username, password, email, phone } = this
      if (this.$refs.form.validate()) {
        this.$store.dispatch("user/registerUser", {
          username,
          password,
          email,
          phone
        })
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped></style>
