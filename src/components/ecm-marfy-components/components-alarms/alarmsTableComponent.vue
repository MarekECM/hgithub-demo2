<template>
    <div class="alarmDetailContent">
        <table>
            <thead>
                <tr>
                    <th class="theadName">NÁZEV</th>
                    <th class="theadStav">STAV</th>
                    <th class="theadActions">AKCE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="tbodyMessage">Baterie v Dalovicích - nízky stav nabití (pod 20% SOC)</td>
                    <td><span class="alarmContent ecm_alarmTable">Alarm</span> </td>
                    <td class="tableIconContainer"><span class="material-icons testIcon2" style="font-size: 25px;">schedule</span></td>
                </tr>
                <tr>
                    <td class="tbodyMessage">Baterie v Dalovicích - nízky stav nabití (pod 20% SOC)</td>
                    <td><span class="alarmContent">ok</span> </td>
                    <td class="tableIconContainer"><span class="material-icons testIcon2" style="font-size: 25px;">schedule</span></td>
                </tr>
                <tr>
                    <td class="tbodyMessage">Baterie v Dalovicích - nízky stav nabití (pod 20% SOC)</td>
                    <td><span class="alarmContent">ok</span> </td>
                    <td class="tableIconContainer"><span class="material-icons testIcon2" style="font-size: 25px;">schedule</span></td>
                </tr>
                <tr>
                    <td class="tbodyMessage">Baterie v Dalovicích - nízky stav nabití (pod 20% SOC)</td>
                    <td><span class="alarmContent">ok</span> </td>
                    <td class="tableIconContainer"><span class="material-icons testIcon2" style="font-size: 25px;">schedule</span></td>
                </tr>
                <tr>
                    <td class="tbodyMessage">Baterie v Dalovicích - nízky stav nabití (pod 20% SOC)</td>
                    <td><span class="alarmContent">ok</span> </td>
                    <td class="tableIconContainer"><span class="material-icons testIcon2" style="font-size: 25px;">schedule</span></td>
                </tr>
            </tbody>
        </table>
   </div>
</template>

<style lang="scss">


    .alarmDetailContent {
        background-color: #1f272f;
        padding: 30px 20px;
        border-radius: 25px;
        overflow: hidden;
    }

    .alarmDetailContent .theadName {
        border-radius: 25px 0px 0px 25px;
        width: 80%;
    }

    .alarmDetailContent .theadStav {
        width: 10%;
        text-align: center;
    }

    .alarmDetailContent .tbodyMessage {
        overflow-x: hidden;
        width: 80%;
    }

    .alarmDetailContent .theadActions {
        border-radius: 0px 25px 25px 0px;
        width: 10%;
        text-align: center;
    }

    .alarmDetailContent .alarmContent {
        width: 100%;
        display: flex;
        justify-content: center;
        border-radius: 25px;
        background-color: var(--tableOkBg);
        padding: 2px 5px;
    }

    .alarmDetailContent .ecm_alarmTable {
        background-color: var(--tableAlarmBg);
        padding: 2px 5px;
    }

    .alarmDetailContent .tableIconContainer {
        text-align: center;
    }


</style>