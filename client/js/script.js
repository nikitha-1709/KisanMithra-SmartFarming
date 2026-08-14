const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", function () {

    if (navbar.style.display === "flex") {

        navbar.style.display = "none";

    } else {

        navbar.style.display = "flex";

        navbar.style.flexDirection = "column";

        navbar.style.position = "absolute";

        navbar.style.top = "75px";

        navbar.style.left = "0";

        navbar.style.width = "100%";

        navbar.style.padding = "20px";

        navbar.style.background = "white";

        navbar.style.boxShadow =
            "0 10px 20px rgba(0,0,0,0.08)";
    }

});

/* =========================
   AUTH MODAL
========================= */

const modalOverlay =
    document.getElementById("modalOverlay");

const closeModal =
    document.getElementById("closeModal");

const farmerLoginBtn =
    document.getElementById("farmerLoginBtn");

const registerBtn =
    document.getElementById("registerBtn");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const loginTitle =
    document.getElementById("loginTitle");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");


/* FARMER LOGIN */

farmerLoginBtn.addEventListener("click", function () {

    modalOverlay.classList.add("active");

    loginForm.classList.remove("hidden");

    registerForm.classList.add("hidden");

    loginTitle.textContent = "Farmer Login";

});




/* REGISTER */

registerBtn.addEventListener("click", function () {

    modalOverlay.classList.add("active");

    loginForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

});



/* CLOSE */

closeModal.addEventListener("click", function () {

    modalOverlay.classList.remove("active");

});


/* CLICK OUTSIDE */

modalOverlay.addEventListener("click", function (event) {

    if (event.target === modalOverlay) {

        modalOverlay.classList.remove("active");

    }

});


/* REGISTER → LOGIN */

showLogin.addEventListener("click", function () {

    registerForm.classList.add("hidden");

    loginForm.classList.remove("hidden");

    loginTitle.textContent = "Farmer Login";

});


/* LOGIN → REGISTER */

showRegister.addEventListener("click", function () {

    loginForm.classList.add("hidden");

    registerForm.classList.remove("hidden");

});

/* ==========================================
   SOIL REPORT COMPARISON
========================================== */
function compareSoil() {

    // ==========================================
    // GET VALUES
    // ==========================================

    const previousPH =
        parseFloat(document.getElementById("previousPH").value);

    const currentPH =
        parseFloat(document.getElementById("currentPH").value);

    const previousN =
        parseFloat(document.getElementById("previousN").value);

    const currentN =
        parseFloat(document.getElementById("currentN").value);

    const previousP =
        parseFloat(document.getElementById("previousP").value);

    const currentP =
        parseFloat(document.getElementById("currentP").value);

    const previousK =
        parseFloat(document.getElementById("previousK").value);

    const currentK =
        parseFloat(document.getElementById("currentK").value);


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        isNaN(previousPH) ||
        isNaN(currentPH) ||
        isNaN(previousN) ||
        isNaN(currentN) ||
        isNaN(previousP) ||
        isNaN(currentP) ||
        isNaN(previousK) ||
        isNaN(currentK)
    ) {

        alert(
            "Please enter all previous and current soil values."
        );

        return;
    }


    // ==========================================
    // CALCULATE CHANGES
    // ==========================================

    const phChange = currentPH - previousPH;
    const nChange = currentN - previousN;
    const pChange = currentP - previousP;
    const kChange = currentK - previousK;


    // ==========================================
    // RESULT GRID
    // ==========================================

    const comparisonGrid =
        document.getElementById("soilComparisonGrid");


    comparisonGrid.innerHTML = `

        ${createSoilResult(
            "Soil pH",
            previousPH,
            currentPH,
            phChange
        )}

        ${createSoilResult(
            "Nitrogen",
            previousN,
            currentN,
            nChange
        )}

        ${createSoilResult(
            "Phosphorus",
            previousP,
            currentP,
            pChange
        )}

        ${createSoilResult(
            "Potassium",
            previousK,
            currentK,
            kChange
        )}

    `;


    // ==========================================
    // HEALTH ANALYSIS
    // ==========================================

    let positiveChanges = 0;
    let negativeChanges = 0;


    if (nChange > 0) {
        positiveChanges++;
    } else if (nChange < 0) {
        negativeChanges++;
    }


    if (pChange > 0) {
        positiveChanges++;
    } else if (pChange < 0) {
        negativeChanges++;
    }


    if (kChange > 0) {
        positiveChanges++;
    } else if (kChange < 0) {
        negativeChanges++;
    }


    // ==========================================
    // pH CHECK
    // ==========================================

    const currentPHGood =
        currentPH >= 5.5 &&
        currentPH <= 7.5;


    if (currentPHGood) {
        positiveChanges++;
    } else {
        negativeChanges++;
    }


    // ==========================================
    // STATUS
    // ==========================================

    const healthStatus =
        document.getElementById("healthStatus");

    const soilAdvice =
        document.getElementById("soilAdvice");


    if (
        positiveChanges >= 3 &&
        negativeChanges <= 1
    ) {

        healthStatus.textContent =
            "🌿 GOOD — Soil condition is generally favorable";

        soilAdvice.innerHTML = `
            <strong>🌱 Soil Analysis:</strong><br><br>

            Your current soil indicators are generally
            favorable compared with the previous report.

            <br><br>

            🟢 Continue monitoring soil nutrients regularly
            and maintain balanced soil management.

            <br><br>

            💡 Avoid applying fertilizers based only on
            assumptions. Use recent soil-test results
            when planning nutrient management.
        `;

    }

    else if (
        positiveChanges >= 2
    ) {

        healthStatus.textContent =
            "🌱 MODERATE — Some parameters need attention";

        soilAdvice.innerHTML = `
            <strong>🌱 Soil Analysis:</strong><br><br>

            Some soil parameters have improved, while
            others may need attention.

            <br><br>

            🟡 Continue monitoring the soil and follow
            recommendations from a recent soil test.

            <br><br>

            💡 Consider consulting a qualified local
            agricultural expert before making major
            fertilizer or crop-management changes.
        `;

    }

    else {

        healthStatus.textContent =
            "⚠️ NEEDS ATTENTION — Review soil management";

        soilAdvice.innerHTML = `
            <strong>🌱 Soil Analysis:</strong><br><br>

            Several indicators require closer attention
            when compared with the previous report.

            <br><br>

            🔎 Consider getting a recent soil test and
            reviewing nutrient-management practices.

            <br><br>

            👨‍🌾 For fertilizer or crop decisions,
            consult a qualified local agricultural expert.
        `;
    }


    // ==========================================
    // SHOW RESULT
    // ==========================================

    document
        .getElementById("soilResult")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

}


/* ==========================================
   CREATE RESULT CARD
========================================== */

function createSoilResult(
    name,
    previous,
    current,
    change
) {

    let status;

    let className;

    let symbol;


    if (Math.abs(change) < 0.01) {

        status = "Stable";

        className = "stable";

        symbol = "→";

    }

    else if (change > 0) {

        status = "Improved";

        className = "improved";

        symbol = "↑";

    }

    else {

        status = "Decreased";

        className = "decreased";

        symbol = "↓";

    }


    return `

        <div class="comparison-item">

            <h4>${name}</h4>

            <div>
                ${previous} → ${current}
            </div>

            <div class="comparison-value ${className}">

                ${symbol} ${status}

            </div>

        </div>

    `;

}

/* ==========================================
   RULE-BASED CROP RECOMMENDATION
========================================== */

