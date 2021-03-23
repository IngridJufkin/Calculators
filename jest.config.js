module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/tests/setup.js"] //võimaldab testidel töötada vuetify-s root kaustast/test ja võetakse setup.js faili configuratsioonis arvesse, käiakse see fail läbi ja alles siis hakatakse teste jooksutama
};
