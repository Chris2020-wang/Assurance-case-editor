<template>
  <div class="props-panel">
    <t-form label-align="left" v-if="pen">
      <h5 class="mb-24">Notation</h5>
      <t-form-item label="Text" name="text">
        <t-input v-model="pen.text" placeholder="" @change="changeValue('text')" />
      </t-form-item>
      <!-- <t-form-item label="Color" name="color">
        <t-color-picker placeholder="" class="w-full" v-model="pen.color" :show-primary-color-preview="false" format="CSS"
          :color-modes="['monochrome']" @change="changeValue('color')" />
      </t-form-item>
      <t-form-item label="Background" name="background">
        <t-color-picker class="w-full" v-model="pen.background" :show-primary-color-preview="false" format="CSS"
          :color-modes="['monochrome']" @change="changeValue('background')" />
      </t-form-item> -->
      <t-form-item label="outline" name="dash">
        <t-select v-model="pen.dash" @change="changeValue('dash')" placeholder="">
          <t-option :key="0" :value="0" label="Solid"></t-option>
          <t-option :key="1" :value="1" label="Dashed"></t-option>
        </t-select>
      </t-form-item>
      <t-form-item label="Radius" name="borderRadius">
        <t-input-number :min="0" :max="1" :step="0.01" v-model="pen.borderRadius" @change="changeValue('borderRadius')" />
      </t-form-item>

      <t-divider />

      <t-form-item label="X" name="x">
        <t-input-number v-model="rect.x" @change="changeRect('x')" />
      </t-form-item>
      <t-form-item label="Y" name="y">
        <t-input-number v-model="rect.y" @change="changeRect('y')" />
      </t-form-item>
      <t-form-item label="Width" name="width">
        <t-input-number v-model="rect.width" @change="changeRect('width')" />
      </t-form-item>
      <t-form-item label="Height" name="height">
        <t-input-number v-model="rect.height" @change="changeRect('height')" />
      </t-form-item>

      <t-divider />

      <t-form-item label="Text Align" name="textAlign">
        <t-select v-model="pen.textAlign" @change="changeValue('textAlign')" placeholder="choose">
          <t-option key="left" value="left" label="Left Align"></t-option>
          <t-option key="center" value="center" label="Center Align"></t-option>
          <t-option key="right" value="right" label="Right Align"></t-option>
        </t-select>
      </t-form-item>
      <t-form-item label="Text base" name="textBaseline">
        <t-select placeholder="choose" v-model="pen.textBaseline" @change="changeValue('textBaseline')">
          <t-option key="top" value="top" label="Top Align"></t-option>
          <t-option key="middle" value="middle" label="Mid Align"></t-option>
          <t-option key="bottom" value="bottom" label="Base Align"></t-option>
        </t-select>
      </t-form-item>

      <t-divider />
      <!-- <t-space>
        <t-button @click="top">置顶</t-button>
        <t-button @click="bottom">置底</t-button>
        <t-button @click="up">上一层</t-button>
        <t-button @click="down">下一层</t-button>
      </t-space> -->
    </t-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useSelection } from '@/services/selections';

const { selections } = useSelection();

const pen = ref<any>();
// postition data
const rect = ref<any>();

onMounted(() => {
  getPen();
});

const getPen = () => {
  pen.value = selections.pen;
  if (pen.value.globalAlpha == undefined) {
    pen.value.globalAlpha = 1;
  }

  rect.value = meta2d.getPenRect(pen.value);
};

// listen different shapes
// @ts-ignore
const watcher = watch(() => selections.pen.id, getPen);

const lineDashs = [undefined, [5, 5]];

const changeValue = (prop: string) => {
  const v: any = { id: pen.value.id };
  v[prop] = pen.value[prop];
  if (prop === 'dash') {
    v.lineDash = lineDashs[v[prop]];
  }
  meta2d.setValue(v, { render: true });
};

const changeRect = (prop: string) => {
  const v: any = { id: pen.value.id };
  v[prop] = rect.value[prop];
  meta2d.setValue(v, { render: true });
};

// const top = () => {
//   meta2d.top();
//   meta2d.render();
// };
// const bottom = () => {
//   meta2d.bottom();
//   meta2d.render();
// };
// const up = () => {
//   meta2d.up();
//   meta2d.render();
// };
// const down = () => {
//   meta2d.down();
//   meta2d.render();
// };

onUnmounted(() => {
  watcher();
});
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

    .t-space {
      gap: 4px;
    }
  }
}
</style>
