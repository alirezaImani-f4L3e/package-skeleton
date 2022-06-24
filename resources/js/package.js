import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VModal from "vue-js-modal";
import SampleListing from "./components/SamplesListing";

Vue.use(VModal);
Vue.use(BootstrapVue);

new Vue({
  el: "#app-package-skeleton",
  data: {
    filter: "",
    sample: {
      id: "",
      email: "",
    },
    addError: {
      email: null,
    },
    action: "Add",
  },
  components: { SampleListing },
  methods: {
    reload() {
      this.$refs.listing.dataManager([
        {
          field: "updated_at",
          direction: "desc",
        },
      ]);
    },
    edit(data) {
      this.sample.email = data.email;
      this.sample.id = data.id;
      this.action = "Edit";
      this.$refs.modal.show();
    },
    validateForm() {
      if (this.sample.email === "" || this.sample.email === null) {
        this.submitted = false;
        this.addError.email = ["The email field is required"];
        return false;
      }
      return true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.submitted = true;
      if (this.validateForm()) {
        this.addError.email = null;
        if (this.action === "Add") {
          ProcessMaker.apiClient
            .post("admin/package-skeleton", {
              email: this.sample.email,
            })
            .then((response) => {
              this.reload();
              ProcessMaker.alert("Sample successfully added ", "success");
              this.sample.email = "";
            })
            .catch((error) => {
              if (error.response.status === 422) {
                this.addError = error.response.data.errors;
              }
            })
            .finally(() => {
              this.submitted = false;
              this.$refs.modal.hide();
            });
        } else {
          ProcessMaker.apiClient
            .patch(`admin/package-skeleton/${this.sample.id}`, {
              email: this.sample.email,
            })
            .then((response) => {
              this.reload();
              ProcessMaker.alert("Sample successfully updated ", "success");
              this.sample.email = "";
            })
            .catch((error) => {
              if (error.response.status === 422) {
                this.addError = error.response.data.errors;
              }
            })
            .finally(() => {
              this.submitted = false;
              this.$refs.modal.hide();
              this.action = "create";
            });
        }
      }
    },
    clearForm() {
      this.action = "Add";
      this.id = "";
      this.addError.email = null;
      this.sample.email = "";
    },
  },
});
