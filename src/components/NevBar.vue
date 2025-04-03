<template>
  <div class="image-slider">
    <carousel :items-to-show="1" :autoplay="3000" wrap-around>
      <slide v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Profile" class="slider-image" />
      </slide>
    </carousel>
  </div>
</template>

<script>

import dadwas from "@/assets/dadwas.jpg";


export default {
  components: {  },
  data() {
    return {
      images: [dadwas,],
    };
  },
};
</script>

<style scoped>
.image-slider {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  
}

.carousel,
.carousel__viewport,
.carousel__track,
.carousel__slide {
  background-color: transparent !important;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
