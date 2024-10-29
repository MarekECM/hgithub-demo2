<template>
  <div class="sectionBanner">
    <div class="bannerContentContainer">
      <div class="bannerHeaderSection">
        <div class="bannerDotsContainer">
          <span class="bannerDots activeDots"></span>
          <span class="bannerDots inActiveDots"></span>
          <span class="bannerDots inActiveDots"></span>
        </div>
        <div class="bannerTitle">Aplikace</div>
        <div class="bannerHeroTitle">Aplikace k dispozici na vašem zařízení</div>
      </div>
      <div class="bannerFotterSection">
        <div class="bannerButton">STÁHNOUT APLIKACI</div>
      </div>
    </div>
  </div>
</template>

<style setup lang="scss">
.sectionBanner {
  max-width: 1290px;
    width: 100%;
    background-color: var(--bannerContainerBackground);
   // margin: 110px 15px 15px 15px;
   margin: 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    text-align: left;
    padding-bottom: 50px;
    overflow: hidden;
}

.bannerContentContainer {
  width: 50%;
  height: 80%;
  margin-left: 50px;
  position: relative;
}

.bannerDotsContainer {
  width: 40px;
  height: 10px;
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
}

.bannerHeroTitle {
  width: 100%;
  max-width: 470px;
  font-size: 50px;
  color: var(--bannerHeroTitleColor);
  font-size: var(--heroTitle);
}

.bannerDots {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.activeDots {
  background-color: var(--dotActive);
}

.inActiveDots {
  background-color: var(--dotInActive);
}

.bannerFotterSection {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}

.bannerTitle {
  font-size: 18px;
  color: var(--bannertitleColor);
  padding: 20px 0;
}

.bannerButton {
  max-width: 180px;
  width: 100%;
  height: 40px;
  background-color: var(--bannerButtonBackground);
  color: var(--bannerTextColor);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
</style>
