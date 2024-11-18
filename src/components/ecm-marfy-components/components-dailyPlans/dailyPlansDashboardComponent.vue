<template>
    <div class="ecm_dailyPlansContainer">
        <div class="ecm_imgContentDailyplan"></div>
        <div class="ecm_TitleDailyplan">Žádné denní plány</div>
        <div class="ecm_textContentDailyplan">Momentálně nemáte k dispozici žádné reporty. Pro jejich vytvoření postupujde podle instukcí.</div>
    </div>
</template>

<style lang="scss">

.ecm_dailyPlansContainer {
    width: 100%;
    max-width: 1330px;
    height: 600px;
    background-color: var(--dailyPlansBgContainer);
    right: 0;
    position: absolute;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.ecm_imgContentDailyplan {
    width: 100px;
    height: 180px;
    background-color: #3a4d6a;
    border-radius: 5px;
}

.ecm_TitleDailyplan {
    margin-top: 25px;
    color: white;
    font-size: 25px;
}

.ecm_textContentDailyplan {
    margin-top: 25px;
    max-width: 400px;
    color: white;
    font-size: 14px;
    line-height: 2.1;
}

</style>