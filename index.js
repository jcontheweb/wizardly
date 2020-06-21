import anime from "animejs/lib/anime.es.js";

function wizardly() {
    let step = 1;
    const form = document.querySelector("[data-form-wizard]");

    if (form) {
        const steps = [...form.querySelectorAll("[data-form-wizard-step]")];
        const previous = form.querySelector("[data-form-wizard-previous]");
        const next = form.querySelector("[data-form-wizard-next]");
        const submit = form.querySelector("[data-form-wizard-submit]");

        const stepBar = `
        <div class="step-bar__container">
            <div class="step-bar"></div>
        </div>
      `;

        form.insertAdjacentHTML("afterbegin", stepBar);

        const bar = form.querySelector(".step-bar");

        steps.forEach((currentStep, index) => {
            const el = `
            <div class="step-bar__step ${index < step ? "active" : ""}">
                 <div class="step-bar__step-item">
                 <div class="step-bar__step-circle">${steps.indexOf(
                currentStep
            ) + 1}</div>
                 <div class="step-bar__step-label">${currentStep.getAttribute(
                "data-form-wizard-step"
            )}</div>
                 </div>
            </div>
        `;

            bar.insertAdjacentHTML("beforeend", el);
        });

        const barAfter = `
        <div class="step-bar__after"></div>
      `;

        bar.insertAdjacentHTML("beforeend", barAfter);

        const stepBarSteps = [...form.querySelectorAll(".step-bar__step")];

        next.addEventListener("click", event => {
            if (step == steps.length) {
                event.preventDefault();
            } else {
                const tl = anime.timeline({
                    targets: steps[step - 1],
                    delay: 0,
                    duration: 100,
                    easing: "easeOutExpo",
                    direction: "alternate",
                    loop: false
                });

                tl.add({
                    scale: 0.99,
                    easing: "linear"
                })
                    .add({
                        opacity: 0,
                        duration: 300,
                        easing: "linear"
                    })
                    .add({
                        targets: steps[step],
                        translateX: ["100%", 0],
                        opacity: [0, 1],
                        duration: 300,
                        easing: "easeOutElastic(.5, 1.5)"
                    });
                step++;
                stepBarSteps[step - 1].classList.add("active");
                if (step != 1) {
                    previous.style.display = "block";
                }
                if (step == steps.length) {
                    next.style.display = "none";
                    submit.style.display = "block";
                }
            }
        });
        previous.addEventListener("click", event => {
            if (step == 1) {
                event.preventDefault();
            } else {
                const tl = anime.timeline({
                    targets: steps[step - 1],
                    delay: 0,
                    duration: 300,
                    easing: "easeInExpo",
                    direction: "alternate",
                    loop: false
                });

                tl.add({
                    translateX: [0, "100%"],
                    opacity: [1, 0],
                    duration: 500
                }).add({
                    targets: steps[step - 2],
                    easing: "linear",
                    scale: [0.97, 1],
                    opacity: [0, 1]
                });
                step--;
                stepBarSteps[step].classList.remove("active");
                if (step != steps.length) {
                    next.style.display = "block";
                    submit.style.display = "none";
                }
                if (step == 1) {
                    submit.style.display = "none";
                    previous.style.display = "none";
                    next.style.display = "block";
                }
            }
        });
        form.addEventListener("submit", event => {
            const stepBarAfter = form.querySelector(".step-bar__after");
            stepBarAfter.classList.add("active");
            const data = Object.fromEntries(new FormData(form).entries());
            console.log(data);
        });
    }
}

module.exports.wizardly = wizardly;