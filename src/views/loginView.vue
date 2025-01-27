<template >
<div class="ecm-login">
    <div class="ecm-login__container">
        <div class="ecm-login__header">
            <img class="ecm-login__header-img" src="/src/components/img/logo_ecm.webp" alt="logo">
        </div>
        <div class="ecm-login__main">
            <p>Přihlaste se do svého účtu</p>
            <form class="ecm-login__form" action="">
                <input type="email" placeholder="E-mail">
                <input type="password" placeholder="Heslo">
                <RouterLink :to="{ name:'homeView' }"> <button>Přihlásit se</button></RouterLink>
            </form>
        </div>
        <div class="ecm-login__footer">
            <p>Zapomněli jste heslo?</p>
            <p>Znovu odeslat autorzační email</p>
        </div>
    </div>
</div>
</template>

