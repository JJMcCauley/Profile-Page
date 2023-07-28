function postCombat(party) {
    const nextFightBtn = document.querySelector('#next-combat');

    nextFightBtn.addEventListener('click', () => {
        startCombat(party);
    })
}