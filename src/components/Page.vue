<template>
    <div>
        <p>{{ message }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Page extends Vue {
  message: string = 'Hello!'
}
</script>
