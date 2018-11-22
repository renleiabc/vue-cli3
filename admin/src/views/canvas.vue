<!-- canvas绘制斐波拉切图形 -->
<template>
  <div>
      <canvas ref="canavs" class="canvas">canavs</canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coor: {
        x: 500,
        y: 350
      }
    };
  },
  created() {},
  mounted() {
    let canvas = this.$refs.canavs;
    console.log(canvas);
    canvas.width = 1000;
    canvas.height = 700;
    let ctx = canvas.getContext("2d");
    let data = this.getFibonacci(11);
    console.log(data);
    let coor = this.coor;
    for (var i = 0, l = data.length; i < l; i++) {
      if (data[i] != 0) {
        this.draw(data[i], i, data[i - 1], coor, ctx);
      }
    }
  },
  methods: {
    //获取包含斐波拉切数列的数组函数
    getFibonacci(n) {
      var fibarr = [];
      var i = 0;
      while (i < n) {
        if (i <= 1) {
          fibarr.push(i);
        } else {
          fibarr.push(fibarr[i - 1] + fibarr[i - 2]);
        }
        i++;
      }
      return fibarr;
    },
    draw(r, n, prevR, coor, ctx) {
      if (n > 2) {
        switch (n % 4) {
          case 0:
            coor.y = coor.y - 5 * prevR;
            coor.y = coor.y + 5 * r;

            break;
          case 1:
            coor.x = coor.x + 5 * prevR;
            coor.x = coor.x - 5 * r;
            break;
          case 2:
            coor.y = coor.y + 5 * prevR;
            coor.y = coor.y - 5 * r;
            break;
          case 3:
            coor.x = coor.x - 5 * prevR;
            coor.x = coor.x + 5 * r;
            break;
        }
      }
      ctx.beginPath();
      ctx.arc(
        coor.x,
        coor.y,
        5 * r,
        Math.PI * 0.5 * n,
        Math.PI * 0.5 * (n - 1),
        true
      );
      if (n > 1) {
        switch (n % 4) {
          case 0:
            ctx.moveTo(coor.x - 5 * r, coor.y);

            break;
          case 1:
            ctx.moveTo(coor.x, coor.y + 5 * r);
            break;
          case 2:
            ctx.moveTo(coor.x + 5 * r, coor.y);
            break;
          case 3:
            ctx.moveTo(coor.x, coor.y - 5 * r);
            break;
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
    }
  },
  components: {},
  computed: {}
};
</script>
<style  scoped>
.canvas {
  width: 1000px;
  height: 700px;
  background: #000;
}
</style>
