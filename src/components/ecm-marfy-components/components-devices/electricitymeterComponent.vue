<template>
  <div class="electricityMeterContainer">
    <div class="electricityMeterWrapContainer">
      <div class="electricityMeterImgContent">
        <div class="electricityMeterDateContainer">
          <span class="electricityMeterDateValue">24.09.2024</span>
          <span class="electricityMeterTimeValue">12:52</span>
        </div>
      </div>
      <div class="electricityMeterContent">
        <div class="electricityMeterTitleHeader">Elektroměr</div>
        <div class="electricityMeterContainerMain">
          <span class="electricityMeterText">CELKOVÁ SPOTŘEBA ADMINISTRATIVA</span>
          <span class="electricityMeterValue">65%</span>
        </div>
        <div class="electricityMeterContainerFotter">
          <div class="electricityMeterDeviceButton"> <RouterLink to="/detail-elektromeru">Zobrazit zařízení</RouterLink></div>
        </div>
      </div>
    </div>
  </div>
</template>
