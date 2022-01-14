<template>
  <div class="dashboard-container">
    <div class="page-headline">Dashboard</div>
    <div class="headline_large">Welcome {{ $auth.user.email }} to BetPlays</div>
    <div>A community oreintated around the people</div>
    <div>No bullshit. No hidden fees. Just you and your mates.</div>
  </div>
</template>

<script type="module">
export default {};
</script>

<style scoped lang="scss">
@import "~/assets/scss/pages/dashboard";
</style>
