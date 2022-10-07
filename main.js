//create state object;
let state = {
  currentState: "IDLE",
  startTime: null,
};

//grab buttons and output
const btnStart = document.querySelector(".js-timer-btn-start");
const btnStop = document.querySelector(".js-timer-btn-stop");
const btnReset = document.querySelector(".js-timer-btn-reset");

const timerOutput = document.querySelector(".js-timer-output");

btnStart.addEventListener("click", () => {
  console.log("click");
  dispatch({
    type: "start",
  });
});

//create reducer function to update state
const reducer = (state, action) => {
  switch (state.currentState) {
    case "IDLE":
      // code block
      if (action.type === "start") {
        const newState = {
          ...state,
          startTime: Date.now(),
          currentTime: Date.now(),
          currentState: "RUNNING",
        };
        tick();
        return newState;
      }
      break;
    case "RUNNING":
      // code block
      if (action.type === "tick") {
        return {
          ...state,
          currentTime: action.payload,
        };
      }

      if (action.type === "stop") {
      }

      break;
    case "STOPPED":
      if (action.type === "reset") {
      }

      if (action.type === "start") {
      }
      break;
    // code block
    case "RUNNING":
      break;

    default:
      console.error(`state was ${state}`);
  }
};

function dispatch(action) {
  state = reducer(state, action);
  updateDOM(state);
}

function tick() {
  const timeOut = setTimeout(() => {
    dispatch({
      type: "tick",
      payload: Date.now(),
    });
    requestAnimationFrame(tick);
  }, 1000);
}

function updateDOM(state) {
  const elapsedTime = state.currentTime - state.startTime;
  const seconds = elapsedTime / 1000;
  timerOutput.textContent = Math.floor(seconds);
}
