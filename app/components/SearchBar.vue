<script setup lang="ts">
interface Props {
  refKey: string;
}

// define component props
const props = defineProps<Props>();

// init search with the given key
const search = useState<string>(props.refKey, () => "");

// clear the search string value
function clearSearch() {
  search.value = "";
}
</script>

<template>
  <div
    class="flex flex-row justify-between items-center bg-background-900 shadow-[0_0_2px_0] shadow-secondary-900/50 p-2 rounded-md focus-within:outline focus-within:outline-primary-900 w-full"
  >
    <div class="flex flex-row items-center space-x-1 xl:w-full">
      <IconSearch class="size-5 text-secondary-500" />
      <input
        type="text"
        v-model="search"
        placeholder="Lasagnes"
        class="outline-none xl:w-full text-secondary-900 placeholder:text-secondary-100"
      />
    </div>
    <button v-if="search !== ''" @click="clearSearch" class="cursor-pointer">
      <IconCross class="size-4 text-secondary-900" />
    </button>
  </div>
</template>
