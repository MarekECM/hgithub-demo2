<script setup lang="ts">

</script>

<template>
   
<div class="batteryDetailContent">
    <div class="batteryDetailHeader">
       <span class="batteryDetailTitle">Elektroměr Dalovice</span> 
       <span class="batteryDetailSubtitle">Elektroměr Dalovice</span>
       <span class="batteryDetailText">Elektroměr Dalovice</span>
    </div>

    <table>
        <thead>
            <tr>
            <th>Datum a čas</th>
            <th>Hodnota</th>
            <th>Zapsal</th>
        </tr>
        </thead>
        <tbody>
            <tr>
            <td>2.9.2024 13:45</td>
            <td>0,0000000000000000</td>
            <td>---</td>
        </tr>
        </tbody>
    </table>

</div>
  

</template>

<style setup lang="scss">

.batteryDetailContent {
    width: 100%;
    display: flex;
    max-width: 1290px;
    height: 100%;
    padding: 30px;
    flex-direction: column;
}

.batteryDetailHeader {
   display: flex;
   flex-direction: column;
   text-align: left;
   padding-bottom: 30px;
}

.batteryDetailTitle {
    font-size: 30px;
}

.batteryDetailSubtitle {
    padding-top: 10px;
}

.batteryDetailText {
    padding-top: 20px;
}




</style>