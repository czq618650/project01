<template>
  <div class="module-box ">
    <div style="flex:0 1 30%">
      <dv-decoration-10 style="height:5px;" />
    </div>
    <div style="flex:0 1 40%">
      <div class="d-flex">
        <dv-decoration-8 style="height:15px;flex: 1;" />
        <div style="flex: 1;" class="tc box-model">客户分布情况</div>
        <dv-decoration-8 :reverse="true" style="height:15px;flex: 1;" />
      </div>
    </div>
    <div style="flex:0 1 30%;">
      <dv-decoration-10 :reverse="true" style="height:5px;" class="reverse" />
    </div>
  </div>
</template>
