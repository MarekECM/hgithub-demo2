<script setup lang="ts">
import { ref } from 'vue';
import { useSelectedItemStore } from '@/stores/useSelectedItemStore';
import { useMainSelect } from '@/stores/useMainSelect';


const optionList = ref<HTMLElement | null>(null); 


   let seznam = ref<string[]>([
    'Amylon, a.s.',
    'ASN HAKR Brno s.r.o.',
    'ASPERA, spol. s r.o.',
    'BENEŠ a LÁT a.s.',
    'BOCOMP spol. s r.o.',
    'CREAM Real Estate, s.r.o.',
    'CSAdamCZ s.r.o.',
    'ČEPRO, a.s.',
    'ECM System Solutions s.r.o.',
    'ENERG-SERVIS a.s.',
    'Energetická Brumovice, příspěvková organizace', 
    'ENERKOM Krnovsko z. s.',
    'ENERKOM Opavsko, z.s.',
    'ENERKOM Růže, z.s.',
    'ENERKOM Znojemsko z. s.',
    'ENVY RECYCLING s.r.o.',
    'EUROVIA CS, a.s.',
    'EWE s.r.o.',
    'Fakultní nemocnice Olomouc',
    'Fakultní nemocnice Ostrava',
    'FINIDR, s.r.o.',
    'Fotbalový klub Těrlicko z.s.',
    'FRYGESTA, a.s.',
    'GAVENDA s.r.o.',
    'Hanácká potravinářská společnost s.r.o.',
    'Chart Ferox, a.s.',
    'INPROMA, spol. s r.o.',
    'Integraf, s.r.o.',
    'ISOTRA a.s.',
    'Jiří Vaněk, s.r.o.',
    'Junák - český skaut, středisko Salvator Dolní Životice, z. s.',
    'KARETA s.r.o.',
    'KOVONA SYSTEM, a.s.',
    'LAC, s.r.o.',
    'LAMA energy a.s.',
    'LAMBRO - 92 a.s.',
    'M Group Holding s.r.o.',
    'Martin Krupa',
    'MASO V+W, s.r.o.',
    'Meopta s.r.o.',
    'Město Větřní',
    'Městys Litultovice',
    'METAL TRADE COMAX, a.s.',
    'Model Obaly a.s.',
    'NWT a.s.',
    'Obec Branka u Opavy',
    'Obec Mikolajice',
    'Obec Stěbořice',
    'Obec Václavovice',
    'Obec Velká Polom',
    'Obec Větřkovice',
    'Odborová organizace PILA Paskov',
    'Organizace, s.r.o.',
    'ORLIMEX CZ, s.r.o.',
    'Otakar Albrecht',
    'Paszanda Mariusz',
    'PEJSKAR &amp; spol., spol. s r.o.',
    'Petr Martínek',
    'Pivovar Koníček s.r.o.',
    'Polanka nad Odrou',
    'PREFA PRO, a.s.',
    'Prestar, s. r. o.',
    'První jílovská a.s.',
    'Reality Rozcestí, a.s.',
    'REMERX s.r.o.',
    'RKL Opava, spol. s r.o.',
    'RVTech s.r.o.',
    'RYKO a.s.',
    'Správa železnic, státní organizace',
    'Statutární město Ostrava',
    'System organization',
    'Techco-Electrics ETS s.r.o.',
    'TEMPO, obchodní družstvo',
    'TeSport Budišov nad Budišovkou, s.r.o.',
    'TISKÁRNA GRAFICO s.r.o.',
    'TMETAL s. r. o.',
    'UnionOcel, s.r.o.',
    'Veterinární univerzita Brno', 
    'VINCI Construction CS a.s.',
    'Akzo Nobel Coatings CZ, a.s.',
    'Windmöller &amp; Hölsc her Czech s.r.o.',
    'WLC Park s.r.o.',
    'WOLTERS PACKAGING CZECH s.r.o.',
    'Znojemská dopravní společnost - PSOTA, s.r.o.',
    'Statutární město Opava'
]);


const store = useSelectedItemStore();

const setSelectedItem = store.setSelectedItem;

const mainSelect =  useMainSelect();
                          
</script>

<template>
    
<div class="ecm-select">
  <nav class="ecm-select__tree-nav">
    <ul class="ecm-select__tree">
      <li class="ecm-select__tree-item">
        <div class="ecm-select__item" @click="mainSelect.toggleStyle">
          <span class="ecm-select__value">{{ store.selectedItem }}</span>
          <span class="ecm-select__icon-container">
            <span class="ecm-select__icon material-icons" style="font-size: 19px;">keyboard_arrow_down</span>
          </span>
        </div>
        <ul ref="optionList" class="ecm-select__options ecm-select__options--hidden" @click="mainSelect.toggleStyle" :class="{ 'ecm-select__options--active': mainSelect.isActive }">
            <li class="ecm-select__option" v-for="(item, index) in seznam" :key="index" @click="setSelectedItem(item)" > {{ item }}  </li>
        </ul>
      </li>
    </ul>
  </nav>
</div>
</template>



