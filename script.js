// Read team names from URL
const urlParams = new URLSearchParams(window.location.search);
const team1Name = urlParams.get('team1') || 'Team1';
const team2Name = urlParams.get('team2') || 'Team2';

// Update UI with team names
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('team1Display').textContent = team1Name;
  document.getElementById('team2Display').textContent = team2Name;
});

let state = {
    team1: { runs: 0, wickets: 0, overs: 0, balls: 0 },
    team2: { runs: 0, wickets: 0, overs: 0, balls: 0 },
    current: 1,
    target: 0,
    overArr: [],
    matchOver: false
};

const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const overCount = document.getElementById('overCount');
const target = document.getElementById('target');
const ballsContainer = document.getElementById('ballsContainer');

function updateScore() {
    const t1 = state.team1;
    const t2 = state.team2;
    const current = state.current === 1 ? t1 : t2;
    score1.textContent = `${t1.runs}/${t1.wickets}`;
    score2.textContent = state.current === 2 ? `${t2.runs}/${t2.wickets}` : '-';
    overCount.textContent = `${current.overs}.${current.balls}`;
    target.textContent = state.current === 2 ? state.target + 1 : '-';
}

function updateBallsDisplay() {
    ballsContainer.innerHTML = '';
    state.overArr.forEach(ball => {
        const el = document.createElement('span');
        el.className = 'ball-box ball-' + ball;
        el.textContent = ball;
        ballsContainer.appendChild(el);
    });
}

function checkMatchOver() {
    if (state.current === 2) {
        const team = state.team2;
        // Assuming 10 wickets max and 6 balls per over, overs limit is team1's overs
        const maxOvers = state.team1.overs + (state.team1.balls > 0 ? 1 : 0);
        if (team.runs > state.target) {
            state.matchOver = true;
            alert('Team 2 has won!');
        } else if (team.wickets >= 10 || team.overs === maxOvers) {
            state.matchOver = true;
            alert('Match Over!');
        }
    }
}

function addRun(run) {
    if (state.matchOver) return;
    const team = state.current === 1 ? state.team1 : state.team2;
    team.runs += run;
    team.balls++;
    state.overArr.push(run);
    if (team.balls === 6) {
        team.overs++;
        team.balls = 0;
        state.overArr = [];
    }
    updateScore();
    updateBallsDisplay();
    checkMatchOver();
}

function addWicket() {
    if (state.matchOver) return;
    const team = state.current === 1 ? state.team1 : state.team2;
    if (team.wickets < 10) {
        team.wickets++;
        team.balls++;
        state.overArr.push('W');
        if (team.balls === 6) {
            team.overs++;
            team.balls = 0;
            state.overArr = [];
        }
        updateScore();
        updateBallsDisplay();
        checkMatchOver();
    }
}

function addWide() {
    if (state.matchOver) return;
    const team = state.current === 1 ? state.team1 : state.team2;
    team.runs++;
    state.overArr.push('Wd');
    updateScore();
    updateBallsDisplay();
    checkMatchOver();
}

function addNoBall() {
    if (state.matchOver) return;
    const team = state.current === 1 ? state.team1 : state.team2;
    team.runs++;
    state.overArr.push('Nb');
    updateScore();
    updateBallsDisplay();
    checkMatchOver();
}

document.querySelectorAll('[data-run]').forEach(btn => {
    btn.addEventListener('click', () => addRun(parseInt(btn.dataset.run)));
});

document.getElementById('wicket').addEventListener('click', addWicket);
document.getElementById('wide').addEventListener('click', addWide);
document.getElementById('noball').addEventListener('click', addNoBall);

document.getElementById('switch').addEventListener('click', () => {
    if (state.current === 1) {
        state.current = 2;
        state.target = state.team1.runs;
        state.overArr = [];
        state.matchOver = false;
    } else {
        alert('Match Over!');
    }
    updateScore();
    updateBallsDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
    state = {
        team1: { runs: 0, wickets: 0, overs: 0, balls: 0 },
        team2: { runs: 0, wickets: 0, overs: 0, balls: 0 },
        current: 1,
        target: 0,
        overArr: [],
        matchOver: false
    };
    updateScore();
    updateBallsDisplay();
});

updateScore();
