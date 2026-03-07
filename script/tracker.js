const allButton = document.getElementById('all');
const openButton = document.getElementById('open');
const closedButton = document.getElementById('closed');
const allSection = document.getElementById('all-section');
const loadingSpinner = document.getElementById('loading-spinner');
const totalCount = document.getElementById('total');
// console.log(totalCount);

let all = [];

async function allTracker() {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    loadingSpinner.classList.add('hidden');
    const total = data.data;
    all = total;
    allSection.innerHTML = '';
    tracker(total);
};

function btnClick(id) {

    allButton.classList.remove('bg-blue-700', 'text-white');
    openButton.classList.remove('bg-blue-700', 'text-white');
    closedButton.classList.remove('bg-blue-700', 'text-white');

    allButton.classList.add('bg-white', 'text-black');
    openButton.classList.add('bg-white', 'text-black');
    closedButton.classList.add('bg-white', 'text-black');
    const selected = document.getElementById(id);

    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-blue-700', 'text-white');

    if (id == 'all') {
        tracker(all);
    }
    else if (id == 'open') {
        const open = all.filter(item => item.status === 'open');
        tracker(open);
    } else {
        const closed = all.filter(item => item.status === 'closed');
        tracker(closed);
    }

}


async function showModalBtn(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    showModal(data.data);
    // my_modal_5.showModal();
};
function showModal(id) {
    const datas = document.getElementById('modal');
    datas.innerHTML = `

                <h2 class="text-2xl font-bold">${id.title}</h2>
                <div class="flex items-center gap-5">
                    <p class="bg-emerald-700 p-2 text-white rounded-2xl">${id.status}</p>
                    <p>Opened by ${id.author}</p>
                    <p>${id.updatedAt}</p>
                </div>

                <div class='flex gap-5'>
                   <p class='bg-[#FDE68A] btn rounded-xl p-1 font-semibold'>${id.labels[0]}</p>
                    <p class='bg-[#D9770640] btn rounded-xl p-1 font-semibold'>${id.labels[1]}</p>
                </div>
                
                <div>
                <p class="py-4 text-[#64748B]">${id.description}</p>
                </div>

                <div class="flex justify-between bg-gray-200 p-5 rounded-2xl items-center space-y-4">
                    <div>
                        <p class='text-[#64748B] mb-3'>Assignee:</p>
                        <p>${id.assignee}</p>
                    </div>
                    <div>
                        <p class='text-[#64748B]'>Priority:</p>
                        <p class='btn bg-red-600 rounded-4xl text-white font-bold mt-3'>${id.priority}</p>
                    </div>
                </div>

                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn btn-primary">Close</button>
                    </form>
                </div>
    
    
    `;
    document.getElementById('my_modal_5').showModal();

}

function tracker(events) {
    allSection.innerHTML = '';
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = `bg-white rounded-sm shadow-2xl p-5 border-t-5 ${event.status == "open" ? "border-green-500" : "border-[#A855F7]"}`;
        card.innerHTML = `
                <div onclick="showModalBtn(${event.id})" class="space-y-4">
                    <div class="flex justify-between items-center">
                        <p>${event.status == 'open' ? '<i class="fa-brands fa-phoenix-framework text-green-600"></i>' : '<i class="fa-regular fa-circle-check text-[#A855F7]"></i>'}</p>
                        <p class="bg-[#FEECEC] btn btn shadow pl-4 pr-4 rounded-2xl">${event.priority}</p>
                    </div>

                    <div>
                        <h3 class="font-semibold text-black">${event.title}</h3>
                        <p class="text-[#64748B]">${event.description}</p>
                        <div class="flex gap-3 mt-5">
                            <p class='bg-[#FDE68A] rounded-xl p-1 font-semibold'>${event.labels[0]}</p>
                            <p class='bg-[#FDE68A] rounded-xl p-1 font-semibold'>${event.labels[1]}</p>
                        </div>
                    </div>

                     <hr class="text-[#64748B]">

                    <div class='flex justify-between items-center'>
                        <p class="text-[#64748B] mb-3">${event.author}</p>
                        <p class="text-[#64748B]">${event.createdAt}</p>
                    </div>

                    <div class='flex justify-between items-center'>
                        <p class="text-[#64748B] mb-3">${event.assignee}</p>
                        <p class="text-[#64748B]">${event.updatedAt}</p>
                    </div>
                </div>
        `;
        allSection.appendChild(card);

    });
};
allTracker();