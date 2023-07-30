<template>
  <div class="graphics">
    <t-collapse :defaultExpandAll="true">
      <t-collapse-panel :header="item.name" v-for="item in graphicGroups" :key="item.name">
        <template v-for="elem in item.list">
          <div class="graphic" :draggable="true" @dragstart="dragStart($event, elem)"
            @click.prevent="dragStart($event, elem)">
            <svg class="l-icon" aria-hidden="true">
              <use :xlink:href="'#' + elem.icon"></use>
            </svg>
            <p :title="elem.name">{{ elem.name }}</p>
          </div>
        </template>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>


<script lang="ts" setup>
const graphicGroups = [
  {
    name: 'Notations',
    show: true,
    list: [
      {
        name: 'Goal',
        icon: 'l-rectangle',
        id: 2,
        data: {
          width: 150,
          height: 100,
          borderRadius: 0.1,
          name: 'rectangle',
        },
      },
      {
        name: 'Solution',
        icon: 'l-circle',
        id: 3,
        data: {
          width: 130,
          height: 130,
          name: 'circle',
        },
      },
      {
        name: 'Context',
        icon: 'l-flow-start',
        id: 21,
        data: {
          text: '',
          width: 150,
          height: 100,
          borderRadius: 0.5,
          name: 'rectangle',
        },
      },
      {
        name: 'Strategy',
        icon: 'l-flow-data',
        id: 24,
        data: {
          text: '',
          width: 150,
          height: 100,
          name: 'flowData',
          offsetX: 0.14,
        },
      },
      {
        name: 'Assumption',
        icon: 'l-circle',
        id: 2,
        data: {
          width: 150,
          height: 100,
          borderRadius: 0.1,
          name: 'assumption',
        },
      },
      {
        name: 'Justification',
        icon: 'l-circle',
        id: 2,
        data: {
          width: 150,
          height: 100,
          borderRadius: 0.1,
          name: 'justification',
        },
      },
      {
        name: 'Undeveloped',
        icon: 'l-diamond',
        id: 5,
        data: {
          width: 50,
          height: 50,
          name: 'diamond',
        },
      },
    ],
  }
];

const dragStart = (e: any, elem: any) => {
  if (!elem) {
    return;
  }
  e.stopPropagation();

  // drag event 
  if (e instanceof DragEvent) {
    // set shape data 
    e.dataTransfer?.setData('Meta2d', JSON.stringify(elem.data));
  } else {
    // single click to add shape is supported 
    meta2d.canvas.addCaches = [elem.data];
  }
};
</script>
<style lang="postcss" scoped>
.graphics {
  height: calc(100vh - 80px);
  overflow-y: auto;
  border-right: 1px solid var(--color-border);
  z-index: 2;

  :deep(.t-collapse) {
    border-top: none;

    .t-collapse-panel__content {
      background-color: var(--color-background-active);
      padding: 20px 4px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-row-gap: 12px;
    }

    .graphic {
      position: relative;
      padding: 10px 0;
      border-radius: 2px;
      border: 1px solid transparent;

      &:hover {
        cursor: pointer;
        border-color: var(--color-primary);
      }

      p {
        margin-top: 6px;
        padding: 0 8px;
        text-align: center;
        font-size: 12px;
        height: 12px;
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        word-break: break-all;
        -webkit-box-orient: vertical;
      }

      svg {
        color: var(--color);
        height: 28px;
        width: 100%;
        margin: auto;
      }
    }
  }
}
</style>
