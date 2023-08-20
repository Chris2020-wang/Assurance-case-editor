<template>
  <div class="props-panel">
    <t-form label-align="left">
      <h5 class="mb-24">Canvas</h5>
      <t-form-item label="Canvas Name" name="name">
        <t-input v-model="data.name" @change="onChangeData" placeholder="" />
      </t-form-item>
      <t-divider />
      <t-form-item label="Grid" name="grid">
        <t-switch v-model="options.grid" @change="onChangeOptions" />
      </t-form-item>
      <t-form-item label="Grid size" name="gridSize">
        <t-input v-model.number="options.gridSize" @change="onChangeOptions" />
      </t-form-item>
      <!-- <t-form-item label="grid angle" name="gridRotate">
        <t-input
          v-model.number="options.gridRotate"
          @change="onChangeOptions"
        />
      </t-form-item> -->
      <t-form-item label="Grid color" name="gridColor" >
        <t-color-picker class="w-full" v-model="options.gridColor" :show-primary-color-preview="false"
          format="CSS" :color-modes="['monochrome']" @change="onChangeOptions" />
      </t-form-item>

      <t-divider />

      <t-form-item label="Ruler" name="rule">
        <t-switch v-model="options.rule" @change="onChangeOptions" />
      </t-form-item>

      <t-divider />

      <t-form-item label="Background" name="background">
        <t-color-picker class="w-full" v-model="data.background" :show-primary-color-preview="false" format="CSS"
          :color-modes="['monochrome']" @change="onChangeData" />
      </t-form-item>
      <t-form-item label="Shape color" name="color">
        <t-color-picker class="w-full" v-model="data.color" :show-primary-color-preview="false" format="CSS"
          :color-modes="['monochrome']" @change="onChangeData" />
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

// Canvas Data 
const data = reactive<any>({
  name: '',
  background: undefined,
  color: undefined,
});

// Canvas Options 
const options = reactive<any>({
  grid: false,
  gridSize: 10,
  gridRotate: undefined,
  gridColor: undefined,
  rule: true,
});

onMounted(() => {
  // const d: any = meta2d.data();
  // data.name = d.name || 'file';

  data.name = '';
  data.background = "rgba(255, 255, 255, 1)";
  data.color = "rgba(0, 0, 0, 1)";

  Object.assign(options, meta2d.getOptions());
});

const onChangeData = () => {
  Object.assign(meta2d.store.data, data);
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};

const onChangeOptions = () => {
  meta2d.setOptions(options);
  meta2d.store.patchFlagsTop = true;
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};
</script>
<style lang="postcss" scoped>
.props-panel {
  :deep(.t-form) {
    .t-form__item {
      margin-bottom: 8px;
    }

    .t-form__label {
      padding-right: 8px;
    }

    .t-divider {
      margin: 12px 0;
    }

    .t-input--auto-width {
      width: 100%;
    }
  }
}
</style>
