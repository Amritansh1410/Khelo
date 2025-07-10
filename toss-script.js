function flipCoin() {
  const team1Input = document.getElementById('team1Name');
  const team2Input = document.getElementById('team2Name');
  const resultBox = document.getElementById('tossResult');
  const coin = document.getElementById('coin');
  const startMatchBtn = document.getElementById('startMatchBtn');

  const team1 = team1Input.value.trim() || 'Team1';
  const team2 = team2Input.value.trim() || 'Team2';

  const teams = [team1, team2];
  const winner = teams[Math.floor(Math.random() * 2)];
  const decision = Math.random() < 0.5 ? 'bat' : 'bowl';

  // Coin animation
  coin.classList.remove('spin');
  void coin.offsetWidth; // Restart animation
  coin.classList.add('spin');

  // Delay result until after animation
  setTimeout(() => {
    resultBox.innerHTML = `<span class="text-primary">${winner}</span> won the toss and chose to <span class="text-info">${decision} first</span>!`;
    startMatchBtn.href = `scorecard.html?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`;
    startMatchBtn.classList.remove('d-none');

  }, 800);
}
