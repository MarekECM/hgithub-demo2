<script setup lang="ts">
import primaryModalWindow from '@/components/ecm-marfy-components/components-modal-windows/primary-modal-windou.vue'
</script>

<template>
    <div class="reports-detail ecm-layout__container--default">
        <table class="reports-detail__table">
            <thead class="reports-detail__header">
                <tr class="reports-detail__row">
                    <th class="reports-detail__cell reports-detail__cell--name">NÁZEV</th>
                    <th class="reports-detail__cell">PPOSLEDNÍ ODESLÁNÍ</th>
                    <th class="reports-detail__cell">FREKVENCE</th>
                    <th class="reports-detail__cell">STAV</th>
                    <th class="reports-detail__cell reports-detail__cell--actions">AKCE</th>
                </tr>
            </thead>
            <tbody class="reports-detail__body">

            </tbody>
        </table>
        <primaryModalWindow/>
   </div>
</template>
