<template>
    <div class="reportsDetailContent">
        <table>
            <thead>
                <tr>
                    <th class="theadName">NÁZEV</th>
                    <th class="theadStav">PPOSLEDNÍ ODESLÁNÍ</th>
                    <th class="theadFrequency">FREKVENCE</th>
                    <th class="theadStav">STAV</th>
                    <th class="theadActions">AKCE</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    <div class="ecm_reportsContainer">
        <div class="ecm_imgContentDailyplan"></div>
        <div class="ecm_TitleDailyplan">Žádné reporty k dispozici</div>
        <div class="ecm_textContentDailyplan">Momentálně nemáte k dispozici žádné reporty. Pro jejich vytvoření postupujde podle instukcí.</div>
    </div>
   </div>
</template>

<style lang="scss">

.reportsDetailContent {
    background-color: #1f272f;
    padding: 30px 20px;
    border-radius: 25px;
    overflow: hidden;
}

.theadName {
 border-radius: 25px 0px 0px 25px;
}

.theadActions {
    border-radius: 0px 25px 25px 0px;
}

.ecm_reportsContainer {
    width: 100%;
    height: 600px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>