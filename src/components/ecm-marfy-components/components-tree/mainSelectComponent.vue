<script setup lang="ts">
import { ref } from 'vue';
import { useSelectedItemStore } from '@/stores/useSelectedItemStore';
import { useMainSelect } from '@/stores/useMainSelect';


const optionList = ref<HTMLElement | null>(null); 


// const selectClick = () => {
//   if (optionList.value) {
//     optionList.value.classList.toggle('active');
//     optionList.value.classList.toggle('noneActive');
//   }
// };



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

// let seznam = ref<string[]>([
//     'Firma 1 z Opavy',
//     'Firma 2',
//     'asdf ASRR, spol. s r.o.',
//     'DDDDAAAAA a LÁT a.s.',
//     'DFFFDDDDDDS spol. s r.o.',
// ]);


// let selectedItem = ref<string>('Vyberte položku ze seznamu');

// function selectItem(item: string) {
//   selectedItem.value = item;
// }
const store = useSelectedItemStore();

const setSelectedItem = store.setSelectedItem;

const mainSelect =  useMainSelect();
                          
</script>

<template>
    
    <div class="com_selectContainer">
        <nav class="com_selectTreeNav">
            <ul>
                <li class="com_selectTree">
                    <!-- <div class="com_selectItem" @click="selectClick">
                        <span class="com_optionValue">  {{ store.selectedItem }} </span>
                        <span class="com_selectIconContainer"> <span class="material-icons testIcon" style="font-size: 19px;">keyboard_arrow_down</span></span>
                    </div> -->
                    <div class="com_selectItem"  @click="mainSelect.toggleStyle">
                        <span class="com_optionValue">  {{ store.selectedItem }} </span>
                        <span class="com_selectIconContainer"> <span class="material-icons testIcon" style="font-size: 19px;">keyboard_arrow_down</span></span>
                    </div> 
                    <ul ref="optionList" class="com_optionList noneActive" @click="mainSelect.toggleStyle" :class="{ active: mainSelect.isActive }">
                        <li class="com_listItemTree" v-for="(item, index) in seznam" :key="index" @click="setSelectedItem(item)">
                            {{ item }}
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
    
</template>

<style setup lang="scss">

.com_optionValue {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    cursor: pointer;
}

.com_selectContainer {
    width: 246px;
    height: 30px;
    z-index: 100;
  
    
}

.com_selectContainer nav {
    width: 100%; 
}

.com_selectContainer nav ul {
    background-color: var(--selectContainerBacground);
    list-style: none;
    overflow-y: auto;
    border-radius: 5px;
}


.com_selectItem {
    width: 100%;
    display: flex;
    height: 35px;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    align-items: center;
    position: relative;
   
}

.com_selectIconContainer {
    position: absolute;
    right: 0;
    width: 20px;
    display: flex;
    align-items: center;
   // justify-content: center;
    height: 100%;
    background-color: var(--selectContainerBacground);    
}


.com_optionList {
    position: absolute;
    overflow-x: auto;
    height: 90vh; 
    //box-shadow: var(--boxShadow);
   // bottom: 12px;
    left: 0;
    top: 175px;
    width: calc(100% - 5px);
  //  bottom: 150px;
  padding-bottom: 90px;
}

.com_listItemTree {
    padding: 15px 25px 15px 25px;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis; 
    cursor: pointer;
    transition: var(--transtion1);
  
    &:hover {
        background-color: var(--sideMenu-headerBacground);
        border-radius: 5px;
        color: var(--textColorhov);
        
    }
}

.noneActive {
    display: none !important;
}

.active {
    display: block !important;
}

</style>


