const stats = {
    identity: 0,
    safety: 5,
    support: 0
};

const chosen = new Set();

const exploredByPanel = {
    childhood: new Set(),
    classroom: new Set(),
    online: new Set(),
    job: new Set(),
    clinic: new Set()
};

const choiceEffectsMap = new Map();

function updatePanelCounts() {
    Object.keys(scenes).forEach(sceneKey => {
        const countEl = document.getElementById(`count-${sceneKey}`);
        if (!countEl) return;

        const explored = exploredByPanel[sceneKey].size;
        const total = Object.keys(scenes[sceneKey].objects).length;
        countEl.textContent = `Explored ${explored} / ${total}`;
    });
}

const scenes = {
    childhood: {
        titleId: "interaction-title",
        bodyId: "interaction-body",
        imageId: "childhood-scene-image",
        defaultImage: "stage1room.png",
        objects: {
            self: {
                title: "Your Thoughts",
                text: [
                    "You stand in the room and feel that something is off, not in the room itself, but in the gap between you and what others expect.",
                    "You do not have the words yet. Only the feeling."
                ],
                choices: [
                    {
                        key: "childhood-self-weird",
                        label: "Maybe I am just weird.",
                        result: "You turn confusion inward.",
                        effects: { identity: -1, safety: 0, support: -1 }
                    },
                    {
                        key: "childhood-self-different",
                        label: "Maybe I am different.",
                        result: "The thought is uncertain, but gentler than shame.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "childhood-self-avoid",
                        label: "I do not want to think about it.",
                        result: "Avoidance protects you for a while, but not forever.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },

            doll: {
                title: "Doll",
                text: [
                    "The doll sits near the bed, small and harmless, but somehow charged with meaning.",
                    "You like the softness, the clothes, and the feeling that this tiny object opens a different way of being."
                ],
                choices: [
                    {
                        key: "childhood-doll-play",
                        label: "Pick it up and play with it.",
                        result: "Joy arrives before shame does.",
                        effects: { identity: 1, safety: -1, support: 0 }
                    },
                    {
                        key: "childhood-doll-hide",
                        label: "Hide it before anyone sees.",
                        result: "You move quickly, as if the object itself might reveal too much about you.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    },
                    {
                        key: "childhood-doll-leave",
                        label: "Leave it there and walk away.",
                        result: "The feeling stays with you, even after you step back from it.",
                        effects: { identity: 0, safety: 0, support: 0 }
                    }
                ]
            },

            closet: {
                title: "Closet",
                text: [
                    "The closet feels deeper than it should. Most of the clothes are ordinary, but some pieces pull your attention immediately.",
                    "You imagine trying them on, not as a game exactly, but as a way of asking a question you do not know how to say out loud."
                ],
                image: "opencloset.png",
                choices: [
                    {
                        key: "childhood-closet-try",
                        label: "Try something on in secret.",
                        result: "It feels private, fragile, and strangely right.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "childhood-closet-touch",
                        label: "Touch the fabric and imagine.",
                        result: "You do not act, but your imagination becomes a small space of freedom.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "childhood-closet-close",
                        label: "Close the closet door quickly.",
                        result: "You choose safety first, even though the feeling remains.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },

            diary: {
                title: "Diary",
                text: [
                    "The open notebook is where your thoughts can exist without interruption.",
                    "You cannot explain yourself yet, but the page lets you leave evidence that the feeling is real."
                ],
                choices: [
                    {
                        key: "childhood-diary-write",
                        label: "Write: 'I feel different.'",
                        result: "The sentence is quiet, but it changes something by existing.",
                        effects: { identity: 2, safety: 0, support: 0 }
                    },
                    {
                        key: "childhood-diary-draw",
                        label: "Draw instead of writing.",
                        result: "The feeling takes shape without needing a clear name yet.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "childhood-diary-close",
                        label: "Close the notebook.",
                        result: "You are not ready to let the thought fully appear, even on paper.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },

            family: {
                title: "Family Photo",
                text: [
                    "The family photo looks calm and complete. Everyone in it seems easy to understand.",
                    "You wonder whether there is room in that picture for the version of you that is starting to emerge."
                ],
                choices: [
                    {
                        key: "childhood-family-fit",
                        label: "Tell yourself you should just fit in.",
                        result: "You try to make yourself smaller and more readable to others.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    },
                    {
                        key: "childhood-family-question",
                        label: "Wonder if they would still understand you.",
                        result: "The question hurts, but it keeps the possibility of being known alive.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "childhood-family-hope",
                        label: "Hope that someone in the picture might still love the real you.",
                        result: "Hope feels fragile, but it matters.",
                        effects: { identity: 0, safety: 0, support: 1 }
                    }
                ]
            }
        }
    },

    classroom: {
        titleId: "interaction-title-classroom",
        bodyId: "interaction-body-classroom",
        objects: {
            desk: {
                title: "Desk",
                text: [
                    "Your desk has heard every version of you that never made it to speech.",
                    "It carries doodles, pressure, and the weight of being watched."
                ],
                choices: [
                    {
                        key: "classroom-desk-crush",
                        label: "Scratch the initials of a crush into the wood.",
                        result: "The feeling becomes real in a tiny, risky way.",
                        effects: { identity: 1, safety: -1, support: 0 }
                    },
                    {
                        key: "classroom-desk-clean",
                        label: "Keep the desk neat and impersonal.",
                        result: "You leave no trace of yourself behind.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            drawer: {
                title: "Drawer / Diary",
                text: [
                    "Inside the drawer is a notebook where you said what you could not say aloud.",
                    "It contains the emotional version of your school life."
                ],
                choices: [
                    {
                        key: "classroom-drawer-read",
                        label: "Read an old diary entry.",
                        result: "The words embarrass you, but they also remind you that you have been here before.",
                        effects: { identity: 2, safety: 0, support: 0 }
                    },
                    {
                        key: "classroom-drawer-tear",
                        label: "Tear out a page.",
                        result: "Destroying the record feels protective, but it hurts too.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            blackboard: {
                title: "Blackboard",
                text: [
                    "The examples on the board assume everyone is heading toward the same kind of adulthood.",
                    "The future presented here feels narrow."
                ],
                choices: [
                    {
                        key: "classroom-board-ignore",
                        label: "Ignore it and keep your head down.",
                        result: "You stay safer by refusing to react.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    },
                    {
                        key: "classroom-board-imagine",
                        label: "Imagine a future that looks different from this one.",
                        result: "Your imagination becomes a survival skill.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    }
                ]
            },
            lockers: {
                title: "Storage Lockers",
                text: [
                    "Lockers are small enough to look ordinary and large enough to contain panic.",
                    "You know how quickly a hallway can turn hostile."
                ],
                choices: [
                    {
                        key: "classroom-locker-laugh",
                        label: "Laugh off what they saw.",
                        result: "You protect yourself with performance.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    },
                    {
                        key: "classroom-locker-admit",
                        label: "Say it belongs to you.",
                        result: "The truth feels sharp and exposed.",
                        effects: { identity: 2, safety: -2, support: 0 }
                    }
                ]
            },
            bag: {
                title: "Backpack",
                text: [
                    "Your bag carries schoolwork, but also all the things you never say directly.",
                    "What you hide is part of what you carry."
                ],
                choices: [
                    {
                        key: "classroom-bag-note",
                        label: "Keep the hidden note.",
                        result: "You are not ready to lose this private evidence of yourself.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "classroom-bag-remove",
                        label: "Throw it away before someone finds it.",
                        result: "The danger passes, but so does something tender.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            self: {
                title: "Your Thoughts",
                text: [
                    "School teaches subjects, but it also teaches posture, silence, and the cost of being legible to others.",
                    "You are learning how to survive being seen."
                ],
                choices: [
                    {
                        key: "classroom-self-endure",
                        label: "Tell yourself to endure it.",
                        result: "Survival becomes routine.",
                        effects: { identity: 0, safety: 1, support: -1 }
                    },
                    {
                        key: "classroom-self-belong",
                        label: "Tell yourself you still deserve belonging.",
                        result: "The thought is small, but resistant.",
                        effects: { identity: 1, safety: 0, support: 1 }
                    }
                ]
            }
        }
    },

    online: {
        titleId: "interaction-title-online",
        bodyId: "interaction-body-online",
        objects: {
            profile: {
                title: "Profile",
                text: [
                    "You can choose a photo, a name, a bio, and what strangers are allowed to know.",
                    "The screen offers control, but not safety."
                ],
                choices: [
                    {
                        key: "online-profile-open",
                        label: "Make the profile honest and clear.",
                        result: "It feels good to name yourself, even here.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "online-profile-vague",
                        label: "Keep it vague but curious.",
                        result: "You leave room to retreat if you need to.",
                        effects: { identity: 1, safety: 1, support: 0 }
                    }
                ]
            },
            pronouns: {
                title: "Pronouns",
                text: [
                    "The pronoun dropdown seems simple, but the choice feels larger than the screen can hold.",
                    "A label can feel like relief, exposure, or both at once."
                ],
                choices: [
                    {
                        key: "online-pronouns-clear",
                        label: "State your pronouns clearly.",
                        result: "You make yourself legible on your own terms.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "online-pronouns-hint",
                        label: "Hint at it without making it explicit.",
                        result: "You stay partially visible, partially protected.",
                        effects: { identity: 1, safety: 1, support: 0 }
                    },
                    {
                        key: "online-pronouns-blank",
                        label: "Leave the field blank.",
                        result: "Silence feels safer, but also emptier.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },

            about: {
                title: "About Me",
                text: [
                    "The blank text box asks you to describe yourself in a few lines, as if a life can be reduced to keywords.",
                    "You hesitate over every sentence: what is true, what is safe, and what might make someone stay?"
                ],
                choices: [
                    {
                        key: "online-about-honest",
                        label: "Write something vulnerable and real.",
                        result: "The bio feels more like a door than a performance.",
                        effects: { identity: 2, safety: -1, support: 1 }
                    },
                    {
                        key: "online-about-safe",
                        label: "Write something neutral and careful.",
                        result: "You stay readable without giving too much away.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    },
                    {
                        key: "online-about-joke",
                        label: "Hide behind humor.",
                        result: "The joke protects you, but it also blurs you.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },

            messages: {
                title: "Messages",
                text: [
                    "Some messages are warm. Some are invasive. Some make you feel visible in the wrong way.",
                    "Connection and danger often arrive through the same interface."
                ],
                choices: [
                    {
                        key: "online-messages-reply",
                        label: "Reply to the one that feels kind.",
                        result: "A small spark of recognition reaches you.",
                        effects: { identity: 0, safety: 0, support: 2 }
                    },
                    {
                        key: "online-messages-delete",
                        label: "Delete the app for tonight.",
                        result: "You choose distance over uncertainty.",
                        effects: { identity: -1, safety: 1, support: -1 }
                    }
                ]
            },
            feed: {
                title: "Feed",
                text: [
                    "The feed claims to show you what matches you. But who defines match, relevance, or desirability?",
                    "The algorithm feels personal, but it is not neutral."
                ],
                choices: [
                    {
                        key: "online-feed-scroll",
                        label: "Keep scrolling for someone who feels familiar.",
                        result: "You search for yourself in fragments of other people.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "online-feed-quit",
                        label: "Quit before it starts to hurt.",
                        result: "The screen closes, but the feeling lingers.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    }
                ]
            },

            self: {
                title: "Your Thoughts",
                text: [
                    "The internet gave you language, mirrors, and possibilities. It also taught you new forms of risk.",
                    "You are more visible here, but not necessarily more safe."
                ],
                choices: [
                    {
                        key: "online-self-find",
                        label: "It helped me find myself.",
                        result: "Recognition matters, even when it is partial.",
                        effects: { identity: 1, safety: 0, support: 1 }
                    },
                    {
                        key: "online-self-watch",
                        label: "It taught me how easy it is to be watched.",
                        result: "You understand the cost of visibility more clearly now.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    }
                ]
            }
        }
    },

    job: {
        titleId: "interaction-title-job",
        bodyId: "interaction-body-job",
        objects: {
            coverletter: {
                title: "Cover Letter",
                text: [
                    "This is the version of yourself meant for employers: polished, competent, and legible.",
                    "You wonder what had to be edited out before the first sentence even began."
                ],
                choices: [
                    {
                        key: "job-coverletter-true",
                        label: "Write in your own voice.",
                        result: "The application sounds more like you, though that feels risky.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "job-coverletter-safe",
                        label: "Write what sounds most acceptable.",
                        result: "The document is strong, but distant.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            resume: {
                title: "Resume",
                text: [
                    "Your name sits at the top of the page, more exposed than it should feel.",
                    "A document this simple still asks who gets to be official."
                ],
                choices: [
                    {
                        key: "job-resume-true",
                        label: "Use the name that feels true.",
                        result: "You choose visibility, even without certainty.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "job-resume-safe",
                        label: "Use the name that feels safer.",
                        result: "The paper becomes easier to send and harder to inhabit.",
                        effects: { identity: -1, safety: 2, support: 0 }
                    }
                ]
            },
            handbook: {
                title: "Employee Handbook / HR",
                text: [
                    "Policies promise inclusion in clean language that may or may not survive contact with real people.",
                    "The paper is reassuring in theory, less so in practice."
                ],
                choices: [
                    {
                        key: "job-handbook-trust",
                        label: "Let yourself trust the language a little.",
                        result: "You allow hope to enter, cautiously.",
                        effects: { identity: 0, safety: 0, support: 1 }
                    },
                    {
                        key: "job-handbook-doubt",
                        label: "Assume policy does not guarantee safety.",
                        result: "Skepticism keeps you alert.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    }
                ]
            },
            reception: {
                title: "Reception Desk",
                text: [
                    "The waiting area feels calm, but waiting is its own kind of pressure.",
                    "Everything about the room says professionalism. None of it says whether you can relax."
                ],
                choices: [
                    {
                        key: "job-reception-calm",
                        label: "Sit still and rehearse your answers.",
                        result: "Control helps, even if it is only external.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    },
                    {
                        key: "job-reception-breathe",
                        label: "Remind yourself you deserve to be here.",
                        result: "You resist disappearing into the role of applicant.",
                        effects: { identity: 1, safety: 0, support: 1 }
                    }
                ]
            },
            self: {
                title: "Your Thoughts",
                text: [
                    "Professionalism often means performing ease while carrying fear.",
                    "You are deciding not just how to speak, but how much of yourself to let enter the room."
                ],
                choices: [
                    {
                        key: "job-self-open",
                        label: "Be mostly open.",
                        result: "Authenticity feels steady, even when uncertain.",
                        effects: { identity: 1, safety: -1, support: 0 }
                    },
                    {
                        key: "job-self-split",
                        label: "Separate public self from private self.",
                        result: "The split protects you, but costs something too.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            }
        }
    },

    clinic: {
        titleId: "interaction-title-clinic",
        bodyId: "interaction-body-clinic",
        objects: {
            intake: {
                title: "Intake Form",
                text: [
                    "The form asks you to choose from boxes that do not quite fit.",
                    "Bureaucracy is small on paper and large in feeling."
                ],
                choices: [
                    {
                        key: "clinic-intake-writein",
                        label: "Write in what the form does not offer.",
                        result: "You correct the system, even if only in pen.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "clinic-intake-closest",
                        label: "Pick the closest available option.",
                        result: "You move forward, but not comfortably.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            doctor: {
                title: "Doctor",
                text: [
                    "The doctor has authority, time pressure, and a script. You have a body, a need, and uncertainty about how much explanation is safe.",
                    "Care depends on being understood, but understanding is not guaranteed."
                ],
                choices: [
                    {
                        key: "clinic-doctor-honest",
                        label: "Explain everything clearly.",
                        result: "Honesty makes care more possible, but not necessarily easier.",
                        effects: { identity: 1, safety: -1, support: 0 }
                    },
                    {
                        key: "clinic-doctor-minimal",
                        label: "Say only the minimum.",
                        result: "You protect yourself from exposure, at a cost.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            chart: {
                title: "Medical Chart",
                text: [
                    "The chart contains language about you that does not fully feel like yours.",
                    "Seeing yourself described incorrectly can be stranger than being unseen."
                ],
                choices: [
                    {
                        key: "clinic-chart-correct",
                        label: "Ask for it to be corrected.",
                        result: "You insist that the record should reflect your reality.",
                        effects: { identity: 2, safety: -1, support: 0 }
                    },
                    {
                        key: "clinic-chart-letgo",
                        label: "Let it pass for now.",
                        result: "The moment ends, but not the discomfort.",
                        effects: { identity: -1, safety: 1, support: 0 }
                    }
                ]
            },
            mirror: {
                title: "Mirror",
                text: [
                    "The mirror offers your own face back to you, but not always with peace.",
                    "You think about how many rooms have tried to tell you who you are."
                ],
                choices: [
                    {
                        key: "clinic-mirror-kind",
                        label: "Look at yourself with compassion.",
                        result: "Care begins, briefly, from inside.",
                        effects: { identity: 1, safety: 0, support: 1 }
                    },
                    {
                        key: "clinic-mirror-avoid",
                        label: "Look away.",
                        result: "You choose distance from the moment.",
                        effects: { identity: 0, safety: 1, support: 0 }
                    }
                ]
            },
            self: {
                title: "Your Thoughts",
                text: [
                    "Institutions say they are here to help, but help often arrives through forms, assumptions, and delay.",
                    "You are trying to hold onto yourself while asking the system to see you."
                ],
                choices: [
                    {
                        key: "clinic-self-resist",
                        label: "Keep pushing for care.",
                        result: "You refuse to disappear into someone else’s paperwork.",
                        effects: { identity: 1, safety: 0, support: 0 }
                    },
                    {
                        key: "clinic-self-tired",
                        label: "Admit that you feel exhausted.",
                        result: "Exhaustion is not weakness; it is evidence of what this takes.",
                        effects: { identity: 0, safety: -1, support: 1 }
                    }
                ]
            }
        }
    }
};

function updateStatsUI() {
    document.getElementById("stat-identity").textContent = stats.identity;
    document.getElementById("stat-safety").textContent = stats.safety;
    document.getElementById("stat-support").textContent = stats.support;
}

function resetPanel(sceneKey) {
    for (const [choiceKey, info] of choiceEffectsMap.entries()) {
        if (info.sceneKey === sceneKey) {
            stats.identity -= info.effects.identity;
            stats.safety -= info.effects.safety;
            stats.support -= info.effects.support;

            chosen.delete(choiceKey);
            choiceEffectsMap.delete(choiceKey);
        }
    }

    exploredByPanel[sceneKey].clear();

    updateStatsUI();
    updatePanelCounts();
    updateEnding();

    const scene = scenes[sceneKey];
    const titleEl = document.getElementById(scene.titleId);
    const bodyEl = document.getElementById(scene.bodyId);

    if (titleEl) titleEl.textContent = "Click an object";

    const placeholders = {
        childhood: "Explore the closet, doll, diary, family photo, or your own thoughts.",
        classroom: "Explore the desk, drawer, blackboard, lockers, backpack, or your own thoughts.",
        online: "Explore your profile, pronouns, about me, feed, messages, or your own thoughts.",
        job: "Explore the cover letter, resume, employee handbook, reception desk, or your own thoughts.",
        clinic: "Explore the intake form, doctor, medical chart, mirror, or your own thoughts."
    };

    if (bodyEl) {
        bodyEl.innerHTML = `<p class="placeholder">${placeholders[sceneKey]}</p>`;
    }

    if (scene.imageId && scene.defaultImage) {
        const img = document.getElementById(scene.imageId);
        if (img) img.src = scene.defaultImage;
    }
}

function formatEffects(effects) {
    const items = [];
    if (effects.identity !== 0) {
        items.push(`<span class="effect-pill identity">Identity ${signed(effects.identity)}</span>`);
    }
    if (effects.safety !== 0) {
        items.push(`<span class="effect-pill safety">Safety ${signed(effects.safety)}</span>`);
    }
    if (effects.support !== 0) {
        items.push(`<span class="effect-pill support">Support ${signed(effects.support)}</span>`);
    }
    return `<div class="effect-row">${items.join("")}</div>`;
}

function signed(num) {
    return num > 0 ? `+${num}` : `${num}`;
}

function renderInteraction(sceneKey, objectKey) {
    exploredByPanel[sceneKey].add(objectKey);
    updatePanelCounts();
    const scene = scenes[sceneKey];
    const object = scene.objects[objectKey];
    const titleEl = document.getElementById(scene.titleId);
    const bodyEl = document.getElementById(scene.bodyId);

    titleEl.textContent = object.title;

    if (scene.imageId) {
        const img = document.getElementById(scene.imageId);
        if (object.image) {
            img.src = object.image;
        } else if (scene.defaultImage) {
            img.src = scene.defaultImage;
        }
    }

    const choicesHtml = object.choices.map(choice => {
        const locked = chosen.has(choice.key);
        return `
      <button class="choice-btn ${locked ? "locked" : ""}" data-choice="${choice.key}" data-scene="${sceneKey}" data-object="${objectKey}" ${locked ? "disabled" : ""}>
        ${choice.label}
        ${formatEffects(choice.effects)}
      </button>
    `;
    }).join("");

    bodyEl.innerHTML = `
    ${object.text.map(p => `<p>${p}</p>`).join("")}
    <div class="choice-list">${choicesHtml}</div>
  `;

    bindChoiceButtons();
}

function bindChoiceButtons() {
    document.querySelectorAll(".choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const choiceKey = btn.dataset.choice;
            const sceneKey = btn.dataset.scene;
            const objectKey = btn.dataset.object;
            applyChoice(sceneKey, objectKey, choiceKey);
        });
    });
}

function applyChoice(sceneKey, objectKey, choiceKey) {
    if (chosen.has(choiceKey)) return;

    const object = scenes[sceneKey].objects[objectKey];
    const choice = object.choices.find(c => c.key === choiceKey);
    if (!choice) return;

    chosen.add(choiceKey);
    choiceEffectsMap.set(choiceKey, {
        sceneKey,
        objectKey,
        effects: choice.effects
    });

    stats.identity += choice.effects.identity;
    stats.safety += choice.effects.safety;
    stats.support += choice.effects.support;

    updateStatsUI();
    updateEnding();

    const bodyEl = document.getElementById(scenes[sceneKey].bodyId);
    renderInteraction(sceneKey, objectKey);

    bodyEl.innerHTML += `<div class="result-note">${choice.result}</div>`;
}

function updateEnding() {
    const title = document.getElementById("ending-title");
    const text = document.getElementById("ending-text");
    const image = document.getElementById("ending-image");
    const visual = document.getElementById("ending-visual");

    if (stats.identity >= 8 && stats.support >= 6) {
        title.textContent = "Thriving in Chosen Community";
        text.textContent = "You have built a path where identity remains visible enough to feel real, and support helps carry you through institutions and intimacy alike.";
        image.src = "ending1.png";
        image.alt = "Ending 1";
        visual.classList.remove("is-hidden");
    } else if (stats.safety >= 10 && stats.identity <= 3) {
        title.textContent = "Protected but Hidden";
        text.textContent = "You learned how to stay safe in spaces that punish difference, but safety often asked for silence and self-erasure.";
        image.src = "ending2.png";
        image.alt = "Ending 2";
        visual.classList.remove("is-hidden");
    } else if (stats.identity >= 8 && stats.safety <= 3) {
        title.textContent = "Visible and Vulnerable";
        text.textContent = "You moved toward honesty and self-recognition, even when the world did not make that easy. The path is real, but still precarious.";
        image.src = "ending3.png";
        image.alt = "Ending 3";
        visual.classList.remove("is-hidden");
    } else if (stats.support <= 1) {
        title.textContent = "Isolated Under Pressure";
        text.textContent = "Repeated pressure taught you to pull inward. This ending is not failure; it reveals what happens when support is scarce and institutions do not know how to hold you.";
        image.src = "ending4.png";
        image.alt = "Ending 4";
        visual.classList.remove("is-hidden");
    } else {
        title.textContent = "Still Becoming";
        text.textContent = "Identity, safety, and support do not move in a straight line. Your path is still unfolding.";
        visual.classList.add("is-hidden");
    }
}

document.querySelectorAll(".panel-cover").forEach(btn => {
    btn.addEventListener("click", () => {
        const panel = btn.closest(".story-panel");
        panel.classList.toggle("open");
    });
});

document.querySelectorAll(".hotspot").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const sceneKey = btn.dataset.scene;
        const objectKey = btn.dataset.object;
        renderInteraction(sceneKey, objectKey);
    });
});

document.getElementById("ending-btn").addEventListener("click", updateEnding);

document.querySelectorAll(".panel-reset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const sceneKey = btn.dataset.resetPanel;
        resetPanel(sceneKey);
    });
});

updateStatsUI();
updatePanelCounts();
updateEnding();