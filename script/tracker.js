const allButton = document.getElementById('allBtn');
const allSection = document.getElementById('all-section');
const loadingSpinner = document.getElementById('loading-spinner');

async function allTracker() {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues ");
    const data = await res.json();
    loadingSpinner.classList.add('hidden');
    const total = data.data;
    allSection.innerHTML = '';
    tracker(total);
}

function tracker(events) {
    events.forEach(event => {
        // console.log(event);
        const card = document.createElement('div');
        card.className = 'bg-white rounded-sm shadow-2xl p-7 space-y-4';
        card.innerHTML = `
                    <div class="flex justify-between items-center">
                        <p class="bg-[#00A96E] p-1 rounded-full"><i class="fa-regular fa-circle"></i></p>
                        <p class="bg-[#FEECEC] pl-4 pr-4 rounded-2xl">${event.priority}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold text-black">${event.title}</h3>
                        <p class="text-[#64748B]">${event.description}</p>
                        <div class="flex gap-3 mt-5">
                            <button class="btn bg-[#EF444420] rounded-2xl text-red-400 "><i
                                    class="fa-solid fa-snowman"></i> Bug</button>
                            <button class="btn bg-[#FDE68A20] rounded-2xl text-red-400 "><i
                                    class="fa-solid fa-snowman"></i> help wanted</button>
                        </div>
                    </div>
                    <hr class="text-[#64748B]">
                    <div>
                        <p class="text-[#64748B] mb-3">${event.author}</p>
                        <p class="text-[#64748B]">${event.createdAt}</p>
                    </div>
        `;
        allSection.appendChild(card);

    });
};
allTracker();