async function recommendCrops() {

    const ph =
        parseFloat(
            document.getElementById("cropPH").value
        );

    const nitrogen =
        parseFloat(
            document.getElementById("cropN").value
        );

    const phosphorus =
        parseFloat(
            document.getElementById("cropP").value
        );

    const potassium =
        parseFloat(
            document.getElementById("cropK").value
        );

    const season =
        document.getElementById("cropSeason").value;

    const water =
        document.getElementById("cropWater").value;


    /* VALIDATION */

    if (
        isNaN(ph) ||
        isNaN(nitrogen) ||
        isNaN(phosphorus) ||
        isNaN(potassium) ||
        season === "" ||
        water === ""
    ) {

        alert(
            "Please complete all crop recommendation fields."
        );

        return;
    }


    /*
       Each crop gets a score.
       Higher score = better match.
    */

    const crops = [

        {
            name: "Rice",
            icon: "🌾",

            phMin: 5.5,
            phMax: 7.0,

            water: ["high"],

            seasons: ["kharif"],

            reason:
                "Rice generally prefers suitable pH conditions and good water availability."
        },


        {
            name: "Wheat",
            icon: "🌾",

            phMin: 6.0,
            phMax: 7.5,

            water: ["medium", "high"],

            seasons: ["rabi"],

            reason:
                "Wheat commonly performs well in moderate pH soil with suitable water availability."
        },


        {
            name: "Maize",
            icon: "🌽",

            phMin: 5.5,
            phMax: 7.5,

            water: ["medium", "high"],

            seasons: ["kharif", "zaid"],

            reason:
                "Maize can suit moderately acidic to neutral soil with adequate water."
        },


        {
            name: "Groundnut",
            icon: "🥜",

            phMin: 5.5,
            phMax: 7.0,

            water: ["low", "medium"],

            seasons: ["kharif", "zaid"],

            reason:
                "Groundnut can be suitable where water availability is lower and soil pH is appropriate."
        },


        {
            name: "Millets",
            icon: "🌾",

            phMin: 5.5,
            phMax: 7.5,

            water: ["low", "medium"],

            seasons: ["kharif"],

            reason:
                "Millets are useful options for areas with comparatively lower water availability."
        },


        {
            name: "Cotton",
            icon: "🌿",

            phMin: 5.5,
            phMax: 8.0,

            water: ["medium", "high"],

            seasons: ["kharif"],

            reason:
                "Cotton can tolerate a relatively broad pH range and is commonly associated with Kharif cultivation."
        }

    ];


    /* SCORE CROPS */

    const results = crops.map(crop => {

        let score = 0;


        /* pH */

        if (
            ph >= crop.phMin &&
            ph <= crop.phMax
        ) {

            score += 3;

        }


        /* WATER */

        if (
            crop.water.includes(water)
        ) {

            score += 2;

        }


        /* SEASON */

        if (
            crop.seasons.includes(season)
        ) {

            score += 2;

        }


        /* NUTRIENTS */

        if (nitrogen >= 30) {

            score++;

        }

        if (phosphorus >= 20) {

            score++;

        }

        if (potassium >= 25) {

            score++;

        }


        return {

            ...crop,

            score

        };

    });


    /* SORT */

    results.sort(
        (a, b) => b.score - a.score
    );


    /* TOP THREE */

    const topCrops =
        results.slice(0, 3);

    // If no crop matches the selected season/water conditions,
// ask the Gemini-powered Kisan Mithra assistant for guidance.

const bestScore = topCrops[0]?.score || 0;

if (bestScore < 4) {

    const resultContainer =
        document.getElementById("cropResults");

    resultContainer.innerHTML = `
        <div class="crop-placeholder">
            🌾
            <h3>Kisan Mithra is analyzing your conditions...</h3>
            <p>Please wait while we look for additional crop options.</p>
        </div>
    `;

    try {

        const aiResponse = await fetch(
            "http://localhost:5000/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: `
A farmer wants crop recommendations.

Soil pH: ${ph}
Nitrogen: ${nitrogen}
Phosphorus: ${phosphorus}
Potassium: ${potassium}
Season: ${season}
Water availability: ${water}

Our built-in crop database did not find a strong match.

Suggest a few potentially suitable crops and briefly explain why.
Consider soil conditions, season and water availability.
Do not claim certainty. Mention that local climate, soil testing
and expert agricultural advice should also be considered.
                    `
                })
            }
        );

        const data = await aiResponse.json();

        if (!aiResponse.ok) {
            throw new Error(data.error || "AI recommendation failed");
        }

        resultContainer.innerHTML = `
            <div class="crop-ai-result">

                <div class="crop-icon">🤖🌾</div>

                <h3>Additional Crop Suggestions</h3>

                <p>${data.reply}</p>

                <small>
                    AI suggestions are general guidance.
                    Consider local agricultural advice before planting.
                </small>

            </div>
        `;

    } catch (error) {

        console.error("Crop AI Error:", error);

        resultContainer.innerHTML = `
            <div class="crop-placeholder">

                ⚠️

                <h3>Unable to get additional suggestions</h3>

                <p>
                    Please try again or use the Kisan Mithra
                    AI assistant.
                </p>

            </div>
        `;
    }

    return;
}


    const resultContainer =
        document.getElementById(
            "cropResults"
        );


    resultContainer.innerHTML = `

        <div class="crop-result-grid">

            ${topCrops.map(crop => `

                <div class="crop-card">

                    <div class="crop-icon">
                        ${crop.icon}
                    </div>

                    <h3>
                        ${crop.name}
                    </h3>

                    <span class="crop-match">
                        ${crop.score}/10 Match
                    </span>

                    <p>
                        ${crop.reason}
                    </p>

                    <div class="crop-reason">

                        <strong>
                            Why this crop?
                        </strong>

                        <br>

                        Soil pH:
                        ${ph}

                        <br>

                        Water:
                        ${water}

                        <br>

                        Season:
                        ${season}

                    </div>

                </div>

            `).join("")}

        </div>

    `;


    resultContainer.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}

/* ==========================================
   FARM RECORDS
========================================== */

let farmRecords =
    JSON.parse(
        localStorage.getItem("kisanMithraRecords")
    ) || [];


/* ==========================================
   SAVE RECORD
========================================== */

const farmRecordForm =
    document.getElementById(
        "farmRecordForm"
    );


if (farmRecordForm) {

    farmRecordForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const record = {

                id: Date.now(),

                crop:
                    document.getElementById(
                        "recordCrop"
                    ).value.trim(),

                location:
                    document.getElementById(
                        "recordLocation"
                    ).value.trim(),

                area:
                    document.getElementById(
                        "recordArea"
                    ).value,

                unit:
                    document.getElementById(
                        "recordUnit"
                    ).value,

                date:
                    document.getElementById(
                        "recordDate"
                    ).value,

                irrigation:
                    document.getElementById(
                        "recordIrrigation"
                    ).value,

                notes:
                    document.getElementById(
                        "recordNotes"
                    ).value.trim()

            };


            farmRecords.push(record);


            localStorage.setItem(
                "kisanMithraRecords",
                JSON.stringify(farmRecords)
            );


            farmRecordForm.reset();


            displayFarmRecords();


            alert(
                "🌱 Farm record saved successfully!"
            );

        }
    );

}


/* ==========================================
   DISPLAY RECORDS
========================================== */

function displayFarmRecords() {

    const recordsList =
        document.getElementById(
            "recordsList"
        );


    if (!recordsList) return;


    if (farmRecords.length === 0) {

        recordsList.innerHTML = `

            <div class="empty-records">

                🌱

                <h3>
                    No farm records yet
                </h3>

                <p>
                    Add your first farm record
                    using the form.
                </p>

            </div>

        `;

        return;
    }


    recordsList.innerHTML =
        farmRecords
        .slice()
        .reverse()
        .map(record => `

            <div class="record-item">

                <div class="record-item-top">

                    <div>

                        <h4>
                            🌾 ${record.crop}
                        </h4>

                        <div class="record-location">

                            📍 ${record.location}

                        </div>

                    </div>


                    <button
                        class="delete-record"
                        onclick="deleteFarmRecord(${record.id})"
                        title="Delete record"
                    >

                        ×

                    </button>

                </div>


                <div class="record-details">

                    <span class="record-tag">

                        📐 ${record.area}
                        ${record.unit}

                    </span>


                    <span class="record-tag">

                        📅 ${formatRecordDate(
                            record.date
                        )}

                    </span>


                    <span class="record-tag">

                        💧 ${record.irrigation || "Not specified"}

                    </span>

                </div>


                ${
                    record.notes
                    ?
                    `<p class="record-location">
                        📝 ${record.notes}
                    </p>`
                    :
                    ""
                }

            </div>

        `)
        .join("");

}


/* ==========================================
   DELETE RECORD
========================================== */

function deleteFarmRecord(id) {

    const confirmed =
        confirm(
            "Delete this farm record?"
        );


    if (!confirmed) return;


    farmRecords =
        farmRecords.filter(
            record => record.id !== id
        );


    localStorage.setItem(
        "kisanMithraRecords",
        JSON.stringify(farmRecords)
    );


    displayFarmRecords();

}


/* ==========================================
   FORMAT DATE
========================================== */

function formatRecordDate(date) {

    if (!date) return "No date";

    const parts = date.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


/* ==========================================
   LOAD RECORDS
========================================== */

displayFarmRecords();

/* ==========================================
   PEST MONITORING
========================================== */

let pestRecords =
    JSON.parse(
        localStorage.getItem("kisanMithraPests")
    ) || [];


/* ==========================================
   ADD PEST OBSERVATION
========================================== */

const pestForm =
    document.getElementById("pestForm");


if (pestForm) {

    pestForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const record = {

                id: Date.now(),

                crop:
                    document.getElementById(
                        "pestCrop"
                    ).value.trim(),

                pest:
                    document.getElementById(
                        "pestName"
                    ).value.trim(),

                severity:
                    document.getElementById(
                        "pestSeverity"
                    ).value,

                area:
                    document.getElementById(
                        "pestArea"
                    ).value,

                notes:
                    document.getElementById(
                        "pestNotes"
                    ).value.trim(),

                date:
                    new Date().toLocaleDateString()

            };


            pestRecords.push(record);


            localStorage.setItem(
                "kisanMithraPests",
                JSON.stringify(pestRecords)
            );


            pestForm.reset();


            displayPestRecords();

        }
    );

}


/* ==========================================
   DISPLAY PEST RECORDS
========================================== */

function displayPestRecords() {

    const list =
        document.getElementById(
            "pestList"
        );


    if (!list) return;


    updatePestStats();


    if (pestRecords.length === 0) {

        list.innerHTML = `

            <div class="empty-records">

                🌿

                <h3>
                    No pest observations
                </h3>

                <p>
                    Add an observation to begin monitoring.
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        pestRecords
        .slice()
        .reverse()
        .map(record => `

            <div class="pest-item">

                <div class="pest-item-top">

                    <div>

                        <h4>
                            🐛 ${record.pest}
                        </h4>

                        <div class="pest-crop">

                            🌾 Crop:
                            ${record.crop}

                        </div>

                    </div>


                    <div>

                        <span
                            class="pest-severity
                            severity-${record.severity.toLowerCase()}"
                        >

                            ${record.severity}

                        </span>


                        <button
                            class="pest-delete"
                            onclick="deletePestRecord(${record.id})"
                            title="Delete"
                        >

                            ×

                        </button>

                    </div>

                </div>


                <div class="pest-info">

                    <span class="pest-tag">

                        📐 ${record.area} acres

                    </span>


                    <span class="pest-tag">

                        📅 ${record.date}

                    </span>

                </div>


                ${
                    record.notes
                    ?
                    `<div class="pest-action">
                        📝 ${record.notes}
                    </div>`
                    :
                    ""
                }

                <div class="pest-action">

                    💡
                    ${
                        getPestAdvice(
                            record.severity
                        )
                    }

                </div>

            </div>

        `)
        .join("");

}


/* ==========================================
   PEST ADVICE
========================================== */

function getPestAdvice(severity) {

    if (
    String(severity).trim().toLowerCase() === "high"
) {

        return "High severity detected. Isolate the affected area and consult an agricultural expert for appropriate treatment.";

    }


    if (
    String(severity).trim().toLowerCase() === "medium"
) {

        return "Monitor the affected area regularly and consider suitable integrated pest management practices.";

    }


    return "Continue monitoring the crop regularly and maintain good field hygiene.";

}


/* ==========================================
   UPDATE STATISTICS
========================================== */

function updatePestStats() {

    const active =
        document.getElementById(
            "activePests"
        );

    const high =
        document.getElementById(
            "highPests"
        );

    const crops =
        document.getElementById(
            "affectedCrops"
        );


    if (!active || !high || !crops) return;


    active.textContent =
        pestRecords.length;


    high.textContent =
    pestRecords.filter(
        record =>
            String(record.severity).trim().toLowerCase() === "high"
    ).length;

    const uniqueCrops =
        new Set(
            pestRecords.map(
                record => record.crop.toLowerCase()
            )
        );


    crops.textContent =
        uniqueCrops.size;

}


/* ==========================================
   DELETE PEST RECORD
========================================== */

function deletePestRecord(id) {

    if (
        !confirm(
            "Delete this pest observation?"
        )
    ) {

        return;

    }


    pestRecords =
        pestRecords.filter(
            record =>
                record.id !== id
        );


    localStorage.setItem(
        "kisanMithraPests",
        JSON.stringify(pestRecords)
    );


    displayPestRecords();

}


/* ==========================================
   LOAD PEST RECORDS
========================================== */

displayPestRecords();

/* ==========================================
   CROP YIELD ANALYTICS
========================================== */

let yieldRecords =
    JSON.parse(
        localStorage.getItem("kisanMithraYieldRecords")
    ) || [];


/* ==========================================
   ADD YIELD RECORD
========================================== */

const yieldForm =
    document.getElementById("yieldForm");


if (yieldForm) {

    yieldForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const crop =
                document.getElementById(
                    "yieldCrop"
                ).value.trim();

            const season =
                document.getElementById(
                    "yieldSeason"
                ).value;

            const area =
                parseFloat(
                    document.getElementById(
                        "yieldArea"
                    ).value
                );

            const production =
                parseFloat(
                    document.getElementById(
                        "yieldProduction"
                    ).value
                );


            if (
                !crop ||
                !season ||
                isNaN(area) ||
                isNaN(production) ||
                area <= 0 ||
                production <= 0
            ) {

                alert(
                    "Please enter valid yield information."
                );

                return;

            }


            /*
              Yield =
              Production / Area
            */

            const yieldPerHectare =
                production / area;


            const record = {

                id: Date.now(),

                crop: crop,

                season: season,

                area: area,

                production: production,

                yield:
                    Number(
                        yieldPerHectare.toFixed(2)
                    )

            };


            yieldRecords.push(record);


            localStorage.setItem(
                "kisanMithraYieldRecords",
                JSON.stringify(yieldRecords)
            );


            yieldForm.reset();


            updateYieldDashboard();

        }
    );

}


/* ==========================================
   UPDATE DASHBOARD
========================================== */

function updateYieldDashboard() {

    calculateYieldStats();

    displayYieldRecords();

    createYieldCharts();

}


/* ==========================================
   CALCULATE STATISTICS
========================================== */

function calculateYieldStats() {

    const totalProduction =
        yieldRecords.reduce(
            (total, record) =>
                total + record.production,
            0
        );


    const averageYield =
        yieldRecords.length > 0
        ?
        yieldRecords.reduce(
            (total, record) =>
                total + record.yield,
            0
        ) / yieldRecords.length
        :
        0;


    /*
      Find crop with highest
      average yield.
    */

    const cropData = {};


    yieldRecords.forEach(record => {

        if (!cropData[record.crop]) {

            cropData[record.crop] = [];

        }

        cropData[record.crop].push(
            record.yield
        );

    });


    let bestCrop = "-";

    let bestYield = 0;


    Object.keys(cropData).forEach(crop => {

        const avg =
            cropData[crop].reduce(
                (a, b) => a + b,
                0
            ) /
            cropData[crop].length;


        if (avg > bestYield) {

            bestYield = avg;

            bestCrop = crop;

        }

    });


    document.getElementById(
        "totalProduction"
    ).textContent =
        totalProduction.toFixed(1);


    document.getElementById(
        "averageYield"
    ).textContent =
        averageYield.toFixed(2);


    document.getElementById(
        "bestCrop"
    ).textContent =
        bestCrop;

}


/* ==========================================
   DISPLAY RECORDS
========================================== */

function displayYieldRecords() {

    const container =
        document.getElementById(
            "yieldRecordsList"
        );


    if (!container) return;


    if (yieldRecords.length === 0) {

        container.innerHTML = `

            <div class="empty-records">

                🌾

                <h3>
                    No yield records yet
                </h3>

                <p>
                    Add your first production record.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        yieldRecords
        .slice()
        .reverse()
        .map(record => `

            <div class="yield-record">

                <div>

                    <h4>
                        🌾 ${record.crop}
                    </h4>

                    <p>

                        ${record.season}
                        • ${record.area} hectares

                    </p>

                </div>


                <div class="yield-value">

                    <strong>
                        ${record.yield}
                    </strong>

                    <span>
                        tonnes/hectare
                    </span>

                </div>


                <button
                    class="delete-yield"
                    onclick="deleteYieldRecord(${record.id})"
                >

                    ×

                </button>

            </div>

        `)
        .join("");

}


/* ==========================================
   DELETE RECORD
========================================== */

function deleteYieldRecord(id) {

    if (
        !confirm(
            "Delete this yield record?"
        )
    ) {

        return;

    }


    yieldRecords =
        yieldRecords.filter(
            record =>
                record.id !== id
        );


    localStorage.setItem(
        "kisanMithraYieldRecords",
        JSON.stringify(yieldRecords)
    );


    updateYieldDashboard();

}


/* ==========================================
   CREATE CHARTS
========================================== */

let cropChart = null;

let trendChart = null;


function createYieldCharts() {

    const cropCanvas =
        document.getElementById(
            "cropYieldChart"
        );

    const trendCanvas =
        document.getElementById(
            "productionTrendChart"
        );


    if (!cropCanvas || !trendCanvas) {

        return;

    }


    /*
       Destroy old charts before
       creating new ones.
    */

    if (cropChart) {

        cropChart.destroy();

    }


    if (trendChart) {

        trendChart.destroy();

    }


    /* ============================
       CROP-WISE DATA
    ============================ */

    const cropData = {};


    yieldRecords.forEach(record => {

        if (!cropData[record.crop]) {

            cropData[record.crop] = [];

        }


        cropData[record.crop].push(
            record.yield
        );

    });


    const cropNames =
        Object.keys(cropData);


    const cropAverages =
        cropNames.map(crop => {

            return (
                cropData[crop].reduce(
                    (a, b) => a + b,
                    0
                )
                /
                cropData[crop].length
            ).toFixed(2);

        });


    cropChart =
        new Chart(
            cropCanvas,
            {

                type: "bar",

                data: {

                    labels:
                        cropNames,

                    datasets: [

                        {

                            label:
                                "Yield (t/ha)",

                            data:
                                cropAverages

                        }

                    ]

                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {

                            display: false

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true

                        }

                    }

                }

            }
        );


    /* ============================
       PRODUCTION TREND
    ============================ */

    const seasonData = {

        Kharif: 0,

        Rabi: 0,

        Zaid: 0

    };


    yieldRecords.forEach(record => {

        if (
            seasonData[
                record.season
            ] !== undefined
        ) {

            seasonData[
                record.season
            ] += record.production;

        }

    });


    trendChart =
        new Chart(
            trendCanvas,
            {

                type: "line",

                data: {

                    labels:
                        Object.keys(
                            seasonData
                        ),

                    datasets: [

                        {

                            label:
                                "Production (tonnes)",

                            data:
                                Object.values(
                                    seasonData
                                ),

                            tension: 0.3,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    scales: {

                        y: {

                            beginAtZero: true

                        }

                    }

                }

            }

        );

}


/* ==========================================
   LOAD ANALYTICS
========================================== */

updateYieldDashboard();

/* ==========================================
   IoT SENSOR DASHBOARD
========================================== */

let sensorChart = null;


/* Initial sensor values */

let sensorData = {

    moisture: 64,

    temperature: 29,

    humidity: 68,

    ph: 6.5,

    light: 72,

    water: 78

};


/* History for graph */

let moistureHistory = [

    60,
    62,
    61,
    64,
    63,
    65,
    64

];


let sensorLabels = [

    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "Now"

];


/* ==========================================
   UPDATE SENSOR DISPLAY
========================================== */

function updateSensorDisplay() {

    const moisture =
        document.getElementById(
            "soilMoisture"
        );

    const temperature =
        document.getElementById(
            "sensorTemp"
        );

    const humidity =
        document.getElementById(
            "sensorHumidity"
        );

    const ph =
        document.getElementById(
            "sensorPH"
        );

    const light =
        document.getElementById(
            "lightIntensity"
        );

    const water =
        document.getElementById(
            "waterLevel"
        );


    if (!moisture) return;


    moisture.textContent =
        sensorData.moisture + "%";


    temperature.textContent =
        sensorData.temperature + "°C";


    humidity.textContent =
        sensorData.humidity + "%";


    ph.textContent =
        sensorData.ph;


    light.textContent =
        sensorData.light + "%";


    water.textContent =
        sensorData.water + "%";


    /* Moisture status */

    const moistureStatus =
        document.getElementById(
            "moistureStatus"
        );


    if (
        sensorData.moisture < 35
    ) {

        moistureStatus.textContent =
            "Low — irrigation needed";

    }

    else if (
        sensorData.moisture > 80
    ) {

        moistureStatus.textContent =
            "High";

    }

    else {

        moistureStatus.textContent =
            "Optimal";

    }


    /* Water status */

    const waterStatus =
        document.getElementById(
            "waterStatus"
        );


    if (
        sensorData.water < 25
    ) {

        waterStatus.textContent =
            "Low";

    }

    else if (
        sensorData.water < 50
    ) {

        waterStatus.textContent =
            "Moderate";

    }

    else {

        waterStatus.textContent =
            "Sufficient";

    }


    /* Update timestamp */

    const updateTime =
        document.getElementById(
            "sensorUpdateTime"
        );


    updateTime.textContent =
        "Updated " +
        new Date().toLocaleTimeString();


    updateFarmAlert();

}


/* ==========================================
   FARM ALERT
========================================== */

function updateFarmAlert() {

    const alertText =
        document.getElementById(
            "farmAlertText"
        );


    if (!alertText) return;


    if (
        sensorData.moisture < 35
    ) {

        alertText.textContent =
            "Soil moisture is low. Consider checking irrigation for the affected field.";

        return;

    }


    if (
        sensorData.moisture > 85
    ) {

        alertText.textContent =
            "Soil moisture is high. Monitor the field for excessive water accumulation.";

        return;

    }


    if (
        sensorData.temperature > 38
    ) {

        alertText.textContent =
            "Temperature is high. Monitor crop stress and water availability.";

        return;

    }


    if (
        sensorData.water < 25
    ) {

        alertText.textContent =
            "Water storage level is low. Consider planning irrigation resources.";

        return;

    }


    alertText.textContent =
        "Your farm conditions are currently within the normal monitored range.";

}


/* ==========================================
   SIMULATE SENSOR UPDATE
========================================== */

function simulateSensorUpdate() {

    /*
       Small changes simulate
       incoming IoT readings.
    */

    sensorData.moisture =
        Math.max(
            20,
            Math.min(
                90,
                sensorData.moisture +
                (Math.random() * 4 - 2)
            )
        );


    sensorData.temperature =
        Math.max(
            20,
            Math.min(
                45,
                sensorData.temperature +
                (Math.random() * 2 - 1)
            )
        );


    sensorData.humidity =
        Math.max(
            30,
            Math.min(
                95,
                sensorData.humidity +
                (Math.random() * 3 - 1.5)
            )
        );


    sensorData.light =
        Math.max(
            10,
            Math.min(
                100,
                sensorData.light +
                (Math.random() * 5 - 2.5)
            )
        );


    sensorData.water =
        Math.max(
            10,
            Math.min(
                100,
                sensorData.water +
                (Math.random() * 2 - 1)
            )
        );


    /*
       Keep pH realistic.
    */

    sensorData.ph =
        Math.max(
            5,
            Math.min(
                8,
                sensorData.ph +
                (Math.random() * 0.1 - 0.05)
            )
        );


    sensorData.ph =
        Number(
            sensorData.ph.toFixed(1)
        );


    sensorData.moisture =
        Math.round(
            sensorData.moisture
        );


    sensorData.temperature =
        Math.round(
            sensorData.temperature
        );


    sensorData.humidity =
        Math.round(
            sensorData.humidity
        );


    sensorData.light =
        Math.round(
            sensorData.light
        );


    sensorData.water =
        Math.round(
            sensorData.water
        );


    /* Update graph */

    moistureHistory.push(
        sensorData.moisture
    );


    sensorLabels.push(
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    );


    /*
       Keep only latest 10 values.
    */

    if (
        moistureHistory.length > 10
    ) {

        moistureHistory.shift();

        sensorLabels.shift();

    }


    updateSensorDisplay();

    updateSensorChart();

}


/* ==========================================
   CREATE SENSOR CHART
========================================== */

function updateSensorChart() {

    const canvas =
        document.getElementById(
            "sensorChart"
        );


    if (!canvas) return;


    if (sensorChart) {

        sensorChart.destroy();

    }


    sensorChart =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels:
                        sensorLabels,

                    datasets: [

                        {

                            label:
                                "Soil Moisture (%)",

                            data:
                                moistureHistory,

                            tension: 0.35,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100

                        }

                    }

                }

            }
        );

}


/* ==========================================
   START SENSOR SYSTEM
========================================== */

updateSensorDisplay();

updateSensorChart();


/*
   Simulate new readings every
   5 seconds.
*/

setInterval(
    simulateSensorUpdate,
    5000
);

/* ==========================================
   PROFIT CALCULATOR
========================================== */

function calculateProfit() {

    const area =
        parseFloat(
            document.getElementById("profitArea").value
        );

    const seed =
        parseFloat(
            document.getElementById("profitSeed").value
        ) || 0;

    const fertilizer =
        parseFloat(
            document.getElementById("profitFertilizer").value
        ) || 0;

    const labour =
        parseFloat(
            document.getElementById("profitLabour").value
        ) || 0;

    const irrigation =
        parseFloat(
            document.getElementById("profitIrrigation").value
        ) || 0;

    const transport =
        parseFloat(
            document.getElementById("profitTransport").value
        ) || 0;

    const yieldPerAcre =
        parseFloat(
            document.getElementById("profitYield").value
        );

    const price =
        parseFloat(
            document.getElementById("profitPrice").value
        );


    /* VALIDATION */

    if (
        isNaN(area) ||
        area <= 0 ||
        isNaN(yieldPerAcre) ||
        yieldPerAcre <= 0 ||
        isNaN(price) ||
        price <= 0
    ) {

        alert(
            "Please enter valid farm area, expected yield and market price."
        );

        return;
    }


    /* COST PER ACRE */

    const expensesPerAcre =
        seed +
        fertilizer +
        labour +
        irrigation +
        transport;


    /* INCOME PER ACRE */

    const incomePerAcre =
        yieldPerAcre * price;


    /* PROFIT PER ACRE */

    const profitPerAcre =
        incomePerAcre -
        expensesPerAcre;


    /* WHOLE FARM */

    const totalIncome =
        incomePerAcre * area;


    const totalFarmExpenses =
        expensesPerAcre * area;


    const totalFarmProfit =
        profitPerAcre * area;


    /* PROFIT MARGIN */

    const profitMargin =
        incomePerAcre > 0
            ? (profitPerAcre / incomePerAcre) * 100
            : 0;


    /* DISPLAY */

    document.getElementById(
        "expectedIncome"
    ).textContent =
        formatRupees(incomePerAcre);


    document.getElementById(
        "totalIncome"
    ).textContent =
        formatRupees(totalIncome);


    document.getElementById(
        "totalExpenses"
    ).textContent =
        formatRupees(expensesPerAcre);


    document.getElementById(
        "totalFarmExpenses"
    ).textContent =
        formatRupees(totalFarmExpenses);


    document.getElementById(
        "estimatedProfit"
    ).textContent =
        formatRupees(profitPerAcre);


    document.getElementById(
        "totalFarmProfit"
    ).textContent =
        formatRupees(totalFarmProfit);


    document.getElementById(
        "profitPerAcre"
    ).textContent =
        formatRupees(profitPerAcre);


    document.getElementById(
        "profitMargin"
    ).textContent =
        `📈 Estimated profit margin: ${profitMargin.toFixed(1)}%`;

}


/* ==========================================
   FORMAT RUPEES
========================================== */

function formatRupees(value) {

    return "₹" +
        Math.round(value).toLocaleString("en-IN");

}

/* ==========================================
   CROP LIFECYCLE
========================================== */

const lifecycleData = {

    cotton: [

        {
            day: 0,
            title: "Seed Stage",
            icon: "🌱",
            water: "Minimal",
            nutrients: "Low",
            temperature: "25–30°C",
            risk: "Poor seed viability",
            tip: "Use healthy, disease-free seed for a stronger start."
        },

        {
            day: 10,
            title: "Germination",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "24–30°C",
            risk: "Poor germination",
            tip: "Maintain suitable soil moisture during establishment."
        },

        {
            day: 28,
            title: "Vegetative Growth",
            icon: "🌿",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "24–32°C",
            risk: "Nutrient deficiency",
            tip: "Monitor plant growth and maintain balanced nutrition."
        },

        {
            day: 40,
            title: "Flowering",
            icon: "🌼",
            water: "High",
            nutrients: "Medium",
            temperature: "24–30°C",
            risk: "Moisture stress",
            tip: "Avoid moisture stress during flowering."
        },

        {
            day: 60,
            title: "Boll Development",
            icon: "🌿",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "24–32°C",
            risk: "Pest and disease pressure",
            tip: "Monitor the crop regularly for pests and diseases."
        },

        {
            day: 150,
            title: "Harvest",
            icon: "🌾",
            water: "Low",
            nutrients: "Low",
            temperature: "Dry conditions preferred",
            risk: "Poor harvest timing",
            tip: "Harvest at the appropriate maturity stage."
        }

    ],


    rice: [

        {
            day: 0,
            title: "Seed Stage",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "20–30°C",
            risk: "Poor seed quality",
            tip: "Use healthy seed and prepare the field properly."
        },

        {
            day: 15,
            title: "Seedling Stage",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "20–30°C",
            risk: "Poor establishment",
            tip: "Maintain suitable moisture during establishment."
        },

        {
            day: 30,
            title: "Tillering",
            icon: "🌿",
            water: "High",
            nutrients: "Medium",
            temperature: "22–30°C",
            risk: "Weed competition",
            tip: "Monitor weeds and maintain appropriate field conditions."
        },

        {
            day: 55,
            title: "Panicle Development",
            icon: "🌿",
            water: "High",
            nutrients: "Medium",
            temperature: "22–30°C",
            risk: "Nutrient or moisture stress",
            tip: "Maintain suitable moisture during reproductive growth."
        },

        {
            day: 75,
            title: "Flowering",
            icon: "🌼",
            water: "High",
            nutrients: "Medium",
            temperature: "22–30°C",
            risk: "Moisture stress",
            tip: "Avoid severe moisture stress during flowering."
        },

        {
            day: 110,
            title: "Harvest",
            icon: "🌾",
            water: "Low",
            nutrients: "Low",
            temperature: "Dry conditions preferred",
            risk: "Harvest losses",
            tip: "Harvest when the crop reaches appropriate maturity."
        }

    ],


    wheat: [

        {
            day: 0,
            title: "Seed Stage",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "15–25°C",
            risk: "Poor seed quality",
            tip: "Use quality seed and suitable planting conditions."
        },

        {
            day: 15,
            title: "Germination",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "15–25°C",
            risk: "Poor emergence",
            tip: "Maintain suitable soil moisture."
        },

        {
            day: 30,
            title: "Tillering",
            icon: "🌿",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "15–22°C",
            risk: "Weed competition",
            tip: "Monitor crop establishment and weed pressure."
        },

        {
            day: 55,
            title: "Stem Development",
            icon: "🌿",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "18–25°C",
            risk: "Nutrient stress",
            tip: "Monitor plant growth and nutrient status."
        },

        {
            day: 80,
            title: "Flowering",
            icon: "🌼",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "18–25°C",
            risk: "Heat or moisture stress",
            tip: "Monitor moisture during reproductive development."
        },

        {
            day: 120,
            title: "Harvest",
            icon: "🌾",
            water: "Low",
            nutrients: "Low",
            temperature: "Dry conditions preferred",
            risk: "Delayed harvest",
            tip: "Harvest at suitable grain maturity."
        }

    ],


    maize: [

        {
            day: 0,
            title: "Seed Stage",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "20–30°C",
            risk: "Poor seed quality",
            tip: "Use quality seed and prepare the field well."
        },

        {
            day: 10,
            title: "Germination",
            icon: "🌱",
            water: "Moderate",
            nutrients: "Low",
            temperature: "20–30°C",
            risk: "Poor emergence",
            tip: "Maintain suitable moisture during germination."
        },

        {
            day: 30,
            title: "Vegetative Growth",
            icon: "🌿",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "20–30°C",
            risk: "Nutrient deficiency",
            tip: "Monitor plant growth and nutrient availability."
        },

        {
            day: 50,
            title: "Tasseling",
            icon: "🌿",
            water: "High",
            nutrients: "Medium",
            temperature: "20–30°C",
            risk: "Moisture stress",
            tip: "Avoid water stress around tasseling and silking."
        },

        {
            day: 70,
            title: "Grain Development",
            icon: "🌽",
            water: "Moderate",
            nutrients: "Medium",
            temperature: "20–30°C",
            risk: "Pest pressure",
            tip: "Monitor the crop for pests and diseases."
        },

        {
            day: 100,
            title: "Harvest",
            icon: "🌽",
            water: "Low",
            nutrients: "Low",
            temperature: "Dry conditions preferred",
            risk: "Harvest losses",
            tip: "Harvest at appropriate grain maturity."
        }

    ]

};


/* ==========================================
   AUTOMATED CROP LIFECYCLE
========================================== */

let lifecycleTimer = null;

let lifecyclePlaying = false;

let lifecycleCurrentDay = 0;


/* ==========================================
   INITIALIZE
========================================== */

const lifecycleCrop =
    document.getElementById("lifecycleCrop");


if (lifecycleCrop) {

    lifecycleCrop.addEventListener(
        "change",
        function () {

            stopLifecycle();

            loadAutomatedLifecycle(
                lifecycleCrop.value
            );

        }
    );


    loadAutomatedLifecycle("cotton");

}


/* ==========================================
   LOAD LIFECYCLE
========================================== */

function loadAutomatedLifecycle(crop) {

    const stages =
        lifecycleData[crop];

    if (!stages) return;


    lifecycleCurrentDay = 0;


    const slider =
        document.getElementById(
            "lifecycleSlider"
        );


    const finalDay =
        stages[stages.length - 1].day;


    slider.max = finalDay;

    slider.value = 0;


    createLifecycleTimeline(stages);

    updateLifecycleStage(
        crop,
        0
    );

}


/* ==========================================
   CREATE TIMELINE
========================================== */

function createLifecycleTimeline(stages) {

    const days =
        document.getElementById(
            "lifecycleDays"
        );


    if (!days) return;


    days.innerHTML =
        stages.map(stage => `

            <div
                class="lifecycle-day-label"
                style="left: ${
                    (stage.day /
                    stages[stages.length - 1].day) * 100
                }%"
            >

                <span>
                    Day ${stage.day}
                </span>

                <small>
                    ${stage.title}
                </small>

            </div>

        `).join("");

}


/* ==========================================
   FIND CURRENT STAGE
========================================== */

function getLifecycleStageIndex(
    stages,
    day
) {

    let index = 0;


    for (
        let i = 0;
        i < stages.length;
        i++
    ) {

        if (
            day >= stages[i].day
        ) {

            index = i;

        }

    }


    return index;

}


/* ==========================================
   UPDATE STAGE
========================================== */

function updateLifecycleStage(
    crop,
    day
) {

    const stages =
        lifecycleData[crop];


    if (!stages) return;


    const index =
        getLifecycleStageIndex(
            stages,
            day
        );


    const stage =
        stages[index];


    document.getElementById(
        "stageBadge"
    ).textContent =
        `Day ${day} • ${stage.title}`;


    document.getElementById(
        "stageTitle"
    ).textContent =
        stage.title;


    document.getElementById(
        "stageWater"
    ).textContent =
        stage.water;


    document.getElementById(
        "stageNutrients"
    ).textContent =
        stage.nutrients;


    document.getElementById(
        "stageTemperature"
    ).textContent =
        stage.temperature;


    document.getElementById(
        "stageRisk"
    ).textContent =
        stage.risk;


    document.getElementById(
        "farmerTip"
    ).innerHTML =
        `🌱 <strong>Farmer tip:</strong> ${stage.tip}`;


    document.getElementById(
        "growthStage"
    ).textContent =
        stage.icon;


    document.getElementById(
        "currentCropDay"
    ).textContent =
        `Day ${day}`;


    /* PROGRESS */

    const finalDay =
        stages[stages.length - 1].day;


    const percentage =
        (day / finalDay) * 100;


    document.getElementById(
        "lifecycleProgressFill"
    ).style.width =
        `${percentage}%`;


    document.getElementById(
        "lifecycleMarker"
    ).style.left =
        `${percentage}%`;

}


/* ==========================================
   SLIDER
========================================== */

const lifecycleSlider =
    document.getElementById(
        "lifecycleSlider"
    );


if (lifecycleSlider) {

    lifecycleSlider.addEventListener(
        "input",
        function () {

            stopLifecycle();

            lifecycleCurrentDay =
                Number(
                    lifecycleSlider.value
                );


            updateLifecycleStage(
                lifecycleCrop.value,
                lifecycleCurrentDay
            );

        }
    );

}


/* ==========================================
   PLAY / PAUSE
========================================== */

function toggleLifecycle() {

    if (lifecyclePlaying) {

        stopLifecycle();

        return;

    }


    lifecyclePlaying = true;


    document.getElementById(
        "lifecyclePlay"
    ).textContent =
        "⏸ Pause Journey";


    lifecycleTimer =
        setInterval(
            function () {

                const stages =
                    lifecycleData[
                        lifecycleCrop.value
                    ];


                const finalDay =
                    stages[
                        stages.length - 1
                    ].day;


                lifecycleCurrentDay += 1;


                if (
                    lifecycleCurrentDay >
                    finalDay
                ) {

                    lifecycleCurrentDay =
                        0;

                }


                lifecycleSlider.value =
                    lifecycleCurrentDay;


                updateLifecycleStage(
                    lifecycleCrop.value,
                    lifecycleCurrentDay
                );

            },
            120
        );

}


/* ==========================================
   STOP
========================================== */

function stopLifecycle() {

    lifecyclePlaying = false;


    clearInterval(
        lifecycleTimer
    );


    document.getElementById(
        "lifecyclePlay"
    ).textContent =
        "▶ Play Journey";

}


/* ==========================================
   RESET
========================================== */

function resetLifecycle() {

    stopLifecycle();


    lifecycleCurrentDay = 0;


    lifecycleSlider.value = 0;


    updateLifecycleStage(
        lifecycleCrop.value,
        0
    );

}

/* ==========================================
   FERTILIZER ADVISOR
========================================== */

function analyzeFertilizer() {

    const crop =
        document.getElementById("fertilizerCrop").value;

    const stage =
        document.getElementById("fertilizerStage").value;

    const ph =
        parseFloat(
            document.getElementById("fertilizerPH").value
        );

    const nitrogen =
        parseFloat(
            document.getElementById("fertilizerN").value
        );

    const phosphorus =
        parseFloat(
            document.getElementById("fertilizerP").value
        );

    const potassium =
        parseFloat(
            document.getElementById("fertilizerK").value
        );


    /* VALIDATION */

    if (
        crop === "" ||
        stage === "" ||
        isNaN(ph) ||
        isNaN(nitrogen) ||
        isNaN(phosphorus) ||
        isNaN(potassium)
    ) {

        alert(
            "Please complete all fertilizer advisor fields."
        );

        return;
    }


    /* ==========================================
       NUTRIENT STATUS
    ========================================== */

    const nitrogenStatus =
        getNutrientStatus(nitrogen, 30, 60);

    const phosphorusStatus =
        getNutrientStatus(phosphorus, 20, 50);

    const potassiumStatus =
        getNutrientStatus(potassium, 25, 60);


    /* ==========================================
       PH STATUS
    ========================================== */

    let phStatus;

    if (ph < 5.5) {

        phStatus = "Low";

    }
    else if (ph > 7.5) {

        phStatus = "High";

    }
    else {

        phStatus = "Good";

    }


    /* ==========================================
       ADVICE
    ========================================== */

    let advice = "";


    if (nitrogenStatus === "Low") {

        advice +=
            "🌿 Nitrogen needs attention. Focus on balanced nitrogen management based on your soil test and crop requirements.<br><br>";

    }

    else {

        advice +=
            "🌿 Nitrogen level appears adequate based on the entered value.<br><br>";

    }


    if (phosphorusStatus === "Low") {

        advice +=
            "🌱 Phosphorus needs attention. Consider soil-test-based phosphorus management.<br><br>";

    }

    else {

        advice +=
            "🌱 Phosphorus level appears adequate based on the entered value.<br><br>";

    }


    if (potassiumStatus === "Low") {

        advice +=
            "🌾 Potassium needs attention. Maintain balanced potassium management according to the soil test.<br><br>";

    }

    else {

        advice +=
            "🌾 Potassium level appears adequate based on the entered value.<br><br>";

    }


    if (phStatus !== "Good") {

        advice +=
            "⚠️ Soil pH is outside the general range used by this tool. Consider getting professional soil-management advice.<br><br>";

    }


    /* ==========================================
       RESULT
    ========================================== */

    const result =
        document.getElementById(
            "fertilizerResult"
        );


    result.innerHTML = `

        <div class="fertilizer-result-header">

            <h3>
                🌱 ${capitalizeWord(crop)}
                Fertilizer Guidance
            </h3>

            <p>
                Growth stage:
                <strong>
                    ${formatStage(stage)}
                </strong>
            </p>


            <div class="nutrient-status-grid">


                <div class="
                    nutrient-status
                    ${getNutrientClass(nitrogenStatus)}
                ">

                    <div class="nutrient-status-icon">
                        🌿
                    </div>

                    <strong>
                        ${nitrogenStatus}
                    </strong>

                    <small>
                        Nitrogen (N)
                    </small>

                    <small>
                        ${nitrogen}
                    </small>

                </div>


                <div class="
                    nutrient-status
                    ${getNutrientClass(phosphorusStatus)}
                ">

                    <div class="nutrient-status-icon">
                        🌱
                    </div>

                    <strong>
                        ${phosphorusStatus}
                    </strong>

                    <small>
                        Phosphorus (P)
                    </small>

                    <small>
                        ${phosphorus}
                    </small>

                </div>


                <div class="
                    nutrient-status
                    ${getNutrientClass(potassiumStatus)}
                ">

                    <div class="nutrient-status-icon">
                        🌾
                    </div>

                    <strong>
                        ${potassiumStatus}
                    </strong>

                    <small>
                        Potassium (K)
                    </small>

                    <small>
                        ${potassium}
                    </small>

                </div>

            </div>


            <div class="fertilizer-advice">

                <strong>
                    💡 Farmer Guidance
                </strong>

                <br><br>

                ${advice}

                <strong>
                    Soil pH:
                </strong>

                ${ph}
                —
                ${phStatus}

            </div>


            <div class="fertilizer-warning">

                ⚠️ This tool provides general guidance,
                not a precise fertilizer dosage.
                For exact fertilizer type and quantity,
                use a current soil test and consult a
                qualified local agricultural expert.

            </div>

        </div>

    `;


    result.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


/* ==========================================
   NUTRIENT STATUS
========================================== */

function getNutrientStatus(
    value,
    lowLimit,
    highLimit
) {

    if (value < lowLimit) {

        return "Low";

    }

    if (value > highLimit) {

        return "High";

    }

    return "Good";

}


/* ==========================================
   STATUS CSS CLASS
========================================== */

function getNutrientClass(status) {

    if (status === "Low") {

        return "nutrient-low";

    }

    if (status === "High") {

        return "nutrient-high";

    }

    return "nutrient-good";

}


/* ==========================================
   FORMAT CROP NAME
========================================== */

function capitalizeWord(word) {

    if (!word) return "";

    return word.charAt(0).toUpperCase()
        + word.slice(1);

}


/* ==========================================
   FORMAT GROWTH STAGE
========================================== */

function formatStage(stage) {

    const stages = {

        seed: "Seed / Sowing",

        vegetative: "Vegetative Growth",

        flowering: "Flowering",

        fruiting: "Fruiting / Grain Filling",

        harvest: "Pre-Harvest"

    };


    return stages[stage] || stage;

}

/* ==========================================
   PLANT DOCTOR
========================================== */

function diagnosePlant() {

    const crop =
        document.getElementById("doctorCrop").value;

    const symptom =
        document.getElementById("doctorSymptom").value;

    const location =
        document.getElementById("doctorLocation").value;

    const severity =
        document.getElementById("doctorSeverity").value;

    const notes =
        document.getElementById("doctorNotes").value.trim();


    /* ==========================================
       VALIDATION
    ========================================== */

    if (
        crop === "" ||
        symptom === "" ||
        location === "" ||
        severity === ""
    ) {

        alert(
            "Please complete the crop, symptom, plant part and severity fields."
        );

        return;
    }


    /* ==========================================
       PLANT DIAGNOSIS DATABASE
    ========================================== */

    const diagnoses = {

        yellow: {

            title: "Possible Nutrient Stress or Water Imbalance",

            cause:
                "Yellow leaves can have several causes, including nutrient deficiency, excess water, poor drainage or natural leaf ageing.",

            actions: [
                "Check the soil moisture before irrigating again.",
                "Review the latest soil test for nutrient levels.",
                "Look for additional symptoms such as spots, insects or root problems.",
                "Avoid applying fertilizer blindly without checking the soil condition."
            ]

        },


        spots: {

            title: "Possible Leaf Spot or Plant Disease",

            cause:
                "Brown or dark spots may be associated with fungal or bacterial diseases, environmental stress or other plant problems.",

            actions: [
                "Inspect both sides of affected leaves.",
                "Remove severely affected plant material where appropriate.",
                "Avoid unnecessary overhead irrigation.",
                "Monitor whether the spots are spreading to new leaves.",
                "Consult a local agricultural expert if the condition is spreading rapidly."
            ]

        },


        wilting: {

            title: "Possible Water Stress or Root Problem",

            cause:
                "Wilting can occur because of insufficient water, excessive water, poor drainage, damaged roots or disease.",

            actions: [
                "Check soil moisture around the root zone.",
                "Check whether water is draining properly.",
                "Inspect the stem and root area for unusual symptoms.",
                "Avoid adding more water until you understand the cause."
            ]

        },


        holes: {

            title: "Possible Insect or Pest Damage",

            cause:
                "Holes or eaten leaf edges can indicate insect feeding or other pest activity.",

            actions: [
                "Inspect the underside of leaves for insects or eggs.",
                "Check nearby plants for similar damage.",
                "Record the affected crop area and severity.",
                "Use integrated pest management practices appropriate for the identified pest."
            ]

        },


        curling: {

            title: "Possible Pest or Environmental Stress",

            cause:
                "Leaf curling can be associated with insect activity, water stress, heat, nutrient imbalance or other environmental conditions.",

            actions: [
                "Inspect young leaves and the underside of leaves for pests.",
                "Check soil moisture.",
                "Observe whether new growth is also affected.",
                "Avoid unnecessary pesticide or fertilizer application until the cause is clearer."
            ]

        },


        white: {

            title: "Possible Fungal Growth or Pest Activity",

            cause:
                "A white coating or powder on leaves can sometimes indicate fungal growth, although some insects can also produce visible residues.",

            actions: [
                "Inspect the affected leaves closely.",
                "Check whether the coating is spreading.",
                "Improve airflow around plants where practical.",
                "Seek local agricultural advice before selecting a treatment."
            ]

        },


        stunted: {

            title: "Possible Nutrient, Root or Environmental Stress",

            cause:
                "Slow growth can result from nutrient imbalance, poor soil conditions, water stress, root problems, pests or unsuitable growing conditions.",

            actions: [
                "Review your latest soil report.",
                "Check soil moisture and drainage.",
                "Inspect roots and leaves for signs of pests or disease.",
                "Compare affected plants with healthy plants in the same field."
            ]

        }

    };


    const diagnosis =
        diagnoses[symptom];


    /* ==========================================
       RESULT
    ========================================== */

    const result =
        document.getElementById(
            "plantDiagnosis"
        );


    result.innerHTML = `

        <div class="plant-diagnosis-result">

            <h3>
                🔬 Plant Health Assessment
            </h3>

            <p class="diagnosis-subtitle">

                ${capitalizeWord(crop)}
                • ${formatPlantPart(location)}

            </p>


            <span class="
                diagnosis-severity
                severity-${severity}
            ">

                ${capitalizeWord(severity)}
                Severity

            </span>


            <div class="diagnosis-cause">

                <strong>
                    🌿 Possible Cause
                </strong>

                <p>
                    ${diagnosis.title}
                </p>

                <p>
                    ${diagnosis.cause}
                </p>

            </div>


            <div class="diagnosis-action">

                <strong>
                    💡 Recommended Next Steps
                </strong>

                <ul class="diagnosis-list">

                    ${diagnosis.actions
                        .map(action => `
                            <li>
                                ${action}
                            </li>
                        `)
                        .join("")}

                </ul>

            </div>


            ${
                notes
                ?
                `
                <div class="diagnosis-action">

                    <strong>
                        📝 Your Observation
                    </strong>

                    <p>
                        ${notes}
                    </p>

                </div>
                `
                :
                ""
            }


            <div class="diagnosis-warning">

                ⚠️ This is a preliminary plant-health
                assessment, not a confirmed disease diagnosis.
                For serious or rapidly spreading problems,
                consult a qualified local agricultural expert.

            </div>

        </div>

    `;


    result.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


/* ==========================================
   PLANT PART FORMATTER
========================================== */

function formatPlantPart(part) {

    const parts = {

        leaves: "Leaves",

        stem: "Stem",

        roots: "Roots",

        fruit: "Fruit / Grain",

        whole: "Whole Plant"

    };


    return parts[part] || part;

}

/* ==========================================
   MARKET INTELLIGENCE
========================================== */

const marketData = {

    rice: {
        price: "₹2,350",
        trend: "↑ Rising",
        change: "+4.2%",
        demand: "High",
        advice: "Demand is currently strong.",
        text: "Monitor local prices and compare multiple markets before making a selling decision.",
        points: "0,180 100,155 200,165 300,125 400,140 500,95 600,70"
    },

    wheat: {
        price: "₹2,420",
        trend: "↑ Rising",
        change: "+3.1%",
        demand: "High",
        advice: "Wheat demand is showing a positive trend.",
        text: "Compare prices between nearby markets and consider crop quality when evaluating offers.",
        points: "0,170 100,160 200,145 300,155 400,120 500,105 600,85"
    },

    maize: {
        price: "₹2,150",
        trend: "→ Stable",
        change: "+0.8%",
        demand: "Medium",
        advice: "Maize prices are relatively stable.",
        text: "Continue monitoring demand and local market arrivals before deciding when to sell.",
        points: "0,150 100,145 200,150 300,140 400,145 500,138 600,135"
    },

    cotton: {
        price: "₹6,900",
        trend: "↑ Rising",
        change: "+5.4%",
        demand: "High",
        advice: "Cotton demand is showing a positive indicator.",
        text: "Compare quality-based prices and different market offers before selling.",
        points: "0,190 100,175 200,160 300,145 400,130 500,105 600,80"
    },

    groundnut: {
        price: "₹5,450",
        trend: "↓ Falling",
        change: "-1.7%",
        demand: "Medium",
        advice: "Groundnut prices are showing a slight decline.",
        text: "Monitor market arrivals and compare multiple buyers before making a decision.",
        points: "0,90 100,105 200,100 300,125 400,115 500,145 600,155"
    },

    millets: {
        price: "₹3,200",
        trend: "↑ Rising",
        change: "+2.6%",
        demand: "High",
        advice: "Millet demand is showing a positive indicator.",
        text: "Demand can vary by location, so compare local and regional market prices.",
        points: "0,175 100,160 200,150 300,135 400,145 500,110 600,95"
    }

};


function updateMarketIntelligence() {

    const crop =
        document.getElementById("marketCrop");

    if (!crop) return;


    const data =
        marketData[crop.value];

    if (!data) return;


    document.getElementById(
        "marketPrice"
    ).textContent = data.price;


    document.getElementById(
        "marketTrend"
    ).textContent = data.trend;


    document.getElementById(
        "marketChange"
    ).textContent = data.change;


    document.getElementById(
        "marketDemand"
    ).textContent = data.demand;


    document.getElementById(
        "marketAdvice"
    ).textContent = data.advice;


    document.getElementById(
        "marketAdviceText"
    ).textContent = data.text;


    const chart =
        document.getElementById(
            "marketChartLine"
        );


    if (chart) {

        chart.setAttribute(
            "points",
            data.points
        );

    }

}


const marketCrop =
    document.getElementById(
        "marketCrop"
    );


if (marketCrop) {

    marketCrop.addEventListener(
        "change",
        updateMarketIntelligence
    );

}


if (
    document.getElementById(
        "marketPrice"
    )
) {

    updateMarketIntelligence();

}

/* =========================================
FARMER BENEFITS FILTER
========================================= */

let selectedSchemeCategory = "all";

function filterCategory(category, button) {

```
selectedSchemeCategory = category;

document.querySelectorAll(".scheme-filter")
    .forEach(btn => btn.classList.remove("active"));

button.classList.add("active");

filterSchemes();
```

}

function filterSchemes() {

```
const searchInput =
    document.getElementById("schemeSearch");

const searchText =
    searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

const cards =
    document.querySelectorAll(".scheme-card");

cards.forEach(card => {

    const category =
        card.dataset.category;

    const name =
        card.dataset.name.toLowerCase();

    const matchesCategory =
        selectedSchemeCategory === "all" ||
        category === selectedSchemeCategory;

    const matchesSearch =
        name.includes(searchText);

    if (matchesCategory && matchesSearch) {
        card.style.display = "block";
    } else {
        card.style.display = "none";
    }

});
```

}

/* =========================================
   FARM HEALTH STATUS
========================================= */

function updateFarmHealth() {

    const moistureElement = document.getElementById("soilMoisture");
    const phElement = document.getElementById("sensorPH");
    const temperatureElement = document.getElementById("sensorTemp");

    const scoreElement = document.getElementById("farmHealthScore");
    const titleElement = document.getElementById("farmHealthTitle");
    const messageElement = document.getElementById("farmHealthMessage");

    const soilElement = document.getElementById("healthSoil");
    const waterElement = document.getElementById("healthWater");
    const weatherElement = document.getElementById("healthWeather");

    if (!scoreElement) {
        return;
    }

    let moisture = 64;
    let ph = 6.5;
    let temperature = 29;

    if (moistureElement) {
        moisture = parseFloat(moistureElement.textContent) || 64;
    }

    if (phElement) {
        ph = parseFloat(phElement.textContent) || 6.5;
    }

    if (temperatureElement) {
        temperature = parseFloat(
            temperatureElement.textContent
        ) || 29;
    }


    /* -----------------------------------------
       SOIL HEALTH
    ----------------------------------------- */

    let soilScore = 100;

    if (ph < 5.5 || ph > 8) {
        soilScore = 60;
    } else if (ph < 6 || ph > 7.5) {
        soilScore = 80;
    }


    /* -----------------------------------------
       WATER STATUS
    ----------------------------------------- */

    let waterScore = 100;

    if (moisture < 30) {
        waterScore = 55;
    } else if (moisture < 45) {
        waterScore = 75;
    } else if (moisture > 85) {
        waterScore = 80;
    }


    /* -----------------------------------------
       WEATHER RISK
    ----------------------------------------- */

    let weatherScore = 100;

    if (temperature > 40 || temperature < 10) {
        weatherScore = 55;
    } else if (temperature > 35 || temperature < 15) {
        weatherScore = 75;
    }


    /* -----------------------------------------
       OVERALL SCORE
    ----------------------------------------- */

    const finalScore = Math.round(
        (soilScore + waterScore + weatherScore) / 3
    );

    scoreElement.textContent = finalScore;


    /* -----------------------------------------
       STATUS
    ----------------------------------------- */

    if (finalScore >= 85) {

        titleElement.textContent = "Excellent";

        messageElement.textContent =
            "Your farm is currently in a healthy condition.";

    } else if (finalScore >= 70) {

        titleElement.textContent = "Good";

        messageElement.textContent =
            "Your farm is generally healthy, but some conditions should be monitored.";

    } else {

        titleElement.textContent = "Needs Attention";

        messageElement.textContent =
            "Some farm conditions need attention. Check your soil, water and weather readings.";

    }


    /* -----------------------------------------
       UPDATE INDICATORS
    ----------------------------------------- */

    if (soilElement) {

        if (soilScore >= 85) {
            soilElement.textContent = "Good";
        } else if (soilScore >= 70) {
            soilElement.textContent = "Moderate";
        } else {
            soilElement.textContent = "Needs Attention";
        }

    }


    if (waterElement) {

        if (waterScore >= 85) {
            waterElement.textContent = "Optimal";
        } else if (waterScore >= 70) {
            waterElement.textContent = "Moderate";
        } else {
            waterElement.textContent = "Low";
        }

    }


    if (weatherElement) {

        if (weatherScore >= 85) {
            weatherElement.textContent = "Low";
        } else if (weatherScore >= 70) {
            weatherElement.textContent = "Moderate";
        } else {
            weatherElement.textContent = "High";
        }

    }

}


/* Run when page loads */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateFarmHealth();

    }
);




function changeLanguage(language) {

    const select =
        document.querySelector(".goog-te-combo");

    if (!select) {
        console.warn("Google Translate is not ready yet.");
        return;
    }

    select.value = language;

    select.dispatchEvent(
        new Event("change")
    );

    if (languageMenu) {
        languageMenu.classList.remove("show");
    }

}

/* =========================================================
   HIDE GOOGLE TRANSLATE BANNER
========================================================= */

function hideGoogleTranslateBar() {

    // Hide Google Translate banner iframe
    const banner = document.querySelector(
        'iframe.goog-te-banner-frame'
    );

    if (banner) {
        banner.style.display = "none";
        banner.style.visibility = "hidden";
        banner.style.height = "0";
        banner.style.width = "0";
    }

    // Reset page position
    document.documentElement.style.marginTop = "0";

    document.body.style.top = "0";
    document.body.style.marginTop = "0";
}


// Run when page loads
window.addEventListener("load", function () {

    hideGoogleTranslateBar();

    setInterval(
        hideGoogleTranslateBar,
        500
    );

});

/* =========================================================
   🪄 KISAN MITHRA SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements =
        document.querySelectorAll(
            ".feature-card, " +
            ".crop-card, " +
            ".weather-card, " +
            ".soil-card, " +
            ".learning-card, " +
            ".benefit-card, " +
            ".market-card, " +
            ".sensor-card"
        );


    revealElements.forEach(function (element) {

        element.classList.add("km-reveal");

    });


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "km-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

});

function toggleLanguageMenu(event) {

    event.preventDefault();
    event.stopPropagation();

    const menu = document.getElementById("languageMenu");

    if (menu) {
        menu.classList.toggle("show");
    }

}

