<template>
    <div
        class="d2-contextmenu"
        v-show="flag"
        :style="style">
        <slot/>    
    </div>
</template>

<script>
export default {
  name: "d2-contextmenu",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  computed: {
    flag: {
      get() {
        if (this.visible) {
          window.addEventListener("mousedown", this.watchContextmenu);
        }
        return this.visible;
      },
      set(newVal) {
        this.$emit("updata:visible", newVal);
      }
    },
    style() {
      return {
        left: this.x + "px",
        top: this.y + "px",
        display: this.visible ? "block" : "none"
      };
    }
  },
  methods: {
    watchContextmenu(event) {
      if (!this.$el.contains(event.target) || event.button !== 0)
        this.flag = false;
      window.removeEventListener("mousedown", this.watchContextmenu);
    }
  },
  mounted() {
    document.querySelector("body").appendChild(this.$el);
  }
};
</script>

<style>
.d2-contextmenu {
  position: absolute;
  padding: 5px 0;
  z-index: 2018;
  background: #fff;
  border: 1px solid #cfd7e5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
